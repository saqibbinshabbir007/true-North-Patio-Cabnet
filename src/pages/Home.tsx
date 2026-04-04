import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useInView } from "@/hooks/useInView";
import heroImage from "@/assets/hero-home.webp";
import aboutImage from "@/assets/about.webp";
import { cn } from "@/lib/utils";
import styles from "./Home.module.css";
import WhyChooseSection from "@/components/WhyChooseSection";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const featuredProducts = [
  { name: "The Alpine Cabinet", material: "Aluminum Cabinet with Granite Countertop", price: "$3,495", image: product1 },
  { name: "The Banff Drawer Unit", material: "Aluminum Cabinet with Natural Stone Countertop", price: "$2,895", image: product2 },
  { name: "The Jasper Corner Station", material: "Aluminum Cabinet with Quartz Countertop", price: "$4,295", image: product3 },
  { name: "The Rockies Full Kitchen", material: "Aluminum Cabinet with Granite Countertop", price: "$12,995", image: product4 },
];

// Gallery preview — first 3 images from public/Gallery
import galleryImagesData from "@/data/gallery-images.json";
const galleryPreview: string[] = (galleryImagesData as string[]).length > 0
  ? (galleryImagesData as string[]).slice(0, 3)
  : ["/Gallery/corner_kitchen/1.jpg", "/Gallery/grill_station/1.jpg", "/Gallery/Outdoor_Kitchen/1.jpg"];

