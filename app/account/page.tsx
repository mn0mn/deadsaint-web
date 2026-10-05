"use client";

import { useEffect, useState } from "react";
import type { HttpTypes } from "@medusajs/types";
import { useRouter } from "next/navigation";
import "./account.css";
import { medusa } from "@/lib/medusa";
import { useCustomer } from "@/app/providers/customerProvider";
import { useLocale } from "@/components/LocaleProvider";

type AccountTab = "orders" | "details" | "addresses" | "settings";
/**
 * Customer account dashboard.
 *
 * Medusa's Store List Orders endpoint scopes results to the authenticated
 * customer when the session is attached to the request. Keep this request
 * session-authenticated and do not add a client-supplied customer_id filter.
 *
 * TODO: Add an integration regression test proving customer A cannot receive
 * customer B's orders, and unauthenticated requests are rejected.
 * TODO: Wire address, profile, newsletter, and account deletion controls.
 * TODO: Add an order-detail view with explicit ownership protection.
 */
type AccountOrder = { id: string; created_at?: string; total?: number; currency_code?: string; status?: string; items?: Array<{ title?: string }> };

export default function AccountPage() {
  const router = useRouter();
  const { locale, messages } = useLocale();
  const m = messages.account;
  const [activeTab, setActiveTab] = useState<AccountTab>("orders");
  const [orders, setOrders] = useState<AccountOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState(false);
  const [localCustomer, setLocalCustomer] = useState<HttpTypes.StoreCustomer | null>(null);
  const [addressBusy, setAddressBusy] = useState(false);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const { customer, loading, logout } = useCustomer();
  useEffect(() => { setLocalCustomer(customer); }, [customer]);

  useEffect(() => { if (!loading && !customer) router.replace(`/${locale}/login`); }, [loading, customer, router, locale]);
  useEffect(() => {
    if (!customer) return;
    let cancelled = false;
    async function loadOrders() {
      setOrdersLoading(true); setOrdersError(false);
      try {
        const response = await medusa.store.order.list({ limit: 50, order: "-created_at" });
        if (!cancelled) setOrders(response.orders as AccountOrder[]);
      } catch (error) {
        console.error("Failed to load customer orders:", error);
        if (!cancelled) setOrdersError(true);
      } finally { if (!cancelled) setOrdersLoading(false); }
    }
    void loadOrders(); return () => { cancelled = true; };
  }, [customer]);

  async function handleLogout() { await logout(); router.replace(`/${locale}/`); }

  async function saveAddress(data: Record<string, string>) {
    setAddressBusy(true); setAddressError(null);
    try {
      const response = editingAddressId
        ? await medusa.store.customer.updateAddress(editingAddressId, data)
        : await medusa.store.customer.createAddress(data);
      setLocalCustomer(response.customer);
      setEditingAddressId(null); setShowAddressForm(false);
    } catch (error) {
      console.error("Failed to save customer address:", error);
      setAddressError(m.addressSaveError);
    } finally { setAddressBusy(false); }
  }

  async function deleteAddress(addressId: string) {
    if (!window.confirm(m.deleteAddressConfirm)) return;
    setAddressBusy(true); setAddressError(null);
    try {
      const { parent } = await medusa.store.customer.deleteAddress(addressId);
      setLocalCustomer(parent);
      if (editingAddressId === addressId) setEditingAddressId(null);
    } catch (error) {
      console.error("Failed to delete customer address:", error);
      setAddressError(m.addressDeleteError);
    } finally { setAddressBusy(false); }
  }
  if (loading) return <div className="account-page">{m.loading}</div>;
  if (!customer) return null;
  const activeCustomer = localCustomer ?? customer;
  const addresses = activeCustomer.addresses ?? [];
  const fullName = [activeCustomer.first_name, activeCustomer.last_name].filter(Boolean).join(" ") || m.unknownSubject;
  const memberSince = customer.created_at ? new Date(customer.created_at).getFullYear() : m.unknown;
  const orderCount = orders.length;
  const tabs: { id: AccountTab; label: string }[] = [{ id: "orders", label: m.orders }, { id: "details", label: m.yourDetails }, { id: "addresses", label: m.whereToSend }, { id: "settings", label: m.settings }];
  const formatDate = (date?: string) => date ? new Date(date).toLocaleDateString(locale === "fa" ? "fa-IR" : "en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase().replace(/,/g, "") : m.unknown;
  const formatTotal = (total?: number, currencyCode = "USD") => typeof total === "number" ? new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", { style: "currency", currency: currencyCode.toUpperCase() }).format(total / 100) : "--";
  const displayStatus = (status?: string) => status ? status.replace(/_/g, " ").toUpperCase() : m.processing;

function AddressForm({ address, busy, onCancel, onSave, messages: m }: { address?: HttpTypes.StoreCustomerAddress; busy: boolean; onCancel: () => void; onSave: (data: Record<string, string>) => Promise<void>; messages: typeof messages.en.account }) {
  const [form, setForm] = useState<Record<string, string>>({
    address_name: address?.address_name ?? "", first_name: address?.first_name ?? "", last_name: address?.last_name ?? "",
    phone: address?.phone ?? "", province: address?.province ?? "", city: address?.city ?? "", postal_code: address?.postal_code ?? "",
    country_code: address?.country_code ?? "ir", address_1: address?.address_1 ?? "", address_2: address?.address_2 ?? "",
  });
  const valid = ["first_name","last_name","phone","city","postal_code","country_code","address_1"].every((key) => form[key]?.trim());
  const update = (key: string, value: string) => setForm((current) => ({ ...current, [key]: value }));
  return <form className="account-address-form" onSubmit={(event) => { event.preventDefault(); if (valid) void onSave(form); }}>
    <div className="account-form-grid">
      {([["address_name","address"],["first_name","firstName"],["last_name","lastName"],["phone","phone"],["province","province"],["city","city"],["postal_code","postalCode"],["country_code","countryCode"]] as const).map(([key,label]) => <label key={key}><span>{m[label]}</span><input value={form[key]} onChange={(event) => update(key,event.target.value)} required={["first_name","last_name","phone","city","postal_code","country_code"].includes(key)} /></label>)}
      <label className="account-form-wide"><span>{m.addressLine}</span><input value={form.address_1} onChange={(event) => update("address_1",event.target.value)} required /></label>
      <label className="account-form-wide"><span>{m.addressLine2}</span><input value={form.address_2} onChange={(event) => update("address_2",event.target.value)} /></label>
    </div>
    <div className="account-form-actions"><button type="button" className="account-edit" onClick={onCancel}>{m.cancel}</button><button type="submit" className="account-add-address" disabled={busy || !valid}>{busy ? m.saving : m.saveAddress}</button></div>
  </form>;
}

  return <div className="account-page">
    <section className="account-hero"><div className="account-kicker"><span>{m.file} {activeCustomer.id.slice(-6).toUpperCase()}</span><span>{m.classified}</span></div><div className="account-title-row"><div><p className="account-eyebrow">{m.eyebrow}</p><h1>{m.title1}<br />{m.title2}</h1></div><div className="account-stamp"><span>{m.status}</span><strong>{m.alive}</strong></div></div></section>
    <section className="account-profile"><div className="account-portrait"><span>DS</span><small>{m.subject}</small></div><div className="account-identity"><p className="account-label">{m.subjectName}</p><h2>{fullName.toUpperCase()}</h2><p className="account-email">{activeCustomer.email}</p><div className="account-meta"><span><small>{m.memberSince}</small>{memberSince}</span><span><small>{m.orders}</small>{orderCount.toString().padStart(2, "0")}</span><span><small>{m.status}</small>{m.active}</span></div></div><div className="account-actions"><button type="button" onClick={() => setActiveTab("details")}>{m.editProfile}</button><button type="button" onClick={() => void handleLogout()}>{m.logout}</button></div></section>
    <nav className="account-tabs" aria-label={m.sections}>{tabs.map((tab) => <button type="button" key={tab.id} className={`account-tab${activeTab === tab.id ? " is-active" : ""}`} onClick={() => setActiveTab(tab.id)} aria-current={activeTab === tab.id ? "page" : undefined}>{tab.label}{tab.id === "orders" && <span>{orderCount.toString().padStart(2, "0")}</span>}</button>)}</nav>
    <section className="account-content">
      {activeTab === "orders" && <section><div className="account-section-heading"><div><span className="account-section-index">01 /</span><h2>{m.recent}</h2></div><span className="account-section-note">{m.secrets}</span></div>{ordersLoading ? <div className="account-address-list"><p>{m.retrieving}</p></div> : ordersError ? <div className="account-address-list"><p>{m.unable}</p></div> : orders.length === 0 ? <div className="account-address-list"><p>{m.noOrders}</p><button className="btn" type="button" onClick={() => router.push(`/${locale}/shop`)}>{m.enterShop}</button></div> : <div className="account-orders">{orders.map((order) => { const itemTitle = order.items?.[0]?.title || m.orderContents; const status = displayStatus(order.status); return <div className="account-order" key={order.id}><div><small>{m.order}</small><strong>#{order.id.replace(/^order_/, "").slice(-8).toUpperCase()}</strong></div><div><small>{m.date}</small><span>{formatDate(order.created_at)}</span></div><div className="account-order-item"><small>{m.item}</small><strong>{itemTitle.toUpperCase()}</strong></div><div><small>{m.total}</small><span>{formatTotal(order.total, order.currency_code)}</span></div><div className={`account-order-status ${status.toLowerCase().replace(/\s+/g, "-")}`}>{status}</div></div>; })}</div>}</section>}
      {activeTab === "details" && <section><div className="account-section-heading"><div><span className="account-section-index">02 /</span><h2>{m.yourDetails}</h2></div></div><div className="account-info-grid"><article className="account-info-card"><span className="account-label">{m.identity}</span><h3>{fullName.toUpperCase()}</h3><p>{customer.email}</p>{activeCustomer.phone && <p>{activeCustomer.phone}</p>}<button className="account-edit" type="button">{m.editDetails}</button></article><article className="account-info-card"><span className="account-label">{m.membership}</span><h3>DEADSAINT</h3><p>{m.memberSinceText} {memberSince}</p><p>{m.ordersPlaced} {orderCount.toString().padStart(2, "0")}</p><p>{m.accountStatus} {m.active}</p></article></div></section>}
      {activeTab === "addresses" && <section>
  <div className="account-section-heading">
    <div><span className="account-section-index">03 /</span><h2>{m.whereToSend}</h2></div>
    <button className="account-add-address" type="button" disabled={addressBusy} onClick={() => { setEditingAddressId(null); setAddressError(null); setShowAddressForm(true); }}>{m.addAddress}</button>
  </div>
  {addressError && <p className="account-form-error">{addressError}</p>}
  {showAddressForm && <AddressForm address={editingAddressId ? addresses.find((item) => item.id === editingAddressId) : undefined} busy={addressBusy} onCancel={() => { setShowAddressForm(false); setEditingAddressId(null); }} onSave={saveAddress} messages={m} />}
  {addresses.length === 0 && !showAddressForm ? <div className="account-address-list"><p>{m.noAddresses}</p></div> :
    <div className="account-address-list">{addresses.map((address) => <article className="account-address" key={address.id}>
      <div><span className="account-label">{address.address_name || m.address}</span><h3>{[address.first_name, address.last_name].filter(Boolean).join(" ") || activeCustomer.first_name || m.unknown}</h3><p>{address.address_1}{address.address_2 ? `, ${address.address_2}` : ""}</p><p>{[address.city, address.province].filter(Boolean).join(", ")} {address.postal_code || ""}</p>{address.phone && <p>{address.phone}</p>}</div>
      <div className="account-address-actions"><span className="account-address-badge">{address.is_default_shipping ? m.defaultShipping : m.saved}</span><button type="button" className="account-edit" disabled={addressBusy} onClick={() => { setEditingAddressId(address.id); setAddressError(null); setShowAddressForm(true); }}>{m.editAddress}</button><button type="button" className="account-edit account-danger" disabled={addressBusy} onClick={() => void deleteAddress(address.id)}>{m.deleteAddress}</button></div>
    </article>)}</div>}
</section>}
      {activeTab === "settings" && <section><div className="account-section-heading"><div><span className="account-section-index">04 /</span><h2>{m.settings}</h2></div></div><div className="account-setting-list"><div className="account-setting"><div><strong>{m.newsletter}</strong><span>{m.newsletterBody}</span></div><span className="account-toggle" aria-hidden="true" /></div><div className="account-setting"><div><strong>{m.orderUpdates}</strong><span>{m.orderUpdatesBody}</span></div><span className="account-toggle" aria-hidden="true" /></div><div className="account-setting"><div><strong>{m.deleteAccount}</strong><span>{m.deleteBody}</span></div><button className="account-delete" type="button">{m.delete}</button></div></div></section>}
    </section>
    <footer className="account-footer"><p>{m.footer1}<br />{m.footer2}</p><strong>{locale === "fa" ? "☠ مرده‌ها را زنده نگه دار ☠" : "☠ KEEP THE DEAD ALIVE ☠"}</strong></footer>
  </div>;
}
