import styles from "./WhyChooseSection.module.css";

const features = [
  {
    title: "Engineered for Canadian Climates",
    desc: "Built to withstand harsh weather—from Calgary winters to summer heat. Year-round performance you can rely on.",
  },
  {
    title: "Premium Rust-Resistant Aluminum",
    desc: "Lightweight, corrosion-resistant construction. No rust, no rot, no compromise—decades of durability.",
  },
  {
    title: "Fully Custom + Professional Install",
    desc: "Every project tailored to your space and needs. From design to completion, we deliver quality craftsmanship.",
  },
];

export default function WhyChooseSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.headingWrap}>
          <h2 className={styles.heading}>
            Why Choose <span className={styles.headingAccent}>True North</span> Outdoor Cabinets?
          </h2>
          <div className={styles.headingLine} aria-hidden />
        </div>

        <div className={styles.grid}>
          {features.map((f, i) => (
            <div key={i} className={styles.card}>
              <span className={styles.lineLeft} aria-hidden />
              <span className={styles.lineRight} aria-hidden />

              <h3 className={styles.title}>{f.title}</h3>

              <div className={styles.divider} />

              <p className={styles.desc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
