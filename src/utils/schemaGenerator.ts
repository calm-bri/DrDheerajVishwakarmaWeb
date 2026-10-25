/**
 * Schema.org JSON-LD Structured Data Generators
 * Compliant with Google Search Rich Results guidelines:
 * - Physician (Doctor)
 * - LocalBusiness / MedicalBusiness / MedicalClinic
 * - MedicalWebPage & MedicalProcedure / MedicalCondition
 * - BreadcrumbList
 * - FAQPage
 */

import { DetailedTreatment } from "../types";

export const BASE_URL = "https://www.endoscopicspinecare.com";
export const CLINIC_NAME = "Dr. Dheeraj Vishwakarma - Endoscopic Spine Care";
export const DOCTOR_NAME = "Dr. Dheeraj Vishwakarma";

/**
 * 1. Doctor (Physician) Schema
 */
export function generateDoctorSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${BASE_URL}/#doctor`,
    "name": DOCTOR_NAME,
    "image": `${BASE_URL}/logo.png`,
    "url": BASE_URL,
    "telephone": ["+91-89998-98129", "+91-96721-44129"],
    "priceRange": "$$",
    "medicalSpecialty": [
      "Endoscopic Spine Surgery",
      "Neurosurgery",
      "Minimally Invasive Spine Surgery",
      "Spine Surgery"
    ],
    "description": "Leading Board-Certified Neurosurgeon and Endoscopic Spine Specialist. Trained in South Korea (AIN Hospital) and Germany (St. Anna Hospital). Pioneer of Single-Stitch (<8mm) Full Monoportal Endoscopic Spine Surgery (FESS) in Rajasthan and India.",
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "Govind Ballabh Pant Institute of Post Graduate Medical Education and Research (GIPMER), New Delhi"
      },
      {
        "@type": "EducationalOrganization",
        "name": "AIN Hospital, South Korea"
      },
      {
        "@type": "EducationalOrganization",
        "name": "St. Anna Hospital, Germany"
      }
    ],
    "award": [
      "Asia Book of Records Certification for Youngest Monoportal Endoscopic Discectomy",
      "India Book of Records Certification for Youngest Cauda Equina Endoscopic Spine Surgery",
      "Pioneered First Cervical Monoportal Endoscopic Discectomy in Jaipur & Rajasthan",
      "Pioneered First Dorsal Monoportal Endoscopic Discectomy in Jaipur & Rajasthan"
    ],
    "knowsAbout": [
      "Full Monoportal Endoscopic Spine Surgery (FESS)",
      "Endoscopic Discectomy",
      "Single-Stitch Spine Surgery (<8mm incision)",
      "Awake Spine Surgery under Local Anesthesia",
      "Lumbar Canal Stenosis Decompression",
      "Cervical Endoscopic Decompression",
      "Sciatica & Slipped Disc Treatment"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "S-5, Bhaskar Enclave, Above YES Bank, Patrakar Colony, Mansarovar",
      "addressLocality": "Jaipur",
      "addressRegion": "Rajasthan",
      "postalCode": "302020",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.linkedin.com/in/dr-dheeraj-vishwakarma-a7a5051b4/",
      "https://www.instagram.com/drdheerajvishwakarma/",
      "https://www.facebook.com/endoscopicspinecare/"
    ]
  };
}

/**
 * 2. LocalBusiness / MedicalClinic Schema
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${BASE_URL}/#clinic`,
    "name": CLINIC_NAME,
    "image": `${BASE_URL}/logo.png`,
    "url": BASE_URL,
    "telephone": ["+91-89998-98129", "+91-96721-44129"],
    "priceRange": "$$",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash, Credit Card, Debit Card, UPI, Health Insurance TPA",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "S-5, Bhaskar Enclave, Above YES Bank, Patrakar Colony, Mansarovar",
        "addressLocality": "Jaipur",
        "addressRegion": "Rajasthan",
        "postalCode": "302020",
        "addressCountry": "IN"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Jaat Colony, Bhakrota, Ajmer Road",
        "addressLocality": "Jaipur",
        "addressRegion": "Rajasthan",
        "postalCode": "302026",
        "addressCountry": "IN"
      }
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 26.8524,
      "longitude": 75.7684
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "10:00",
        "closes": "14:00"
      }
    ],
    "department": [
      {
        "@type": "MedicalSpecialty",
        "name": "Endoscopic Spine Care & Keyhole Neurosurgery Department"
      }
    ]
  };
}

/**
 * 3. BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url.startsWith("/") ? "" : "/"}${item.url}`
    }))
  };
}

/**
 * 4. FAQPage Schema
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * 5. MedicalWebPage & MedicalProcedure Schema for Treatments
 */
export function generateTreatmentSchemas(treatment: DetailedTreatment) {
  const treatmentUrl = `${BASE_URL}/${treatment.slug}`;
  const heroImgUrl = treatment.heroImage.startsWith("http")
    ? treatment.heroImage
    : `${BASE_URL}${treatment.heroImage.startsWith("/") ? "" : "/"}${treatment.heroImage}`;

  const medicalWebPage = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": `${treatment.name} | Dr. Dheeraj Vishwakarma`,
    "description": treatment.shortDescription,
    "url": treatmentUrl,
    "image": heroImgUrl,
    "author": {
      "@type": "Physician",
      "name": DOCTOR_NAME,
      "medicalSpecialty": "Endoscopic Spine Surgery, Neurosurgery",
      "telephone": ["+91-89998-98129", "+91-96721-44129"],
      "url": BASE_URL
    },
    "about": {
      "@type": "MedicalProcedure",
      "name": treatment.name,
      "procedureType": "SurgicalProcedure",
      "bodyLocation": "Spine, Lumbar, Cervical, Dorsal Spinal Canal",
      "howPerformed": treatment.procedureExplanation?.summary || treatment.shortDescription,
      "preparation": treatment.treatmentOptions?.whenSurgeryConsidered?.join(". ") || "Comprehensive clinical evaluation and MRI mapping.",
      "followup": treatment.metrics?.recoveryTime || "Same-day discharge and outpatient ambulation within hours.",
      "status": "https://schema.org/ActiveActionStatus"
    }
  };

  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Treatments", url: "/treatments" },
    { name: treatment.name, url: `/${treatment.slug}` }
  ]);

  const faqSchema = generateFAQSchema(treatment.faqs || []);

  const schemas: any[] = [medicalWebPage, breadcrumbs];
  if (faqSchema) schemas.push(faqSchema);

  return schemas;
}
