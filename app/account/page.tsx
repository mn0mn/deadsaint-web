"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./account.css";
import { medusa } from "@/lib/medusa";
import { useCustomer } from "@/app/providers/customerProvider";

type AccountTab = "orders" | "details" | "addresses" | "settings";

type AccountOrder = {
  id: string;
  created_at?: string;
  total?: number;
  currency_code?: string;
  status?: string;
  items?: Array<{ title?: string }>;
};

const tabs: { id: AccountTab; label: string }[] = [
  { id: "orders", label: "ORDERS" },
  { id: "details", label: "DETAILS" },
  { id: "addresses", label: "ADDRESSES" },
  { id: "settings", label: "SETTINGS" },
];

function formatDate(date?: string) {
  if (!date) return "UNKNOWN";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).toUpperCase().replace(/,/g, "");
}

function formatTotal(total?: number, currencyCode = "USD") {
  if (typeof total !== "number") return "--";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode.toUpperCase(),
  }).format(total / 100);
}

function displayStatus(status?: string) {
  if (!status) return "PROCESSING";
  return status.replace(/_/g, " ").toUpperCase();
}

export default function AccountPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AccountTab>("orders");
  const [orders, setOrders] = useState<AccountOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState(false);
  const { customer, loading, logout } = useCustomer();

  useEffect(() => {
    if (!loading && !customer) {
      router.replace("/login");
    }
  }, [loading, customer, router]);

  useEffect(() => {
    if (!customer) return;

    let cancelled = false;

    async function loadOrders() {
      setOrdersLoading(true);
      setOrdersError(false);

      try {
        const response = await medusa.store.order.list({
          customer_id: customer.id,
          limit: 50,
          order: "-created_at",
        });

        if (!cancelled) {
          setOrders(response.orders as AccountOrder[]);
        }
      } catch (error) {
        console.error("Failed to load customer orders:", error);
        if (!cancelled) {
          setOrdersError(true);
        }
      } finally {
        if (!cancelled) {
          setOrdersLoading(false);
        }
      }
    }

    void loadOrders();

    return () => {
      cancelled = true;
    };
  }, [customer]);

  async function handleLogout() {
    await logout();
    router.replace("/");
  }

  if (loading) {
    return <div className="account-page">LOADING YOUR DEAD FILE...</div>;
  }

  if (!customer) {
    return null;
  }

  const fullName = [customer.first_name, customer.last_name].filter(Boolean).join(" ") || "UNKNOWN SUBJECT";
  const memberSince = customer.created_at
    ? new Date(customer.created_at).getFullYear()
    : "UNKNOWN";
  const orderCount = orders.length;

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
            <span><small>ORDERS</small>{orderCount.toString().padStart(2, "0")}</span>
            <span><small>STATUS</small>ACTIVE</span>
          </div>
        </div>
        <div className="account-actions">
          <button type="button" onClick={() => setActiveTab("details")}>EDIT PROFILE ↗</button>
          <button type="button" onClick={() => void handleLogout()}>LOG OUT ↗</button>
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
            {tab.label}{tab.id === "orders" && <span>{orderCount.toString().padStart(2, "0")}</span>}
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

            {ordersLoading ? (
              <div className="account-address-list"><p>RETRIEVING YOUR RECORDS...</p></div>
            ) : ordersError ? (
              <div className="account-address-list"><p>UNABLE TO RETRIEVE ORDER RECORDS.</p></div>
            ) : orders.length === 0 ? (
              <div className="account-address-list">
                <p>NO ORDERS IN THE FILE YET.</p>
                <button className="btn" type="button" onClick={() => router.push("/shop")}>ENTER THE SHOP ↗</button>
              </div>
            ) : (
              <div className="account-orders">
                {orders.map((order) => {
                  const itemTitle = order.items?.[0]?.title || "ORDER CONTENTS";
                  const status = displayStatus(order.status);

                  return (
                    <div className="account-order" key={order.id}>
                      <div><small>ORDER</small><strong>#{order.id.replace(/^order_/, "").slice(-8).toUpperCase()}</strong></div>
                      <div><small>DATE</small><span>{formatDate(order.created_at)}</span></div>
                      <div className="account-order-item"><small>ITEM</small><strong>{itemTitle.toUpperCase()}</strong></div>
                      <div><small>TOTAL</small><span>{formatTotal(order.total, order.currency_code)}</span></div>
                      <div className={`account-order-status ${status.toLowerCase().replace(/\s+/g, "-")}`}>{status}</div>
                    </div>
                  );
                })}
              </div>
            )}
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
                <p>Orders placed: {orderCount.toString().padStart(2, "0")}</p>
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
