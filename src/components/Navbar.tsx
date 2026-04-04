import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import styles from "./Navbar.module.css";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/products", label: "Products" },
  { path: "/gallery", label: "Gallery" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={cn(
        styles.root,
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "nav-blur" : "bg-transparent",
        !scrolled && styles.overHero
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20">
        {/* Logo from public/Productpage/logo.webp */}
        <Link to="/" className={cn(styles.logoLink, "flex items-center transition-opacity duration-300 hover:opacity-90")}>
          <img
            src="/Productpage/logo.webp"
            alt="True North Patio Cabinet"
            className={cn(
              "h-12 sm:h-14 md:h-16 lg:h-20 w-auto object-contain transition-all duration-300",
              !scrolled && "brightness-0 invert"
            )}
          />
        </Link>

        {/* Desktop links – white when over hero, normal when scrolled */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                styles.navLink,
                location.pathname === link.path && styles.active,
                "font-body text-sm tracking-[0.2em] uppercase transition-colors duration-300",
                !scrolled
                  ? "font-medium text-white hover:text-white/90"
                  : "font-semibold " + (location.pathname === link.path ? "text-primary" : "text-neutral-800 hover:text-neutral-900")
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* WhatsApp CTA desktop – sticky highlight when scrolled */}
        <a
          href="https://wa.me/14033901244"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            styles.ctaButton,
            scrolled && styles.ctaButtonScrolled,
            "hidden md:inline-flex btn-gold text-xs py-2 px-5"
          )}
        >
          Get in Touch
        </a>

        {/* Mobile hamburger – white when over hero */}
        <button
          className={cn("md:hidden p-2 transition-colors duration-300", !scrolled ? "text-white" : "text-neutral-800")}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={`block h-px bg-current transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            />
            <span
              className={`block h-px bg-current transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px bg-current transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden nav-blur border-t border-border">
          <div className="px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-5 sm:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-body text-sm font-semibold tracking-[0.2em] uppercase ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-neutral-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/14033901244"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-xs py-2 px-5 w-fit mt-2"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
