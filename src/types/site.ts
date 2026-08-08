export type Locale = "es" | "en";

export interface LinkItem {
  label: string;
  href: string;
  target?: "_blank" | "_self";
}

export interface NavItem extends LinkItem {
  id: "solutions" | "products" | "work" | "about" | "contact";
}

interface FeatureItem {
  title: string;
  text: string;
}

interface PageSeo {
  title: string;
  description: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  lead: string;
  primary?: LinkItem;
  secondary?: LinkItem;
}

export interface ContentSection {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  items: FeatureItem[];
  variant?: "default" | "soft";
}

export interface CtaContent {
  eyebrow: string;
  title: string;
  text: string;
  primary: LinkItem;
  secondary?: LinkItem;
}

export interface StandardPageContent {
  seo: PageSeo;
  hero: HeroContent;
  sections: ContentSection[];
  cta?: CtaContent;
}

export interface LegalPageContent {
  seo: PageSeo;
  eyebrow: string;
  title: string;
  updatedLabel: string;
  updated: string;
  intro: string;
  sections: Array<{
    title: string;
    paragraphs: string[];
  }>;
}

export interface ProductSummary {
  id: ProductId;
  name: string;
  category: string;
  description: string;
  href: string;
  status: string;
  external?: LinkItem;
}

export type ProductId = "viggo" | "takofy" | "nica-finanzas" | "qavision";

interface ProductMedia {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  loading?: "eager" | "lazy";
}

export interface ProductPageContent {
  id: ProductId;
  seo: PageSeo;
  hero: HeroContent & {
    video?: {
      src: string;
      poster: string;
      label: string;
    };
  };
  overview: {
    eyebrow: string;
    title: string;
    lead: string;
    metrics: FeatureItem[];
  };
  sections: ContentSection[];
  gallery?: {
    eyebrow: string;
    title: string;
    lead: string;
    items: ProductMedia[];
  };
  release?: {
    label: string;
    version: string;
    date?: string;
    changes: string[];
    checksum?: {
      label: string;
      algorithm: "SHA-256";
      value: string;
      size: string;
    };
  };
  cta: CtaContent;
}
