import { cn } from "@/lib/utils";
import styles from "./About.module.css";
import aboutImage from "@/assets/about.webp";

const About = () => {
  return (
    <div className={cn(styles.root, "page-fade-in pt-20")}>
      {/* Hero — banner from public/Productpage/outdoor.webp */}
      <section className="relative min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden">
        <img
          src="/Productpage/outdoor.webp"
          alt="True North outdoor kitchen"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "var(--overlay-gradient)" }} />
        <div className="relative z-10 text-center px-4 sm:px-6 py-12 sm:py-16">
          <h1 className="heading-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground">Who We Are</h1>
        </div>
      </section>

      {/* About Us — responsive: mobile stacked, tablet/laptop row with overlap */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="relative flex flex-col md:flex-row md:items-stretch gap-6 md:gap-0 min-h-0 md:min-h-[420px] lg:min-h-[520px] xl:min-h-[600px]">
            {/* Image — mobile full, tablet+ right side, responsive height */}
            <div className="relative w-full aspect-[4/3] md:absolute md:top-0 md:right-0 md:bottom-0 md:left-auto md:w-[58%] lg:w-[55%] md:aspect-auto md:h-[420px] lg:h-[520px] xl:h-[600px] md:translate-y-[-16px] lg:translate-y-[-24px] xl:translate-y-[-32px] order-1 shrink-0">
              <img
                src={aboutImage}
                alt="True North Patio Cabinets — custom outdoor cabinet systems"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent pointer-events-none" />
            </div>
            {/* Card — responsive width, padding, and height */}
            <div className="relative z-10 md:w-[48%] lg:w-[45%] md:min-h-[420px] lg:min-h-[520px] xl:min-h-[600px] flex order-2">
              <div className="w-full border-l border-primary pl-5 pr-5 py-6 sm:pl-6 sm:pr-6 sm:py-7 md:pl-7 md:pr-7 md:py-8 lg:pl-8 lg:pr-8 lg:py-10 bg-card/95 backdrop-blur-sm border border-border shadow-xl self-center">
                <span className="font-body text-[10px] tracking-[0.25em] uppercase text-primary mb-3 sm:mb-4 block">Who We Are</span>
                <h2 className="heading-section text-2xl sm:text-3xl md:text-4xl text-foreground mb-6 md:mb-8">
                  About Us
                </h2>
                <p className="text-body text-sm sm:text-base md:text-lg text-foreground/95 mb-5 md:mb-6 leading-relaxed">
                  True North Patio Cabinets specializes in custom aluminum outdoor cabinet systems designed for Canadian climates. Our focus is on durability, clean modern design, and long-term outdoor performance.
                </p>
                <p className="text-body text-sm sm:text-base md:text-lg text-foreground/95 mb-5 md:mb-6 leading-relaxed">
                  Our cabinets are engineered for year-round performance, using premium rust-resistant aluminum designed to withstand harsh weather conditions including snow, rain, and temperature changes.
                </p>
                <p className="text-body text-sm sm:text-base md:text-lg text-foreground/95 mb-5 md:mb-6 leading-relaxed">
                  Every project is tailored to your outdoor space. We design cabinet layouts that combine functionality, durability, and modern aesthetics.
                </p>
                <p className="text-body text-sm sm:text-base md:text-lg text-foreground/95 leading-relaxed">
                  From design to installation, we focus on quality craftsmanship, professional service, and long-lasting outdoor kitchen solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats + Copy split */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
          <div className="grid grid-cols-1 gap-10">
            {[
              { value: "10+", label: "Products in Collection" },
              { value: "Alberta", label: "Proudly Based" },
              { value: "5-Year", label: "Comprehensive Warranty" },
            ].map((s, i) => (
              <div key={i} className="border-l-2 border-primary pl-6">
                <span className="heading-display text-4xl text-primary">{s.value}</span>
                <p className="text-body text-sm text-foreground/85 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
          <div>
            <h3 className="heading-section text-2xl md:text-3xl text-foreground mb-6">
              Our Team
            </h3>
            <p className="text-body text-base md:text-lg text-foreground mb-4 leading-relaxed">
              At True North Patio Cabinets, our team is built on strong construction experience, precision workmanship, and attention to detail. We combine hands-on expertise with a commitment to quality materials and professional installation.
            </p>
            <p className="text-body text-base md:text-lg text-foreground leading-relaxed">
              Every project is approached with care, reliability, and a focus on long-term durability. From planning to final installation, we work closely with clients to ensure each outdoor cabinet solution meets the highest standards of strength and performance. We take pride in delivering dependable service and craftsmanship you can trust.
            </p>
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="heading-section text-2xl sm:text-3xl md:text-4xl text-foreground text-center mb-10 sm:mb-12 md:mb-14">
            Our Materials
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            {[
              {
                title: "Aluminum Frame",
                desc: "Aircraft-grade 6061-T6 aluminum, precision-welded for structural integrity. Naturally resistant to rust and corrosion — no painting, no rotting, no maintenance."
              },
              {
                title: "Stone Countertop",
                desc: "Hand-selected natural granite and quartz surfaces. Heat-resistant up to 500°F, UV-stable, and sealed against moisture for lasting outdoor performance."
              },
              {
                title: "Powder Coating",
                desc: "Our proprietary five-stage powder-coating process creates a finish that withstands extreme UV exposure, sub-zero winters, and everything in between."
              },
            ].map((m, i) => (
              <div key={i} className="card-luxury p-8">
                <h3 className="heading-editorial text-xl text-foreground mb-4">{m.title}</h3>
                <p className="text-body text-sm text-foreground/90">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="heading-editorial text-2xl text-foreground mb-4">Shipping</h3>
          <p className="text-body text-foreground/90 mb-4">
            We ship across Canada with white-glove delivery available in Alberta
            and British Columbia. International shipping is available to the
            United States and select destinations worldwide.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            <span className="font-body text-xs tracking-[0.15em] uppercase text-primary border border-primary px-4 py-2">
              Domestic Shipping
            </span>
            <span className="font-body text-xs tracking-[0.15em] uppercase text-primary border border-primary px-4 py-2">
              International Shipping
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
