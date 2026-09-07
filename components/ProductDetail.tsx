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

export default function ProductDetail({ title, description, images, variants }: Props) {
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
    <section className="product-detail product-detail-redesign">
      <style>{`
        .product-detail-redesign { grid-template-columns: minmax(0, 1.35fr) minmax(320px, .65fr); gap: 56px; padding: 56px 5vw 100px; align-items: start; }
        .product-gallery-main { position: relative; background: var(--ink); border: 3px solid var(--ink); aspect-ratio: 1 / 1; overflow: hidden; }
        .product-gallery-main .product-detail-image { transition: opacity .18s ease, transform .3s ease; }
        .product-gallery-count { position: absolute; right: 14px; bottom: 12px; padding: 6px 9px; background: var(--paper); color: var(--ink); font: 800 11px/1 monospace; letter-spacing: .08em; }
        .product-gallery-thumbs { display: grid; grid-template-columns: repeat(auto-fill, minmax(76px, 1fr)); gap: 9px; margin-top: 12px; }
        .product-gallery-thumb { padding: 0; aspect-ratio: 1; border: 2px solid transparent; background: var(--ink); cursor: pointer; overflow: hidden; opacity: .62; transition: opacity .15s ease, transform .15s ease, border-color .15s ease; }
        .product-gallery-thumb:hover { opacity: 1; transform: translateY(-2px); }
        .product-gallery-thumb.is-active { border-color: var(--blood); opacity: 1; }
        .product-gallery-thumb img { display: block; width: 100%; height: 100%; object-fit: contain; }
        .product-detail-info { position: sticky; top: 28px; }
        .product-detail-kicker, .product-purchase label, .product-detail-meta { font: 800 11px/1.4 monospace; letter-spacing: .12em; text-transform: uppercase; }
        .product-detail-kicker { color: var(--blood); }
        .product-detail-info h1 { margin: 14px 0 22px; font-size: clamp(2.6rem, 6vw, 5.8rem); line-height: .82; letter-spacing: -.06em; text-transform: uppercase; }
        .product-detail-description { max-width: 560px; line-height: 1.7; color: var(--gray); }
        .product-purchase { margin-top: 38px; padding-top: 24px; border-top: 3px solid var(--ink); }
        .product-purchase label { display: block; margin-bottom: 9px; }
        .product-purchase select { width: 100%; min-height: 52px; padding: 0 14px; border: 2px solid var(--ink); border-radius: 0; background: var(--paper); color: var(--ink); font: 700 13px/1 monospace; text-transform: uppercase; cursor: pointer; }
        .product-add-button { width: 100%; margin-top: 10px; min-height: 56px; font: 900 13px/1 monospace; letter-spacing: .12em; transition: background .15s ease, color .15s ease, transform .15s ease; }
        .product-add-button:hover:not(:disabled) { background: var(--blood); color: var(--paper); transform: translateY(-2px); }
        .product-add-button:disabled { cursor: not-allowed; opacity: .45; }
        .product-detail-meta { display: grid; gap: 10px; margin-top: 22px; padding-top: 18px; border-top: 1px solid #00000033; color: var(--gray); }
        @media (max-width: 760px) { .product-detail-redesign { grid-template-columns: 1fr; gap: 32px; padding-top: 32px; } .product-detail-info { position: static; } .product-detail-info h1 { font-size: clamp(3rem, 15vw, 5rem); } }
      `}</style>

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
              <button key={`${src}-${index}`} type="button" className={`product-gallery-thumb${activeImage === index ? " is-active" : ""}`} onClick={() => setActiveImage(index)} aria-label={`View image ${index + 1}`}>
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
          <select id="product-variant" value={selectedVariantId} onChange={(event) => setSelectedVariantId(event.target.value)} disabled={variants.length === 0}>
            {variants.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.title || "Default"} · {formatPrice(variant.calculated_price?.calculated_amount ?? 0, variant.calculated_price?.currency_code ?? "usd")}
              </option>
            ))}
          </select>
          <button type="button" className="btn product-add-button" disabled={!selectedVariant || !inStock || adding} onClick={handleAddToCart}>
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
