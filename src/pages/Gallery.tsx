import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./Gallery.module.css";
import galleryImagesData from "@/data/gallery-images.json";
import { getGalleryTitle } from "@/data/gallery-titles";

const galleryImages: string[] =
  galleryImagesData.length > 0
    ? (galleryImagesData as string[])
    : [
        "/Gallery/corner_kitchen/1.jpg",
        "/Gallery/grill_station/1.jpg",
        "/Gallery/Outdoor_Kitchen/1.jpg",
        "/Gallery/Patio/1.jpg",
      ];

// Extract category from path: /Gallery/corner_kitchen/xxx.webp -> corner_kitchen
const getCategory = (path: string) => {
  const match = path.match(/\/Gallery\/([^/]+)\//);
  return match ? match[1] : "";
};

const CATEGORIES = [
  { id: "all", label: "All", path: "", anim: "animFadeZoom" },
  { id: "grill_station", label: "Grill Station", path: "grill_station", anim: "animSlideLeft" },
  { id: "Outdoor_Kitchen", label: "Outdoor Kitchen", path: "Outdoor_Kitchen", anim: "animSlideRight" },
  { id: "Patio", label: "Patio", path: "Patio", anim: "animSlideUp" },
  { id: "corner_kitchen", label: "Corner Kitchen", path: "corner_kitchen", anim: "animSlideDown" },
];

const PER_PAGE = 12;

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredImages = useMemo(() => {
    if (activeCategory === "all") return galleryImages;
    const cat = CATEGORIES.find((c) => c.id === activeCategory)?.path || "";
    return galleryImages.filter((p) => getCategory(p) === cat);
  }, [activeCategory]);

  const filteredWithTitles = useMemo(() => {
    const count: Record<string, number> = {};
    return filteredImages.map((src) => {
      const cat = getCategory(src);
      const idx = count[cat] ?? 0;
      count[cat] = idx + 1;
      return { src, title: getGalleryTitle(src, idx) };
    });
  }, [filteredImages]);

  const totalPages = Math.ceil(filteredImages.length / PER_PAGE) || 1;
  const paginatedWithTitles = filteredWithTitles.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const goToPage = (p: number) => {
    setCurrentPage(Math.max(1, Math.min(p, totalPages)));
    setLightboxOpen(false);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    if (lightboxOpen) {
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }
  }, [lightboxOpen]);

  return (
    <div className={cn(styles.root, "page-fade-in pt-20")}>
      {/* Hero */}
      <section className="relative min-h-[35vh] sm:min-h-[40vh] md:min-h-[45vh] flex items-center justify-center overflow-hidden border-b border-border">
        <img
          src="/Gallery/corner_kitchen/Kitchen-Final-e1556564821369.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "var(--overlay-gradient)" }} />
        <div className="relative z-10 text-center px-4 sm:px-6 py-12 sm:py-16">
          <h1 className="heading-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
            Our Work
          </h1>
          <div className="w-14 h-0.5 bg-primary mt-5 mx-auto" aria-hidden />
          <p className="text-body text-sm sm:text-base md:text-lg text-white/95 mt-4 sm:mt-5 max-w-xl mx-auto drop-shadow-[0_1px_10px_rgba(0,0,0,0.6)]">
            Outdoor kitchen installations, cabinet close-ups, patio cooking areas &amp; luxury backyard kitchens.
          </p>
        </div>
      </section>

      {/* Category navigation tabs */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 border-b border-border bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className={styles.tabsWrap}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setCurrentPage(1);
                  setLightboxIndex(0);
                  setLightboxOpen(false);
                }}
                className={cn(styles.tab, activeCategory === cat.id && styles.tabActive)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry gallery — variable heights, columns layout */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={cn(styles.galleryGrid, "mx-auto")}>
            {paginatedWithTitles.map(({ src, title }, i) => {
              const globalIndex = (currentPage - 1) * PER_PAGE + i;
              const categoryAnim = CATEGORIES.find((c) => c.id === activeCategory)?.anim ?? "animFadeZoom";
              return (
              <div
                key={`${activeCategory}-${currentPage}-${globalIndex}`}
                className={cn(styles.galleryCard, styles[categoryAnim])}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div
                  className={cn(styles.galleryItem, "group relative")}
                  onClick={() => {
                    setLightboxIndex(globalIndex);
                    setLightboxOpen(true);
                  }}
                >
                  <div
                    className={cn(
                      "relative overflow-hidden bg-muted",
                      i % 4 === 0 ? "aspect-[3/4]" : i % 4 === 1 ? "aspect-[4/5]" : i % 4 === 2 ? "aspect-square" : "aspect-[4/3]"
                    )}
                  >
                    <img
                      src={src}
                      alt={title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors pointer-events-none" />
                  </div>
                </div>
                <p className={styles.galleryCaption}>{title}</p>
              </div>
            );
            })}
          </div>

          {/* Pagination — show when more than 12 images */}
          {filteredImages.length > PER_PAGE && (
            <div className={styles.pagination}>
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={styles.paginationPrevNext}
              >
                Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={cn(styles.pageBtn, currentPage === p && styles.pageBtnActive)}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={styles.paginationPrevNext}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox — portal so header stays behind */}
      {lightboxOpen && filteredImages.length > 0 && createPortal(
        <div className={styles.lightboxOverlay}>
          <button
            className={styles.closeBtn}
            onClick={() => setLightboxOpen(false)}
          >
            Close
          </button>
          <img
            src={filteredImages[lightboxIndex]}
            alt={filteredWithTitles[lightboxIndex]?.title ?? "Gallery"}
            className={styles.lightboxImage}
          />
          {filteredWithTitles[lightboxIndex]?.title && (
            <p className={styles.lightboxCaption}>{filteredWithTitles[lightboxIndex].title}</p>
          )}
          <div className={styles.lightboxNav}>
            <button
              className="flex items-center justify-center w-12 h-12 text-primary border border-primary hover:bg-primary/10 transition-colors"
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev === 0 ? filteredImages.length - 1 : prev - 1
                )
              }
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="flex items-center justify-center w-12 h-12 text-primary border border-primary hover:bg-primary/10 transition-colors"
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev === filteredImages.length - 1 ? 0 : prev + 1
                )
              }
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Gallery;
