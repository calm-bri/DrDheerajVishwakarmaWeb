import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  image?: string;
  type?: "website" | "article";
  author?: string;
  publishedTime?: string;
  schemas?: any[];
}

export default function SEOComponent({
  title,
  description,
  path,
  keywords,
  image,
  type = "website",
  author = "Dr. Dheeraj Vishwakarma",
  publishedTime,
  schemas = []
}: SEOProps) {
  const baseUrl = "https://www.endoscopicspinecare.com";
  const canonicalUrl = path.startsWith("http")
    ? path
    : `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;

  // Default SEO Keywords
  const defaultKeywords =
    "Dr. Dheeraj Vishwakarma, endoscopic spine surgery Jaipur, best spine surgeon Jaipur, FESS spine surgery India, single stitch spine surgery, awake spine surgery, slipped disc treatment Jaipur, sciatica specialist Jaipur, spine doctor Rajasthan, monoportal endoscopic discectomy, minimally invasive spine surgery India";

  // Build absolute image URL
  const resolvedImageUrl = image
    ? image.startsWith("http")
      ? image
      : `${baseUrl}${image.startsWith("/") ? "" : "/"}${image}`
    : `${baseUrl}/logo.png`;

  // Check if a BreadcrumbList was already supplied in schemas
  const hasBreadcrumbs = schemas.some(
    (s) => s && (s["@type"] === "BreadcrumbList" || s["@type"]?.includes?.("BreadcrumbList"))
  );

  const allSchemas = [...schemas];

  // If no breadcrumb was passed and this is an inner page, generate a fallback breadcrumb
  if (!hasBreadcrumbs && path && path !== "/" && path !== "") {
    const cleanSegment = path.replace(/^\//, "").split("/")[0];
    const pageName = cleanSegment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    allSchemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${baseUrl}/`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": pageName,
          "item": canonicalUrl
        }
      ]
    });
  }

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook Previews */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={resolvedImageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Dr. Dheeraj Vishwakarma - Endoscopic Spine Care" />
      <meta property="og:locale" content="en_US" />

      {/* Article Specific Open Graph tags */}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter Card Previews */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedImageUrl} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@drdheerajvishu" />
      <meta name="twitter:creator" content="@drdheerajvishu" />

      {/* Structured Schema Script Injections */}
      {allSchemas.map((schema, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
