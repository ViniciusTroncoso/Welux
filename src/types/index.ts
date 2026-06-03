export interface Stat {
  value: string;
  label: string;
}

export interface FeatureCard {
  number: string;
  title: string;
  description: string;
}

export interface ServiceCard {
  title: string;
  description: string;
  bullets: string[];
}

export interface Differentiator {
  title: string;
  description: string;
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Product {
  name: string;
  category: string;
  image: string;
}

export interface ClientLogo {
  name: string;
  src: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}
