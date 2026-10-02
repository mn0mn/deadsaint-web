"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { MedusaProduct } from "@/lib/medusa";

type FilterOption = {
  id: string;
  title: string;
  values: { id: string; value: string }[];
};

export default function CategoryFilters({
  products,
  options,
}: {
  products: MedusaProduct[];
  options: FilterOption[];
}) {
  const [selected, setSelected] = useState<Record<string, string[]>>({});

  const filtered = useMemo(() => {
    return products.filter((product) =>
      Object.entries(selected).every(([optionId, values]) => {
        if (!values.length) return true;
        const productOption = product.options?.find((option) => option.id === optionId);
        const productValueIds = new Set((productOption?.values ?? []).map((value) => value.id));
        return values.some((valueId) => productValueIds.has(valueId));
      })
    );
  }, [products, selected]);

  const toggle = (optionId: string, valueId: string) => {
    setSelected((current) => {
      const values = current[optionId] ?? [];
      const nextValues = values.includes(valueId)
        ? values.filter((id) => id !== valueId)
        : [...values, valueId];

      return { ...current, [optionId]: nextValues };
    });
  };

  const activeCount = Object.values(selected).reduce((count, values) => count + values.length, 0);

  return (
    <>
      {options.length > 0 && (
        <div className="category-filters">
          <div className="category-filters-head">
            <span>FILTER / {activeCount.toString().padStart(2, "0")}</span>
            {activeCount > 0 && (
              <button type="button" onClick={() => setSelected({})}>
                CLEAR ALL
              </button>
            )}
          </div>
          <div className="category-filter-groups">
            {options.map((option) => (
              <details className="category-filter" key={option.id}>
                <summary>
                  <span>{option.title}</span>
                  <span>+</span>
                </summary>
                <div className="category-filter-values">
                  {option.values.map((value) => {
                    const checked = selected[option.id]?.includes(value.id) ?? false;
                    return (
                      <label key={value.id} className={checked ? "is-selected" : ""}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggle(option.id, value.id)}
                        />
                        <span>{value.value}</span>
                      </label>
                    );
                  })}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}

      <div className="category-results-head">
        <span>{filtered.length.toString().padStart(2, "0")} RESULTS</span>
        {activeCount > 0 && <span>FILTERED</span>}
      </div>

      <div className="grid category-grid">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="category-empty">
          <strong>NOTHING MATCHES.</strong>
          <span>Clear a filter and let the dead walk again.</span>
        </div>
      )}
    </>
  );
}
