"use client";

import { useState } from "react";
import { useCart } from "@/app/providers/cartProvider";
import { formatPrice } from "@/lib/format";

type Variant = {
  id: string;
  title?: string | null;
  manage_inventory?: boolean;
  inventory_quantity?: number | null;
  calculated_price?: {
    calculated_amount?: number | null;
    currency_code?: string | null;
  } | null;
};

type Props = {
  title: string;
  description?: string | null;
  images: string[];
  variants: Variant[];
};

export default function ProductDetail({
  title,
  description,
  images,
  variants,
}: Props) {
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id ?? "");
  const [adding, setAdding] = useState(false);

  const selectedVariant = variants.find((variant) => variant.id === selectedVariantId);
  const inStock = selectedVariant
    ? !selectedVariant.manage_inventory || (selectedVariant.inventory_quantity ?? 0) > 0
    : false;

  async function handleAddToCart() {
    if (!selectedVariant || !inStock || adding) return;

    setAdding(true);
    try {
      await addItem(selectedVariant.id);
    } finally {
      setAdding(false);
    }
  }

  return (
    <section className="product-detail">
      <div className="product-gallery">
        <div className="product-gallery-main">
          {images[activeImage] ? (
            <img src={images[activeImage]} alt={title} className="product-detail-image" />
          ) : null}
          {images.length > 1 ? (
            <span className="product-gallery-count">
              {String(activeImage + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
          ) : null}
        </div>

        {images.length > 1 ? (
          <div className="product-gallery-thumbs" aria-label="Product images">
            {images.map((src, index) => (
              <button
                key={`${src}-${index}`}
                type="button"
                className={`product-gallery-thumb${activeImage === index ? " is-active" : ""}`}
                onClick={() => setActiveImage(index)}
                aria-label={`View image ${index + 1}`}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="product-detail-info">
        <span className="product-detail-kicker">DEAD SAINT / ARTIFACT</span>
        <h1>{title}</h1>
        {description ? <p className="product-detail-description">{description}</p> : null}

        <div className="product-purchase">
          <label htmlFor="product-variant">SELECT VARIATION</label>
          <select
            id="product-variant"
            value={selectedVariantId}
            onChange={(event) => setSelectedVariantId(event.target.value)}
            disabled={variants.length === 0}
          >
            {variants.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.title || "Default"} · {formatPrice(
                  variant.calculated_price?.calculated_amount ?? 0,
                  variant.calculated_price?.currency_code ?? "usd"
                )}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="btn product-add-button"
            disabled={!selectedVariant || !inStock || adding}
            onClick={handleAddToCart}
          >
            {adding ? "ADDING..." : inStock ? "ADD TO CART" : "SOLD OUT"}
          </button>
        </div>

        <div className="product-detail-meta">
          <span>FREE SHIPPING ON ORDERS OVER €100</span>
          <span>MADE FOR THE LIVING DEAD</span>
        </div>
      </div>
    </section>
  );
}
