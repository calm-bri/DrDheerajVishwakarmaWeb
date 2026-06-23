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
