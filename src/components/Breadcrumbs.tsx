import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { useData } from "../context/DataContext";

const STATIC_ROUTES = new Set([
  "about",
  "treatments",
  "blogs",
  "gallery",
  "contact",
  "international-patients",
  "admin",
]);

export default function Breadcrumbs() {
  const location = useLocation();
  const { getTreatmentBySlug } = useData();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't show breadcrumbs on the homepage
  if (pathnames.length === 0) return null;

  // Check if the first segment is a treatment slug (i.e., direct /:slug route)
  const isDirectTreatmentSlug =
    pathnames.length === 1 &&
    !STATIC_ROUTES.has(pathnames[0]) &&
    getTreatmentBySlug(pathnames[0]) !== undefined;

  const formatTitle = (slug: string, pathSoFar: string) => {
    // Direct treatment slug at root level
    if (isDirectTreatmentSlug) {
      const treatment = getTreatmentBySlug(slug);
      if (treatment) return treatment.name;
    }
    // Legacy /treatments/:slug support
    if (pathSoFar.startsWith("/treatments/")) {
      const treatment = getTreatmentBySlug(slug);
      if (treatment) return treatment.name;
    }
    const map: Record<string, string> = {
      about: "About Us",
      treatments: "Treatments",
      gallery: "Gallery",
      contact: "Contact Us",
      blogs: "Clinical Publications",
      "international-patients": "International Patients",
      admin: "Staff Desk",
    };
    return map[slug] || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  // For direct treatment slugs, inject a "Treatments" parent breadcrumb
  const breadcrumbItems: { slug: string; to: string; isLast: boolean; label: string }[] = [];

  if (isDirectTreatmentSlug) {
    breadcrumbItems.push({
      slug: "treatments",
      to: "/treatments",
      isLast: false,
      label: "Treatments",
    });
    const slug = pathnames[0];
    const treatment = getTreatmentBySlug(slug);
    breadcrumbItems.push({
      slug,
      to: `/${slug}`,
      isLast: true,
      label: treatment?.name || slug.replace(/-/g, " "),
    });
  } else {
    pathnames.forEach((value, index) => {
      const to = `/${pathnames.slice(0, index + 1).join("/")}`;
      const isLast = index === pathnames.length - 1;
      breadcrumbItems.push({
        slug: value,
        to,
        isLast,
        label: formatTitle(value, to),
      });
    });
  }

  return (
    <nav
      id="breadcrumbs-navigation"
      aria-label="Breadcrumb"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-2 text-[11px] font-mono tracking-wider text-gray-400 flex items-center gap-1.5 uppercase select-none relative z-20 text-left overflow-x-auto"
    >
      <Link to="/" className="hover:text-gold-300 transition-colors flex items-center gap-1 shrink-0">
        <Home className="w-3.5 h-3.5 text-gray-400 hover:text-gold-300" />
        <span>Home</span>
      </Link>
      {breadcrumbItems.map((item) => (
        <span key={item.to} className="flex items-center gap-1.5 shrink-0">
          <ChevronRight className="w-3.5 h-3.5 text-gray-600 shrink-0" />
          {item.isLast ? (
            <span className="text-gold-300 font-bold truncate max-w-xs sm:max-w-md">{item.label}</span>
          ) : (
            <Link to={item.to} className="hover:text-gold-300 transition-colors text-gray-400">
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
