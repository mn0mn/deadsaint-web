"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { medusa } from "@/lib/medusa";
import { useCustomer } from "@/app/providers/customerProvider";
import { useLocale } from "@/components/LocaleProvider";
import "./login.css";

export default function LoginPage() {
  const router = useRouter(); const { refreshCustomer } = useCustomer(); const { locale } = useLocale();
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [loading, setLoading] = useState(false); const [error, setError] = useState<string | null>(null);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setLoading(true); setError(null); try { await medusa.auth.login("customer", "emailpass", { email, password }); await refreshCustomer(); router.push(`/${locale}/account`); router.refresh(); } catch (err) { console.error("Login failed:", err); setError(locale === "fa" ? "اطلاعات ورود نادرست است. دوباره تلاش کنید." : "INVALID CREDENTIALS. TRY AGAIN."); } finally { setLoading(false); } }
  const fa = locale === "fa";
  return <div className="login-page"><section className="login-shell" aria-labelledby="login-title">
    <div className="login-kicker"><span>DEADSAINT // {fa ? "دسترسی مشتری" : "CUSTOMER ACCESS"}</span><span>{fa ? "نیازمند احراز هویت" : "AUTHORIZATION REQUIRED"}</span></div>
    <div className="login-main"><div className="login-identity"><div className="login-identity-top"><p className="login-eyebrow">THE DEAD FILE</p><span className="login-section-index">01 / ACCESS</span></div><h1>{fa ? <>برگرد<br />به<br />مرده.</> : <>COME<br />BACK<br />DEAD.</>}</h1><div className="login-identity-bottom"><p>{fa ? "فقط برای مشتریان قدیمی." : "RETURNING CUSTOMERS ONLY."}</p><div className="login-stamp"><span>ENTRY</span><strong>RESTRICTED</strong></div></div></div>
      <div className="login-access"><div className="login-copy"><span className="login-copy-label">{fa ? "دسترسی مشتری" : "CUSTOMER ACCESS"}</span><h2>{fa ? <>خوش<br />برگشتی.</> : <>WELCOME<br />BACK.</>}</h2><p>{fa ? "اطلاعات ثبت‌شده در پرونده ددسینت را وارد کنید." : "Enter the credentials attached to your DeadSaint record. No resurrection papers required."}</p></div>
      <form className="login-form" onSubmit={handleSubmit}><label><span>{fa ? "ایمیل" : "EMAIL ADDRESS"}</span><input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@deadsaint.com" autoComplete="email" required /></label><label><span>{fa ? "رمز عبور" : "PASSWORD"}</span><input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••••••" autoComplete="current-password" required /></label>{error && <p className="login-error">☠ {error}</p>}<button type="submit" className="login-submit" disabled={loading}>{loading ? (fa ? "در حال بررسی پرونده..." : "CHECKING RECORD...") : (fa ? "ورود به مرده ↗" : "ENTER THE DEAD ↗")}</button><div className="login-divider"><span /><small>{fa ? "هنوز یکی از ما نیستی؟" : "NOT ONE OF US YET?"}</small><span /></div><Link href={`/${locale}/register`} className="login-register">{fa ? "ساخت پرونده دد ↗" : "CREATE A DEAD FILE ↗"}</Link></form></div></div>
    <footer className="login-footer"><span>ACCESS LOGGED // DEADSAINT HQ</span><strong>☠ KEEP THE DEAD ALIVE ☠</strong></footer>
  </section></div>;
}