const Home = () => {
  const navigate = useNavigate();
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const { ref: whyRef, isInView: whyInView } = useInView();
  const { ref: collectionRef, isInView: collectionInView } = useInView();

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  return (
    <div className={cn(styles.root, "page-fade-in")}>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden grain-overlay">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Custom aluminum outdoor cabinets—True North Patio Cabinets, built for Canadian climates"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "var(--overlay-gradient)" }} />
        </div>

        <div className={cn(styles.heroContent, "relative z-10 text-center px-4 sm:px-6 max-w-3xl")}>
          <h1 className="heading-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1]">
            <span className="block animate-reveal-up text-white">Built for performance.</span>
            <span className="block animate-reveal-up-delay-1 text-white">Designed to</span>
            <span className="block animate-reveal-up-delay-2 text-primary">last.</span>
          </h1>
          <div className="w-16 h-0.5 bg-primary mt-6 mx-auto animate-reveal-up-delay-2" aria-hidden />
          <p className="text-body text-sm sm:text-base md:text-lg text-white mt-6 sm:mt-8 max-w-2xl mx-auto animate-reveal-up-delay-2 leading-relaxed">
            Premium aluminum outdoor cabinet systems engineered for Canadian climates. Durable, rust-resistant construction designed for modern outdoor kitchens.
          </p>
          <p className="font-body text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-white mt-5 animate-reveal-up-delay-2">
            Alberta Based • 5-Year Warranty
          </p>
          <div className="mt-10 animate-reveal-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/products" className="btn-gold">
              Explore Collection
            </Link>
            <a
              href="https://wa.me/14033901244"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Scroll indicator — hidden on mobile */}
        <div className={cn(styles.heroContent, "absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 animate-reveal-up-delay-3")}>
          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-white/80">
            Scroll
          </span>
          <div className="w-px h-10 bg-muted-foreground/30" />
        </div>
      </section>

      <div ref={whyRef} className={cn("section-fade-in", whyInView && "is-visible")}>
        <WhyChooseSection />
      </div>

      {/* Featured Products — slightly more padding, editorial alignment on large screens */}
      <section ref={collectionRef} className={cn("py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-secondary section-fade-in", collectionInView && "is-visible")}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 sm:mb-12 md:mb-14 lg:mb-16 lg:max-w-2xl lg:text-left">
            <h2 className="heading-section text-2xl sm:text-3xl md:text-4xl text-foreground">
              Our Collection
            </h2>
            <p className="text-body text-sm sm:text-base text-foreground/90 mt-3 sm:mt-4 max-w-xl lg:max-w-none lg:mr-0">
              Premium aluminum outdoor cabinet systems designed for strength, durability, and long-term performance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7">
            {featuredProducts.map((p, i) => (
              <div
                key={i}
                className="card-luxury overflow-hidden group cursor-pointer"
                onClick={() => navigate("/products")}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h4 className="heading-editorial text-lg text-foreground">{p.name}</h4>
                  <p className="text-body text-sm text-foreground/85 mt-1">{p.material}</p>
                  <Link
                    to="/contact"
                    onClick={(e) => e.stopPropagation()}
                    className="font-body text-sm text-primary mt-3 tracking-wide block hover:underline"
                  >
                    Contact for Pricing
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center lg:text-left">
            <Link to="/products" className="btn-outline-gold">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Stats — different rhythm from other sections */}
      <section className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 border-y border-border">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 text-center">
          {[
            { value: "10+", label: "Products" },
            { value: "Alberta", label: "Proudly Based" },
            { value: "5-Year", label: "Warranty" },
            { value: "Custom", label: "Design & Install" },
          ].map((s, i) => (
            <div key={i}>
              <span className="heading-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary font-medium">{s.value}</span>
              <p className="text-body text-xs sm:text-sm md:text-base text-foreground/85 mt-1 sm:mt-2 tracking-[0.15em] uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery preview — 3 images + View Our Work */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-border bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="heading-section text-2xl sm:text-3xl md:text-4xl text-foreground">
              Our Work
            </h2>
            <p className="text-body text-sm sm:text-base text-foreground/90 mt-3 sm:mt-4 max-w-xl">
              Browse our gallery of custom outdoor cabinet installations.
            </p>
          </div>
          <Link to="/gallery" className="block">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-7">
              {galleryPreview.map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-square overflow-hidden bg-muted cursor-pointer group min-h-0"
                >
                  <img
                    src={src}
                    alt={`Gallery ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <span className="btn-outline-gold inline-flex">
                View Our Work
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* About teaser — image right, text card left overlapping image */}
      <section className="relative min-h-[50vh] flex items-end md:items-center overflow-hidden bg-background pb-12 md:pb-16">
        {/* Image on right */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-[55%]">
          <img
            src={aboutImage}
            alt="True North Patio Cabinets"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent md:from-background md:via-background/40 md:to-transparent" />
        </div>

        {/* Text card — left, overlaps onto image */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
          <div className={cn(styles.cardOverlay, "max-w-xl md:max-w-lg md:mr-0 md:-mr-24 lg:-mr-32")}>
            <h2 className="heading-display text-2xl sm:text-3xl md:text-4xl text-foreground mb-3 sm:mb-4">
              About Us
            </h2>
            <p className="text-body text-sm sm:text-base md:text-lg text-foreground/90 mb-6 sm:mb-8 leading-relaxed">
              Custom aluminum outdoor cabinets built for Canadian climates—strength, durability, and professional installation from design to completion.
            </p>
            <Link to="/about" className="btn-outline-gold link-hover-underline inline-flex">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* For Contractors & Designers */}
      <section className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-secondary">
        <div className="max-w-5xl mx-auto text-center md:text-left">
          <h2 className="heading-section text-xl sm:text-2xl md:text-3xl text-foreground font-semibold">
            For Contractors &amp; Designers
          </h2>
          <div className="w-12 h-0.5 bg-primary mt-4 mb-6 md:mb-8 mx-auto md:mx-0" aria-hidden />
          <p className="text-body text-sm sm:text-base md:text-lg text-foreground leading-relaxed max-w-3xl mx-auto md:mx-0">
            <span className="font-semibold text-foreground">
              Contractors, builders, and outdoor living professionals
            </span>{" "}
            partner with True North Patio Cabinets seeking durable aluminum cabinet systems for outdoor kitchen
            projects. Our modular cabinet solutions allow flexible layouts and reliable installation for residential
            and commercial outdoor spaces.
          </p>
          <div className="mt-8 flex justify-center md:justify-start">
            <Link to="/contact" className="btn-outline-gold">
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Dealer & Distribution Opportunities */}
      <section className="py-20 px-6 lg:px-8 bg-background border-t border-border">
        <div className="max-w-5xl mx-auto text-center md:text-left">
          <h2 className="heading-section text-xl sm:text-2xl md:text-3xl text-foreground font-semibold">
            Dealer &amp; Distribution Opportunities
          </h2>
          <div className="w-12 h-0.5 bg-primary mt-4 mb-6 md:mb-8 mx-auto md:mx-0" aria-hidden />
          <p className="text-body text-sm sm:text-base md:text-lg text-foreground leading-relaxed max-w-3xl mx-auto md:mx-0">
            True North Patio Cabinets is actively expanding its distribution network across Canada. We welcome
            partnerships with retailers, outdoor living showrooms, and kitchen specialists interested in offering
            premium aluminum outdoor cabinet systems.
          </p>
          <p className="text-body text-sm sm:text-base md:text-lg text-foreground mt-4 sm:mt-5 leading-relaxed max-w-3xl mx-auto md:mx-0">
            Currently serving Alberta and expanding across Canada. For dealer inquiries, please contact us directly.
          </p>
          <div className="mt-8 flex justify-center md:justify-start">
            <Link to="/contact" className="btn-gold">
              Request Dealer Info
            </Link>
          </div>
        </div>
      </section>

      {/* Inquiry form — between About Us and Follow Us */}
      <section className="border-t border-border py-14 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-2xl mx-auto border border-border bg-card/30 rounded-sm px-4 sm:px-6 py-8 sm:py-10 md:px-10 md:py-12 shadow-xl shadow-black/20">
          <div className="text-center mb-12">
            <h2 className="heading-section text-2xl sm:text-3xl md:text-4xl text-foreground">
              Request a Quote
            </h2>
            <div className="w-12 h-0.5 bg-primary mt-4 mx-auto" aria-hidden />
            <p className="text-body text-sm text-foreground/90 mt-4 max-w-md mx-auto">
              Tell us about your project. We'll get back within 24 hours.
            </p>
          </div>
          {inquirySubmitted ? (
            <div className="text-center py-12 border border-border bg-card/50">
              <h3 className="heading-editorial text-xl text-foreground mb-2">
                Message Sent
              </h3>
              <p className="text-body text-sm text-foreground/90">
                Thank you for reaching out. Our team will get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="flex flex-col gap-5">
              <div>
                <label className="font-body text-sm font-medium tracking-[0.12em] uppercase text-foreground/90 mb-2 block">
                  Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="font-body text-sm font-medium tracking-[0.12em] uppercase text-foreground/90 mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="font-body text-sm font-medium tracking-[0.12em] uppercase text-foreground/90 mb-2 block">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="(403) 000-0000"
                  />
                </div>
              </div>
              <div>
                <label className="font-body text-sm font-medium tracking-[0.12em] uppercase text-foreground/90 mb-2 block">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Tell us about your project or which products you're interested in..."
                />
              </div>
              <button type="submit" className="btn-gold w-full mt-2">
                Send Inquiry
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Instagram strip — tighter, less “block” feel */}
      <section className="border-t border-border pt-14 sm:pt-20 md:pt-24 pb-10 sm:pb-14 md:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-body text-sm tracking-[0.25em] uppercase text-foreground/90 mb-6">
            Follow Us @truenorthpatiocabinet
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 md:gap-3">
            {[product1, product2, product3, product4].map((img, i) => (
              <div key={i} className="aspect-square overflow-hidden">
                <img
                  src={img}
                  alt="Instagram"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 opacity-70 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
