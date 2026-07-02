import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  schemas?: any[];
}

export default function SEOComponent({ title, description, path, keywords, schemas = [] }: SEOProps) {
  const baseUrl = "https://www.endoscopicspinecare.com";
  const canonicalUrl = `${baseUrl}${path}`;
  const defaultKeywords = "Dr. Dheeraj Vishwakarma, spine surgeon India, monoportal endoscopic spine surgery Jaipur, best spine surgeon Jaipur, FESS spine surgery, single stitch spine surgery India, awake spine surgery, slipped disc treatment India, sciatica doctor Jaipur, spine doctor Rajasthan, endo spine surgeon";

  // Generate automated BreadcrumbList schema if it's an inner page
  const allSchemas = [...schemas];
  if (path && path !== "/") {
    const pageName = path.replace("/", "").replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
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
      {/* Primary SEO Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook Previews */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${baseUrl}/logo.png`} />
      <meta property="og:site_name" content="Dr. Dheeraj Vishwakarma Spine Care" />

      {/* Twitter Card Previews */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}/logo.png`} />

      {/* Structured Schema Script Injections */}
      {allSchemas.map((schema, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
