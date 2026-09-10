"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./account.css";
import { medusa } from "@/lib/medusa";
import { useCustomer } from "@/app/providers/customerProvider";
import { useLocale } from "@/components/LocaleProvider";

type AccountTab = "orders" | "details" | "addresses" | "settings";
type AccountOrder = { id: string; created_at?: string; total?: number; currency_code?: string; status?: string; items?: Array<{ title?: string }> };

export default function AccountPage() {
  const router = useRouter();
  const { locale, messages: messages } = useLocale();
  const m = messages.account;
  const [activeTab, setActiveTab] = useState<AccountTab>("orders");
  const [orders, setOrders] = useState<AccountOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState(false);
  const { customer, loading, logout } = useCustomer();

  useEffect(() => { if (!loading && !customer) router.replace(`/${locale}/login`); }, [loading, customer, router, locale]);
  useEffect(() => {
    if (!customer) return;
    let cancelled = false;
    async function loadOrders() { setOrdersLoading(true); setOrdersError(false); try { const response = await medusa.store.order.list({ customer_id: customer.id, limit: 50, order: "-created_at" }); if (!cancelled) setOrders(response.orders as AccountOrder[]); } catch (error) { console.error("Failed to load customer orders:", error); if (!cancelled) setOrdersError(true); } finally { if (!cancelled) setOrdersLoading(false); } }
    void loadOrders(); return () => { cancelled = true; };
  }, [customer]);

  async function handleLogout() { await logout(); router.replace(`/${locale}/`); }
  if (loading) return <div className="account-page">{m.loading}</div>;
  if (!customer) return null;
  const fullName = [customer.first_name, customer.last_name].filter(Boolean).join(" ") || m.unknownSubject;
  const memberSince = customer.created_at ? new Date(customer.created_at).getFullYear() : m.unknown;
  const orderCount = orders.length;
  const tabs: { id: AccountTab; label: string }[] = [{ id: "orders", label: m.orders }, { id: "details", label: m.yourDetails }, { id: "addresses", label: m.whereToSend }, { id: "settings", label: m.settings }];
  const formatDate = (date?: string) => date ? new Date(date).toLocaleDateString(locale === "fa" ? "fa-IR" : "en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase().replace(/,/g, "") : m.unknown;
  const formatTotal = (total?: number, currencyCode = "USD") => typeof total === "number" ? new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", { style: "currency", currency: currencyCode.toUpperCase() }).format(total / 100) : "--";
  const displayStatus = (status?: string) => status ? status.replace(/_/g, " ").toUpperCase() : m.processing;

  return <div className="account-page">
    <section className="account-hero"><div className="account-kicker"><span>{m.file} {customer.id.slice(-6).toUpperCase()}</span><span>{m.classified}</span></div><div className="account-title-row"><div><p className="account-eyebrow">{m.eyebrow}</p><h1>{m.title1}<br />{m.title2}</h1></div><div className="account-stamp"><span>{m.status}</span><strong>{m.alive}</strong></div></div></section>
    <section className="account-profile"><div className="account-portrait"><span>DS</span><small>{m.subject}</small></div><div className="account-identity"><p className="account-label">{m.subjectName}</p><h2>{fullName.toUpperCase()}</h2><p className="account-email">{customer.email}</p><div className="account-meta"><span><small>{m.memberSince}</small>{memberSince}</span><span><small>{m.orders}</small>{orderCount.toString().padStart(2, "0")}</span><span><small>{m.status}</small>{m.active}</span></div></div><div className="account-actions"><button type="button" onClick={() => setActiveTab("details")}>{m.editProfile}</button><button type="button" onClick={() => void handleLogout()}>{m.logout}</button></div></section>
    <nav className="account-tabs" aria-label={m.sections}>{tabs.map((tab) => <button type="button" key={tab.id} className={`account-tab${activeTab === tab.id ? " is-active" : ""}`} onClick={() => setActiveTab(tab.id)} aria-current={activeTab === tab.id ? "page" : undefined}>{tab.label}{tab.id === "orders" && <span>{orderCount.toString().padStart(2, "0")}</span>}</button>)}</nav>
    <section className="account-content">
      {activeTab === "orders" && <section><div className="account-section-heading"><div><span className="account-section-index">01 /</span><h2>{m.recent}</h2></div><span className="account-section-note">{m.secrets}</span></div>{ordersLoading ? <div className="account-address-list"><p>{m.retrieving}</p></div> : ordersError ? <div className="account-address-list"><p>{m.unable}</p></div> : orders.length === 0 ? <div className="account-address-list"><p>{m.noOrders}</p><button className="btn" type="button" onClick={() => router.push(`/${locale}/shop`)}>{m.enterShop}</button></div> : <div className="account-orders">{orders.map((order) => { const itemTitle = order.items?.[0]?.title || m.orderContents; const status = displayStatus(order.status); return <div className="account-order" key={order.id}><div><small>{m.order}</small><strong>#{order.id.replace(/^order_/, "").slice(-8).toUpperCase()}</strong></div><div><small>{m.date}</small><span>{formatDate(order.created_at)}</span></div><div className="account-order-item"><small>{m.item}</small><strong>{itemTitle.toUpperCase()}</strong></div><div><small>{m.total}</small><span>{formatTotal(order.total, order.currency_code)}</span></div><div className={`account-order-status ${status.toLowerCase().replace(/\s+/g, "-")}`}>{status}</div></div>; })}</div>}</section>}
      {activeTab === "details" && <section><div className="account-section-heading"><div><span className="account-section-index">02 /</span><h2>{m.yourDetails}</h2></div></div><div className="account-info-grid"><article className="account-info-card"><span className="account-label">{m.identity}</span><h3>{fullName.toUpperCase()}</h3><p>{customer.email}</p>{customer.phone && <p>{customer.phone}</p>}<button className="account-edit" type="button">{m.editDetails}</button></article><article className="account-info-card"><span className="account-label">{m.membership}</span><h3>DEADSAINT</h3><p>{m.memberSinceText} {memberSince}</p><p>{m.ordersPlaced} {orderCount.toString().padStart(2, "0")}</p><p>{m.accountStatus} {m.active}</p></article></div></section>}
      {activeTab === "addresses" && <section><div className="account-section-heading"><div><span className="account-section-index">03 /</span><h2>{m.whereToSend}</h2></div></div><div className="account-address-list"><p>{m.noAddresses}</p><button className="btn" type="button">{m.addAddress}</button></div></section>}
      {activeTab === "settings" && <section><div className="account-section-heading"><div><span className="account-section-index">04 /</span><h2>{m.settings}</h2></div></div><div className="account-setting-list"><div className="account-setting"><div><strong>{m.newsletter}</strong><span>{m.newsletterBody}</span></div><span className="account-toggle" aria-hidden="true" /></div><div className="account-setting"><div><strong>{m.orderUpdates}</strong><span>{m.orderUpdatesBody}</span></div><span className="account-toggle" aria-hidden="true" /></div><div className="account-setting"><div><strong>{m.deleteAccount}</strong><span>{m.deleteBody}</span></div><button className="account-delete" type="button">{m.delete}</button></div></div></section>}
    </section>
    <footer className="account-footer"><p>{m.footer1}<br />{m.footer2}</p><strong>☠ KEEP THE DEAD ALIVE ☠</strong></footer>
  </div>;
}
