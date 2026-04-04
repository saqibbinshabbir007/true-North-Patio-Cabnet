import { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import styles from "./Products.module.css";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

type Product = {
  id: number;
  name: string;
  material: string;
  price: string;
  category: string;
  tag: string;
  image: string;
  dimensions: string;
  description: string;
};

const products: Product[] = [
  {
    id: 1, name: "The Alpine Cabinet", material: "Aluminum Cabinet with Granite Countertop", price: "$3,495",
    category: "Cabinets", tag: "Best Seller", image: product1,
    dimensions: "W 36\" × D 24\" × H 36\"",
    description: "A flagship single-door cabinet with adjustable shelving, designed for seamless integration into any outdoor kitchen layout. Powder-coated aluminum frame with natural granite countertop."
  },
  {
    id: 2, name: "The Banff Drawer Unit", material: "Aluminum Cabinet with Natural Stone Countertop", price: "$2,895",
    category: "Drawer Units", tag: "New", image: product2,
    dimensions: "W 30\" × D 24\" × H 34\"",
    description: "Three soft-close drawers with brushed gold handles. Perfect for storing grilling tools and outdoor dining essentials. Weather-sealed construction ensures year-round performance."
  },
  {
    id: 3, name: "The Jasper Corner Station", material: "Aluminum Cabinet with Quartz Countertop", price: "$4,295",
    category: "Corner Stations", tag: "Popular", image: product3,
    dimensions: "W 48\" × D 48\" × H 36\"",
    description: "Maximize corner spaces with this L-shaped station featuring dual-access doors and integrated drainage. Quartz countertop provides superior heat and stain resistance."
  },
  {
    id: 4, name: "The Rockies Full Kitchen", material: "Aluminum Cabinet with Granite Countertop", price: "$12,995",
    category: "Full Kitchens", tag: "Premium", image: product4,
    dimensions: "W 120\" × D 30\" × H 36\"",
    description: "Our complete outdoor kitchen solution with grill station, prep area, storage cabinets, and integrated sink. Designed as one cohesive unit for effortless installation."
  },
  {
    id: 5, name: "The Kananaskis Single Door", material: "Aluminum Cabinet with Granite Countertop", price: "$2,495",
    category: "Cabinets", tag: "Essential", image: product5,
    dimensions: "W 24\" × D 22\" × H 34\"",
    description: "Compact and versatile, the Kananaskis is ideal for smaller patios. Single door with interior shelf, finished in our signature matte charcoal powder coat."
  },
  {
    id: 6, name: "The Bow Valley Bar Unit", material: "Aluminum Cabinet with Quartz Countertop", price: "$5,695",
    category: "Full Kitchens", tag: "New", image: product6,
    dimensions: "W 60\" × D 26\" × H 36\"",
    description: "Entertain in style with built-in sink, bottle storage, and generous prep surface. The Bow Valley is the centrepiece of any outdoor gathering."
  },
];

const categories = ["All", "Cabinets", "Drawer Units", "Corner Stations", "Full Kitchens"];

const Products = () => {
  const [filter, setFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <div className={cn(styles.root, "page-fade-in pt-20")}>
      {/* Hero — background from public/Productpage */}
      <section className="relative min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden grain-overlay border-b border-border">
        <div className="absolute inset-0">
          <img
            src="/Productpage/productpage.webp"
            alt="True North Patio Cabinets — premium outdoor cabinet collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "var(--overlay-gradient)" }} />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6 py-14 sm:py-16 md:py-20 max-w-3xl">
          <h1 className="heading-section text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
            Our Products
          </h1>
          <div className="w-14 h-0.5 bg-primary mt-5 mx-auto" aria-hidden />
          <p className="text-body text-sm sm:text-base md:text-lg text-white/95 mt-4 sm:mt-5 max-w-lg mx-auto leading-relaxed drop-shadow-[0_1px_10px_rgba(0,0,0,0.6)]">
            Premium aluminum outdoor cabinet and outdoor kitchen systems engineered for durability, performance, and modern outdoor living. Designed in Alberta, our modular outdoor kitchens combine precision craftsmanship with long-lasting aluminum construction.
          </p>
          <p className="font-body text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-white mt-5 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
            Designed in Alberta • Serving customers across Canada
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-body text-sm font-medium tracking-[0.15em] uppercase px-5 py-2.5 border transition-all duration-300 ${
                filter === cat
                  ? "border-primary text-primary bg-primary/5"
                  : "border-border text-foreground hover:border-primary/50 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="card-luxury overflow-hidden group cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 font-body text-[10px] tracking-[0.15em] uppercase px-3 py-1 bg-primary text-primary-foreground">
                  {product.tag}
                </span>
              </div>
              <div className="p-4 sm:p-5 md:p-6">
                <h3 className="heading-editorial text-lg sm:text-xl text-foreground">{product.name}</h3>
                <p className="text-body text-sm text-foreground/85 mt-1">{product.material}</p>
                <div className="flex items-center justify-between mt-4">
                  <Link
                    to="/contact"
                    onClick={(e) => e.stopPropagation()}
                    className="font-body text-sm text-primary tracking-wide hover:underline"
                  >
                    Contact for Pricing
                  </Link>
                  <span className="font-body text-xs tracking-[0.15em] uppercase text-foreground/80 group-hover:text-primary transition-colors">
                    View Cabinet Details
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal — portal so header stays behind */}
      {selectedProduct && createPortal(
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <div
            className="relative bg-card border border-border max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "revealUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards" }}
          >
            <button
              className="absolute top-4 right-4 z-10 text-foreground/80 hover:text-foreground text-2xl leading-none"
              onClick={() => setSelectedProduct(null)}
            >
              Close
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="aspect-square">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 sm:p-6 md:p-8 flex flex-col justify-center">
                <span className="font-body text-[10px] tracking-[0.15em] uppercase text-primary mb-2">
                  {selectedProduct.tag}
                </span>
                <h2 className="heading-editorial text-2xl sm:text-3xl text-foreground mb-2">
                  {selectedProduct.name}
                </h2>
                <p className="text-body text-sm text-foreground/85 mb-1">{selectedProduct.material}</p>
                <p className="text-body text-sm text-foreground/85 mb-4">{selectedProduct.dimensions}</p>
                <Link
                  to="/contact"
                  className="font-body text-lg text-primary tracking-wide mb-6 block hover:underline"
                  onClick={() => setSelectedProduct(null)}
                >
                  Contact for Pricing
                </Link>
                <p className="text-body text-sm text-foreground/90 mb-8 leading-relaxed">
                  {selectedProduct.description}
                </p>
                <Link
                  to="/contact"
                  className="btn-gold text-center"
                  onClick={() => setSelectedProduct(null)}
                >
                  Inquire Now
                </Link>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Products;
