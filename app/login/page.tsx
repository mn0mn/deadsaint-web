"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { medusa } from "@/lib/medusa";
import { useCustomer } from "@/app/providers/customerProvider";
import "./login.css";

export default function LoginPage() {
  const router = useRouter();
  const { refreshCustomer } = useCustomer();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await medusa.auth.login("customer", "emailpass", {
        email,
        password,
      });

      await refreshCustomer();
      router.push("/account");
      router.refresh();
    } catch (err) {
      console.error("Login failed:", err);
      setError("INVALID CREDENTIALS. TRY AGAIN.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <section className="login-shell" aria-labelledby="login-title">
        <div className="login-kicker">
          <span>DEADSAINT // CUSTOMER ACCESS</span>
          <span>AUTHORIZATION REQUIRED</span>
        </div>

        <div className="login-main">
          <div className="login-identity">
            <div className="login-identity-top">
              <p className="login-eyebrow">THE DEAD FILE</p>
              <span className="login-section-index">01 / ACCESS</span>
            </div>

            <h1 id="login-title">
              COME<br />
              BACK<br />
              DEAD.
            </h1>

            <div className="login-identity-bottom">
              <p>RETURNING CUSTOMERS ONLY.</p>
              <div className="login-stamp" aria-label="Entry restricted">
                <span>ENTRY</span>
                <strong>RESTRICTED</strong>
              </div>
            </div>
          </div>

          <div className="login-access">
            <div className="login-copy">
              <span className="login-copy-label">CUSTOMER ACCESS</span>
              <h2>WELCOME<br />BACK.</h2>
              <p>
                Enter the credentials attached to your DeadSaint record.
                No resurrection papers required.
              </p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <label>
                <span>EMAIL ADDRESS</span>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@deadsaint.com"
                  autoComplete="email"
                  required
                />
              </label>

              <label>
                <span>PASSWORD</span>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  required
                />
              </label>

              {error && <p className="login-error">☠ {error}</p>}

              <button type="submit" className="login-submit" disabled={loading}>
                {loading ? "CHECKING RECORD..." : "ENTER THE DEAD ↗"}
              </button>

              <div className="login-divider">
                <span />
                <small>NOT ONE OF US YET?</small>
                <span />
              </div>

              <Link href="/register" className="login-register">
                CREATE A DEAD FILE ↗
              </Link>
            </form>
          </div>
        </div>

        <footer className="login-footer">
          <span>ACCESS LOGGED // DEADSAINT HQ</span>
          <strong>☠ KEEP THE DEAD ALIVE ☠</strong>
        </footer>
      </section>
    </div>
  );
}
