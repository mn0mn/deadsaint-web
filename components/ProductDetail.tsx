"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/app/providers/cartProvider";
import { formatPrice } from "@/lib/format";
import styles from "./ProductDetail.module.css";

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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const selectedVariant = variants.find((variant) => variant.id === selectedVariantId);
  const inStock = selectedVariant
    ? !selectedVariant.manage_inventory || (selectedVariant.inventory_quantity ?? 0) > 0
    : false;

  function showPreviousImage() {
    if (images.length < 2) return;
    setActiveImage((current) => (current - 1 + images.length) % images.length);
  }

  function showNextImage() {
    if (images.length < 2) return;
    setActiveImage((current) => (current + 1) % images.length);
  }

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowLeft") showPreviousImage();
      if (event.key === "ArrowRight") showNextImage();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, images.length]);

  async function handleAddToCart() {
    if (!selectedVariant || !inStock || adding) return;
    setAdding(true);
    try {
      await addItem(selectedVariant.id);
    } finally {
      setAdding(false);
    }
  }

  function handleTouchStart(event: React.TouchEvent<HTMLImageElement>) {
    setTouchStartX(event.changedTouches[0]?.clientX ?? null);
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLImageElement>) {
    if (touchStartX === null) return;
    const deltaX = event.changedTouches[0]?.clientX - touchStartX;
    setTouchStartX(null);
    if (Math.abs(deltaX) < 50) return;
    if (deltaX > 0) showPreviousImage();
    else showNextImage();
  }

  return (
    <section className={`product-detail ${styles.detail}`}>
      <div className={styles.gallery}>
        <button
          type="button"
          className={styles.galleryMain}
          onClick={() => images.length > 0 && setLightboxOpen(true)}
          aria-label={`Open ${title} image gallery`}
        >
          {images[activeImage] ? (
            <img src={images[activeImage]} alt={title} className="product-detail-image" />
          ) : null}
          {images.length > 1 ? (
            <span className={styles.galleryCount}>
              {String(activeImage + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
          ) : null}
          {images.length > 1 ? <span className={styles.zoomHint}>CLICK TO EXPAND</span> : null}
        </button>

        {images.length > 1 ? (
          <div className={styles.galleryThumbs} aria-label="Product images">
            {images.map((src, index) => (
              <button
                key={`${src}-${index}`}
                type="button"
                className={`${styles.galleryThumb} ${activeImage === index ? styles.galleryThumbActive : ""}`}
                onClick={() => setActiveImage(index)}
                aria-label={`View image ${index + 1}`}
                aria-current={activeImage === index ? "true" : undefined}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className={styles.info}>
        <span className={styles.kicker}>DEAD SAINT / ARTIFACT</span>
        <h1>{title}</h1>
        {description ? <p className={styles.description}>{description}</p> : null}

        <div className={styles.purchase}>
          <label htmlFor="product-variant">SELECT VARIATION</label>
          <select id="product-variant" value={selectedVariantId} onChange={(event) => setSelectedVariantId(event.target.value)} disabled={variants.length === 0}>
            {variants.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.title || "Default"} · {formatPrice(variant.calculated_price?.calculated_amount ?? 0, variant.calculated_price?.currency_code ?? "usd")}
              </option>
            ))}
          </select>
          <button type="button" className={`btn ${styles.addButton}`} disabled={!selectedVariant || !inStock || adding} onClick={handleAddToCart}>
            {adding ? "ADDING..." : inStock ? "ADD TO CART" : "SOLD OUT"}
          </button>
        </div>

        <div className={styles.meta}>
          <span>FREE SHIPPING ON ORDERS OVER €100</span>
          <span>MADE FOR THE LIVING DEAD</span>
        </div>
      </div>

      {lightboxOpen && images[activeImage] ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image gallery`}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={() => setLightboxOpen(false)}
            aria-label="Close image gallery"
          >
            ×
          </button>

          <button
            type="button"
            className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
            onClick={(event) => {
              event.stopPropagation();
              showPreviousImage();
            }}
            aria-label="Previous image"
            disabled={images.length < 2}
          >
            ←
          </button>

          <figure className={styles.lightboxFigure} onClick={(event) => event.stopPropagation()}>
            <img
              src={images[activeImage]}
              alt={`${title}, image ${activeImage + 1} of ${images.length}`}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            />
            <figcaption>
              <span>{title}</span>
              <span>{String(activeImage + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
            </figcaption>
          </figure>

          <button
            type="button"
            className={`${styles.lightboxNav} ${styles.lightboxNext}`}
            onClick={(event) => {
              event.stopPropagation();
              showNextImage();
            }}
            aria-label="Next image"
            disabled={images.length < 2}
          >
            →
          </button>

          {images.length > 1 ? (
            <div className={styles.lightboxThumbs} onClick={(event) => event.stopPropagation()} aria-label="Choose product image">
              {images.map((src, index) => (
                <button
                  key={`${src}-lightbox-${index}`}
                  type="button"
                  className={`${styles.lightboxThumb} ${activeImage === index ? styles.lightboxThumbActive : ""}`}
                  onClick={() => setActiveImage(index)}
                  aria-label={`View image ${index + 1}`}
                  aria-current={activeImage === index ? "true" : undefined}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
