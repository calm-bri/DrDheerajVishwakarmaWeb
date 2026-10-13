import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { getTreatmentBySlug } from "../treatmentsData";

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't show breadcrumbs on the homepage
  if (pathnames.length === 0) return null;

  const formatTitle = (slug: string, isLast: boolean, pathSoFar: string) => {
    if (pathSoFar.startsWith("/treatments/") && isLast) {
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
      admin: "Staff Desk"
    };
    return map[slug] || slug.replace(/-/g, " ");
  };

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
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const displayName = formatTitle(value, isLast, to);

        return (
          <span key={to} className="flex items-center gap-1.5 shrink-0">
            <ChevronRight className="w-3.5 h-3.5 text-gray-600 shrink-0" />
            {isLast ? (
              <span className="text-gold-300 font-bold truncate max-w-xs sm:max-w-md">{displayName}</span>
            ) : (
              <Link to={to} className="hover:text-gold-300 transition-colors text-gray-400">
                {displayName}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
