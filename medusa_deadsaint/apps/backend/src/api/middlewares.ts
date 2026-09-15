import { createHash } from "node:crypto";
import type {
  MedusaNextFunction,
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http";
import { defineMiddlewares } from "@medusajs/framework/http";

type Bucket = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS_PER_KEY = 10;
const MAX_BUCKETS = 10_000;

const buckets = new Map<string, Bucket>();

function fingerprint(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function getClientIp(req: MedusaRequest): string {
  return req.ip || "unknown";
}

function getEmail(req: MedusaRequest): string {
  const email = (req.body as { email?: unknown } | undefined)?.email;
  return typeof email === "string" ? email.trim().toLowerCase() : "";
}

function consume(key: string, now: number): Bucket {
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    const bucket = { count: 1, resetAt: now + WINDOW_MS };
    buckets.set(key, bucket);
    return bucket;
  }

  existing.count += 1;
  return existing;
}

function cleanup(now: number) {
  if (buckets.size <= MAX_BUCKETS) return;

  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
    if (buckets.size <= MAX_BUCKETS) break;
  }
}

function rateLimitCustomerLogin(
  req: MedusaRequest,
  res: MedusaResponse,
  next: MedusaNextFunction,
) {
  const now = Date.now();
  cleanup(now);

  const ipKey = `ip:${fingerprint(getClientIp(req))}`;
  const email = getEmail(req);
  const emailKey = email ? `email:${fingerprint(email)}` : null;

  const ipBucket = consume(ipKey, now);
  const emailBucket = emailKey ? consume(emailKey, now) : null;

  const limited =
    ipBucket.count > MAX_ATTEMPTS_PER_KEY ||
    (emailBucket?.count ?? 0) > MAX_ATTEMPTS_PER_KEY;

  if (limited) {
    const resetAt = Math.max(
      ipBucket.resetAt,
      emailBucket?.resetAt ?? 0,
    );
    const retryAfter = Math.max(1, Math.ceil((resetAt - now) / 1000));

    res.setHeader("Retry-After", String(retryAfter));
    return res.status(429).json({
      type: "rate_limit",
      message: "Too many login attempts. Please try again later.",
    });
  }

  next();
}

export default defineMiddlewares({
  routes: [
    {
      matcher: "/auth/customer/emailpass",
      method: ["POST"],
      middlewares: [rateLimitCustomerLogin],
    },
  ],
});
