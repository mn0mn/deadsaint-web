"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { medusa } from "@/lib/medusa";
import { useCustomer } from "@/app/providers/customerProvider";
import "./register.css";

export default function RegisterPage() {
  const router = useRouter();
  const { refreshCustomer } = useCustomer();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await medusa.auth.register("customer", "emailpass", {
        email,
        password,
      });

      if (typeof result !== "string") {
        if ("verification_required" in result && result.verification_required) {
          setError("CHECK YOUR EMAIL TO VERIFY YOUR DEAD FILE, THEN LOG IN.");
          return;
        }

        if ("location" in result && result.location) {
          setError("YOUR DEAD FILE NEEDS VERIFICATION BEFORE YOU CAN ENTER.");
          return;
        }
      }

      await medusa.store.customer.create({
        first_name: firstName,
        last_name: lastName,
      });

      await refreshCustomer();
      router.push("/account");
      router.refresh();
    } catch (err) {
      console.error("Registration failed:", err);
      setError("COULD NOT CREATE YOUR DEAD FILE. CHECK YOUR DETAILS AND TRY AGAIN.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-page">
      <section className="register-hero">
        <div className="register-kicker">
          <span>DEADSAINT // NEW CUSTOMER</span>
          <span>FILE CREATION PROTOCOL</span>
        </div>

        <div className="register-title-row">
          <div>
            <p className="register-eyebrow">THE DEAD FILE</p>
            <h1>
              JOIN<br />
              THE<br />
              DEAD.
            </h1>
          </div>

          <div className="register-stamp">
            <span>STATUS</span>
            <strong>UNBURIED</strong>
          </div>
        </div>
      </section>

      <section className="register-form-section">
        <div className="register-copy">
          <span className="register-section-index">01 /</span>
          <h2>CREATE<br />YOUR FILE.</h2>
          <p>
            Your DeadSaint account keeps your orders, details, and addresses in one place.
            Pick a password and get yourself officially documented.
          </p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-name-grid">
            <label>
              <span>FIRST NAME</span>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                autoComplete="given-name"
                required
              />
            </label>

            <label>
              <span>LAST NAME</span>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                autoComplete="family-name"
                required
              />
            </label>
          </div>

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
              placeholder="8+ characters"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>

          {error && <p className="register-error">☠ {error}</p>}

          <button type="submit" className="register-submit" disabled={loading}>
            {loading ? "CREATING FILE..." : "CREATE MY DEAD FILE ↗"}
          </button>

          <div className="register-divider">
            <span />
            <small>ALREADY ONE OF US?</small>
            <span />
          </div>

          <Link href="/login" className="register-login">
            RETURN TO LOGIN ↗
          </Link>
        </form>
      </section>

      <footer className="register-footer">
        <span>FILE CREATION LOGGED // DEADSAINT HQ</span>
        <strong>☠ NO LIVING MEMBERS REQUIRED ☠</strong>
      </footer>
    </div>
  );
}
