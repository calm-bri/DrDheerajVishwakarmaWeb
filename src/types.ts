export interface SpineCondition {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  symptoms: string[];
  treatmentMetric: string; // e.g., "98.7% Success" or "Walk Same Day"
  recoveryTime: string; // e.g., "Same Day Walker" or "10-Day Complete"
  detailedKey: string;
  iconName: string;
}

export interface DetailedTreatment {
  slug: string;
  id: string;
  name: string;
  badge: string;
  shortDescription: string;
  heroImage: string;
  heroImageAlt: string;
  category: string;
  overview: string[];
  symptoms: Array<{ title: string; description: string }>;
  causes: string[];
  diagnosis: Array<{ title: string; description: string }>;
  treatmentOptions: {
    conservative: string[];
    whenSurgeryConsidered: string[];
  };
  procedureExplanation: {
    summary: string;
    steps: Array<{ stepNumber: number; title: string; description: string }>;
  };
  benefits: string[];
  risksAndLimitations: string[];
  recoveryTimeline: Array<{ timeframe: string; title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
  relatedSlugs: string[];
  metrics: {
    incisionSize: string;
    anesthesia: string;
    hospitalStay: string;
    recoveryTime: string;
  };
}

export interface RecoveryTimelineStep {
  day: string;
  title: string;
  description: string;
  milestone: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  condition: string;
  quote: string;
  recoverySummary: string;
  avatarUrl?: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface InternationalDestination {
  country: string;
  code: string;
  flagSymbol: string;
  consultationFee: string;
  averageTravelDays: string;
  supportServices: string[];
}

export interface BlogArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  poster: string;
  videoUrl: string;
  category: string;
}
