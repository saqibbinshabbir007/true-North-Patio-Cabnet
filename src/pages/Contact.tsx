import { useState, FormEvent } from "react";
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { isContactEmailJsConfigured, sendContactEmail } from "@/lib/emailjs";
import styles from "./Contact.module.css";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    const form = e.currentTarget;

    const name = (form.elements.namedItem("name") as HTMLInputElement | null)?.value.trim() ?? "";
    const email = (form.elements.namedItem("email") as HTMLInputElement | null)?.value.trim() ?? "";
    const phone = (form.elements.namedItem("phone") as HTMLInputElement | null)?.value.trim() ?? "";
    const message =
      (form.elements.namedItem("message") as HTMLTextAreaElement | null)?.value.trim() ?? "";

    if (!name || !email || !phone || !message) {
      setSubmitError("Please fill in every field: Name, Email, Phone, and Message.");
      return;
    }

    if (!isContactEmailJsConfigured()) {
      setSubmitError(
        "Email delivery is not configured yet. Please call, WhatsApp, or email us using the details on the right."
      );
      return;
    }

    setSubmitting(true);
    try {
      await sendContactEmail(form);
      form.reset();
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Could not send. Please try again or contact us directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={cn(styles.root, "page-fade-in pt-20")}>
      {/* Hero — banner from public/Productpage/contact kitchn.webp */}
      <section className="relative min-h-[35vh] sm:min-h-[40vh] md:min-h-[45vh] flex items-center justify-center overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <img
            src="/Productpage/contact%20kitchn.webp"
            alt="True North Patio Cabinets — contact us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "var(--overlay-gradient)" }} />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6 py-12 sm:py-16">
          <h1 className="heading-section text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-semibold drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            Get in Touch
          </h1>
          <p className="text-body text-sm sm:text-base md:text-lg text-white mt-4 sm:mt-5 max-w-md mx-auto leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] drop-shadow-[0_0_20px_rgba(0,0,0,0.6)]">
            Questions about our custom aluminum cabinets or ready for a quote? We work closely with every client from design to installation—reach out and we'll respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Split */}
      <section className="py-14 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16">
          {/* Form */}
          <div>
            {submitted ? (
              <div className="text-center py-16">
                <h3 className="heading-editorial text-2xl text-foreground mb-2">
                  Message Sent
                </h3>
                <p className="text-body text-sm text-foreground/90">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form id="contact-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
                {submitError && (
                  <p className="text-body text-sm text-destructive border border-destructive/40 bg-destructive/10 px-4 py-3">
                    {submitError}
                  </p>
                )}
                <div>
                  <label className="font-body text-sm font-medium tracking-[0.12em] uppercase text-foreground/90 mb-2 block">
                    Name
                    <span className="text-destructive ml-0.5" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    disabled={submitting}
                    className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors disabled:opacity-60"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="font-body text-sm font-medium tracking-[0.12em] uppercase text-foreground/90 mb-2 block">
                    Email
                    <span className="text-destructive ml-0.5" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    disabled={submitting}
                    className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors disabled:opacity-60"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="font-body text-sm font-medium tracking-[0.12em] uppercase text-foreground/90 mb-2 block">
                    Phone
                    <span className="text-destructive ml-0.5" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    disabled={submitting}
                    className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors disabled:opacity-60"
                    placeholder="(403) 000-0000"
                  />
                </div>
                <div>
                  <label className="font-body text-sm font-medium tracking-[0.12em] uppercase text-foreground/90 mb-2 block">
                    Message
                    <span className="text-destructive ml-0.5" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    disabled={submitting}
                    className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors resize-none disabled:opacity-60"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button type="submit" className="btn-gold w-full mt-2" disabled={submitting}>
                  {submitting ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* Contact Details + Follow Us — card block for clearer hierarchy */}
          <div className="flex flex-col gap-8">
            <div className="border border-border bg-card/40 rounded-sm p-6 sm:p-8 md:p-10">
              <h3 className="heading-section text-lg sm:text-xl md:text-2xl text-foreground mb-1">
                Contact Details
              </h3>
              <div className="w-12 h-0.5 bg-primary mt-3 mb-8" aria-hidden />
              <div className="flex flex-col gap-6">
                {[
                  { label: "Phone", value: "+1 587-436-2167", href: "tel:+15874362167", icon: Phone },
                  { label: "WhatsApp", value: "+1 403-390-1244", href: "https://wa.me/14033901244", icon: MessageCircle },
                  { label: "Email", value: "support@truenorthpatiocabinet.com", href: "mailto:support@truenorthpatiocabinet.com", icon: Mail },
                ].map((c) => {
                  const Icon = c.icon;
                  return (
                    <div key={c.label} className="flex items-start gap-4 border-l-2 border-primary pl-5">
                      <Icon className="h-5 w-5 shrink-0 text-primary mt-0.5" aria-hidden />
                      <div>
                        <span className="font-body text-xs tracking-[0.15em] uppercase text-foreground/80 block mb-1">
                          {c.label}
                        </span>
                        <a
                          href={c.href}
                          target={c.label === "WhatsApp" ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="font-body text-base text-foreground hover:text-primary transition-colors"
                        >
                          {c.value}
                        </a>
                      </div>
                    </div>
                  );
                })}
                <div className="flex items-start gap-4 border-l-2 border-primary pl-5">
                  <MapPin className="h-5 w-5 shrink-0 text-primary mt-0.5" aria-hidden />
                  <div>
                    <span className="font-body text-xs tracking-[0.15em] uppercase text-foreground/80 block mb-1">
                      Location
                    </span>
                    <p className="font-body text-base text-foreground">Alberta, Canada</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-border bg-card/40 rounded-sm p-6 sm:p-8 md:p-10">
              <h3 className="heading-section text-lg sm:text-xl md:text-2xl text-foreground mb-1">
                Follow Us
              </h3>
              <div className="w-12 h-0.5 bg-primary mt-3 mb-6" aria-hidden />
              <div className="flex flex-col gap-3">
                {[
                  { name: "Instagram", url: "https://instagram.com" },
                  { name: "Facebook", url: "https://facebook.com" },
                  { name: "YouTube", url: "https://youtube.com" },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-base text-foreground hover:text-primary transition-colors py-1"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
