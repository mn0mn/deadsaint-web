"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { medusa } from "@/lib/medusa";
import type { HttpTypes } from "@medusajs/types";

type CustomerContextValue = {
  customer: HttpTypes.StoreCustomer | null;
  loading: boolean;
  error: string | null;
  refreshCustomer: () => Promise<void>;
  logout: () => Promise<void>;
};

const CustomerContext = createContext<CustomerContextValue | undefined>(
  undefined,
);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] =
    useState<HttpTypes.StoreCustomer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshCustomer = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { customer } = await medusa.store.customer.retrieve();
      setCustomer(customer);
    } catch {
      setCustomer(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCustomer();
  }, [refreshCustomer]);

  const logout = useCallback(async () => {
    try {
      setError(null);
      await medusa.auth.logout();
      setCustomer(null);
    } catch (err) {
      console.error("Failed to log out:", err);
      setError("Failed to log out.");
      throw err;
    }
  }, []);

  const value = useMemo<CustomerContextValue>(
    () => ({
      customer,
      loading,
      error,
      refreshCustomer,
      logout,
    }),
    [customer, loading, error, refreshCustomer, logout],
  );

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const context = useContext(CustomerContext);

  if (!context) {
    throw new Error("useCustomer must be used inside a CustomerProvider");
  }

  return context;
}
