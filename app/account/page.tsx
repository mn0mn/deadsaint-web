"use client";

import { useState } from "react";
import "./account.css";

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

  return (
    <div className="account-page">
      <section className="account-hero">
        <div className="account-kicker">
          <span>FILE NO. DS-000001</span>
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
          <h2>JOHN DOE</h2>
          <p className="account-email">john@example.com</p>
          <div className="account-meta">
            <span><small>MEMBER SINCE</small>2026</span>
            <span><small>ORDERS</small>03</span>
            <span><small>STATUS</small>ACTIVE</span>
          </div>
        </div>
        <div className="account-actions">
          <button type="button" onClick={() => setActiveTab("details")}>EDIT PROFILE ↗</button>
          <button type="button">LOG OUT ↗</button>
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

      <main className="account-content">
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
                <h3>JOHN DOE</h3>
                <p>john@example.com</p>
                <p>+994 00 000 00 00</p>
                <button className="account-edit" type="button">EDIT DETAILS ↗</button>
              </article>
              <article className="account-info-card">
                <span className="account-label">MEMBERSHIP</span>
                <h3>DEADSAINT</h3>
                <p>Member since: 2026</p>
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
              <article className="account-address">
                <div>
                  <span className="account-label">SHIPPING ADDRESS</span>
                  <h3>HOME</h3>
                  <p>JOHN DOE<br />42 DEAD END STREET<br />BAKU, AZ 1000<br />AZERBAIJAN</p>
                </div>
                <span className="account-address-badge">DEFAULT</span>
              </article>
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
      </main>

      <footer className="account-footer">
        <p>THIS FILE IS PROPERTY OF DEADSAINT.<br />HANDLE WITH QUESTIONABLE CARE.</p>
        <strong>☠ KEEP THE DEAD ALIVE ☠</strong>
      </footer>
    </div>
  );
}
