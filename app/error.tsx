"use client";

import StoreUnavailable from "@/components/StoreUnavailable";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <StoreUnavailable reset={reset} fullScreen />;
}
