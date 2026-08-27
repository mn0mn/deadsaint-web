import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <h1>404</h1>
      <p>That page doesn&apos;t exist.</p>
      <Link href="/">Back home</Link>
    </section>
  );
}
