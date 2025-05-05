// lib/global.ts

export const TRANSITION_DURATION = 300;

export interface Album {
  id: number;
  slug: string;
  title: string;
  timePeriod?: string;
  documentId?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  coverImage?: {
    url: string;
  } | null;
  year?: {
    id: number;
    year: string;
    slug: string;
    documentId?: string;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
  };
  places?: {
    id: number;
    name: string;
    slug: string;
    documentId?: string;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
  }[];
}

export interface Place {
  id: number;
  name: string;
  slug: string;
  documentId?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  coverImage?: {
    url: string;
  } | null;
  albums?: {
    id: number;
    title: string;
    slug: string;
    coverImage?: {
      url: string;
    } | null;
  }[];
}

export interface Year {
  id: number;
  year: string;
  slug: string;
  documentId?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  albums?: Album[];
}
