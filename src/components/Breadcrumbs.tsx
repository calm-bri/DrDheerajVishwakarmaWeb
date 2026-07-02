import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't show breadcrumbs on the homepage
  if (pathnames.length === 0) return null;

  return (
    <nav 
      id="breadcrumbs-navigation"
      className="w-full max-w-6xl mx-auto px-4 xs:px-6 sm:px-8 pt-28 pb-2 text-[10px] font-mono tracking-wider text-gray-500 flex items-center gap-1.5 uppercase select-none relative z-20 text-left"
    >
      <Link to="/" className="hover:text-gold-300 transition-colors flex items-center gap-1">
        <Home className="w-3.5 h-3.5 text-gray-500 hover:text-gold-300" />
        <span>Home</span>
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const displayName = value.replace(/-/g, " ");

        return (
          <span key={to} className="flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3 text-stone-700" />
            {isLast ? (
              <span className="text-gold-400 font-bold">{displayName}</span>
            ) : (
              <Link to={to} className="hover:text-gold-300 transition-colors text-gray-500">
                {displayName}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
