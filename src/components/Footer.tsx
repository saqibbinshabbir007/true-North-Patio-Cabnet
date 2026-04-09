import { Link } from "react-router-dom";
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={cn(styles.root, "bg-secondary border-t border-border")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-5">
              <img
                src="/Productpage/logo.webp"
                alt="True North Patio Cabinet"
                className="h-16 md:h-20 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-body text-sm sm:text-base text-foreground leading-relaxed max-w-sm">
              Built for performance. Designed to last. Custom aluminum outdoor
              cabinets for Canadian climates—Alberta-based, professional installation.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-body text-sm font-medium tracking-[0.2em] uppercase text-foreground mb-3">
              Navigate
            </h4>
            {[
              { path: "/", label: "Home" },
              { path: "/products", label: "Products" },
              { path: "/about", label: "About" },
              { path: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-body text-base text-foreground/90 hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-body text-sm font-medium tracking-[0.2em] uppercase text-foreground mb-3">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+15874362167"
                className="flex items-center gap-3 font-body text-sm text-foreground/90 hover:text-primary transition-colors duration-300"
              >
                <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                +1 587-436-2167
              </a>
              <a
                href="https://wa.me/14033901244"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-body text-sm text-foreground/90 hover:text-primary transition-colors duration-300"
              >
                <MessageCircle className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                +1 403-390-1244
              </a>
              <a
                href="mailto:support@truenorthpatiocabinet.com"
                className="flex items-center gap-3 font-body text-sm text-foreground/90 hover:text-primary transition-colors duration-300 break-all"
              >
                <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                support@truenorthpatiocabinet.com
              </a>
              <p className="flex items-center gap-3 font-body text-sm text-foreground/90">
                <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                Alberta, Canada
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border bg-background/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="font-body text-xs sm:text-sm text-foreground/90 text-center md:text-left">
            © {new Date().getFullYear()} True North Patio Cabinet. All rights reserved.
          </p>
          <p className="font-body text-xs sm:text-sm text-foreground/90 text-center md:text-right">
            Alberta, Canada
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
