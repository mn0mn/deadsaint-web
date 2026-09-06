"use client";

import { useState } from "react";
import "./account.css";
import { useCustomer } from "@/app/providers/customerProvider";

type AccountTab = "orders" | "details" | "addresses" | "settings";

const orders = [
  { id: "#DS-00031", date: "SEP 02, 2026", item: "BLACK SAINT TEE", price: "$42.00", status: "DELIVERED" },
  { id: "#DS-00028", date: "AUG 24, 2026", item: "DEAD RELIGION HOODIE", price: "$89.00", status: "SHIPPED" },
  { id: "#DS-00019", date: "AUG 11, 2026", item: "SAINTS & SINNERS CAP", price: "$31.00", status: "DELIVERED" },
];

const tabs: { id: AccountTab; label: string }[] = [
  { id: "orders", label: "ORDERS" },
  { id: "details", label: "DETAILS" },
  { id: "addresses", label: "ADDRESSES" },
  { id: "settings", label: "SETTINGS" },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<AccountTab>("orders");
  const { customer, loading, logout } = useCustomer();

  if (loading) {
    return <div className="account-page">LOADING YOUR DEAD FILE...</div>;
  }

  if (!customer) {
    return <div className="account-page">NO ACTIVE DEAD FILE FOUND.</div>;
  }

  const fullName = [customer.first_name, customer.last_name].filter(Boolean).join(" ") || "UNKNOWN SUBJECT";
  const memberSince = customer.created_at
    ? new Date(customer.created_at).getFullYear()
    : "UNKNOWN";

  return (
    <div className="account-page">
      <section className="account-hero">
        <div className="account-kicker">
          <span>FILE NO. {customer.id.slice(-6).toUpperCase()}</span>
          <span>CLASSIFIED / CUSTOMER</span>
        </div>
        <div className="account-title-row">
          <div>
            <p className="account-eyebrow">THE DEAD FILE</p>
            <h1>YOUR<br />RECORD.</h1>
          </div>
          <div className="account-stamp">
            <span>STATUS</span>
            <strong>ALIVE-ish</strong>
          </div>
        </div>
      </section>

      <section className="account-profile">
        <div className="account-portrait">
          <span>DS</span>
          <small>SUBJECT</small>
        </div>
        <div className="account-identity">
          <p className="account-label">SUBJECT NAME</p>
          <h2>{fullName.toUpperCase()}</h2>
          <p className="account-email">{customer.email}</p>
          <div className="account-meta">
            <span><small>MEMBER SINCE</small>{memberSince}</span>
            <span><small>ORDERS</small>03</span>
            <span><small>STATUS</small>ACTIVE</span>
          </div>
        </div>
        <div className="account-actions">
          <button type="button" onClick={() => setActiveTab("details")}>EDIT PROFILE ↗</button>
          <button type="button" onClick={() => void logout()}>LOG OUT ↗</button>
        </div>
      </section>

      <nav className="account-tabs" aria-label="Account sections">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            className={`account-tab${activeTab === tab.id ? " is-active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
            aria-current={activeTab === tab.id ? "page" : undefined}
          >
            {tab.label}{tab.id === "orders" && <span>03</span>}
          </button>
        ))}
      </nav>

      <section className="account-content">
        {activeTab === "orders" && (
          <section>
            <div className="account-section-heading">
              <div><span className="account-section-index">01 /</span><h2>RECENT ACTIVITY</h2></div>
              <span className="account-section-note">NO SECRETS. PROBABLY.</span>
            </div>
            <div className="account-orders">
              {orders.map((order) => (
                <div className="account-order" key={order.id}>
                  <div><small>ORDER</small><strong>{order.id}</strong></div>
                  <div><small>DATE</small><span>{order.date}</span></div>
                  <div className="account-order-item"><small>ITEM</small><strong>{order.item}</strong></div>
                  <div><small>TOTAL</small><span>{order.price}</span></div>
                  <div className={`account-order-status ${order.status.toLowerCase()}`}>{order.status}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "details" && (
          <section>
            <div className="account-section-heading"><div><span className="account-section-index">02 /</span><h2>YOUR DETAILS</h2></div></div>
            <div className="account-info-grid">
              <article className="account-info-card">
                <span className="account-label">IDENTITY</span>
                <h3>{fullName.toUpperCase()}</h3>
                <p>{customer.email}</p>
                {customer.phone && <p>{customer.phone}</p>}
                <button className="account-edit" type="button">EDIT DETAILS ↗</button>
              </article>
              <article className="account-info-card">
                <span className="account-label">MEMBERSHIP</span>
                <h3>DEADSAINT</h3>
                <p>Member since: {memberSince}</p>
                <p>Orders placed: 03</p>
                <p>Account status: ACTIVE</p>
              </article>
            </div>
          </section>
        )}

        {activeTab === "addresses" && (
          <section>
            <div className="account-section-heading"><div><span className="account-section-index">03 /</span><h2>WHERE TO SEND THE DEAD</h2></div></div>
            <div className="account-address-list">
              <p>NO SAVED ADDRESSES YET.</p>
              <button className="btn" type="button">+ ADD ADDRESS</button>
            </div>
          </section>
        )}

        {activeTab === "settings" && (
          <section>
            <div className="account-section-heading"><div><span className="account-section-index">04 /</span><h2>SETTINGS</h2></div></div>
            <div className="account-setting-list">
              <div className="account-setting"><div><strong>NEWSLETTER</strong><span>Receive DeadSaint transmissions.</span></div><span className="account-toggle" aria-hidden="true" /></div>
              <div className="account-setting"><div><strong>ORDER UPDATES</strong><span>Get notified when your package moves.</span></div><span className="account-toggle" aria-hidden="true" /></div>
              <div className="account-setting"><div><strong>DELETE ACCOUNT</strong><span>This one is permanent. Obviously.</span></div><button className="account-delete" type="button">DELETE ↗</button></div>
            </div>
          </section>
        )}
      </section>

      <footer className="account-footer">
        <p>THIS FILE IS PROPERTY OF DEADSAINT.<br />HANDLE WITH QUESTIONABLE CARE.</p>
        <strong>☠ KEEP THE DEAD ALIVE ☠</strong>
      </footer>
    </div>
  );
}
