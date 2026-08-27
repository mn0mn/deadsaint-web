import Link from "next/link";

const CODE = [
  {
    n: "01",
    title: "Small batch, no restocks",
    body: "When it's gone, it's gone. We'd rather sell out than flood landfills with leftover stock nobody wanted.",
  },
  {
    n: "02",
    title: "Built to survive the pit",
    body: "Heavyweight fabric, reinforced seams, patch-ready panels. If it can't take a beating, it doesn't ship.",
  },
  {
    n: "03",
    title: "DIY, not corporate",
    body: "No focus groups. No trend chasing. Just people who live in this scene making gear for people who live in it too.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <span className="eyebrow">// The Manifesto //</span>
        <h1>
          We don&apos;t design trends.
          <br />
          We design battle scars.
        </h1>
      </section>

      <section className="about-body">
        <div className="about-copy">
          <p>
            Deadsaint started in a garage with a screen press and a stack of
            old band tees nobody else wanted. No investors, no business plan —
            just a spray bottle of bleach, a stack of stencils, and too much
            time spent at shows watching people patch their jackets by hand.
          </p>
          <p>
            Every patch, pin, and piece we put out is built for people who
            wear their scene on their sleeve — literally. No fast fashion. No
            throwaway drops. Just gear that survives the pit and looks better
            for it.
          </p>
          <Link href="/shop" className="btn">
            Shop the drop
          </Link>
        </div>

        <div className="patch">
          <div className="patch-inner">
            <span>Sworn to</span>
            <strong>Loud</strong>
          </div>
        </div>
      </section>

      <section className="the-code">
        <h2>The Code</h2>
        <div className="code-grid">
          {CODE.map((item) => (
            <div className="code-item" key={item.n}>
              <span className="code-n">{item.n}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
