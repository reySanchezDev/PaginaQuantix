import type { LinkItem } from "./site";

export type CaseStudyId = "takofy" | "viggo";

export interface CaseStudyImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
}

interface CaseStudyNarrative {
  title: string;
  paragraphs: string[];
}

export interface CaseStudyContent {
  id: CaseStudyId;
  productName: string;
  category: string;
  clientContext: string;
  title: string;
  summary: string;
  preview: { challenge: string; solution: string };
  seo: { title: string; description: string };
  scope: string;
  context: string;
  heroImage: CaseStudyImage;
  problem: CaseStudyNarrative;
  solution: CaseStudyNarrative;
  workflow: {
    title: string;
    items: Array<{ title: string; text: string }>;
  };
  detailImage: CaseStudyImage;
  productLink: LinkItem;
}
