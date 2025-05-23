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
  description?: string;
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
    location?: string;
    documentId?: string;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
  }[];
  photos?: {
    id: number;
    url: string;
    mime?: string;
    name?: string;
    alternativeText?: string | null;
  }[];
  video?: {
    url: string;
    mime?: string;
    name?: string;
  } | null;
  videoCover?: {
    url: string;
    name?: string;
    alternativeText?: string | null;
  } | null;
}

export interface Place {
  id: number;
  name: string;
  slug: string;
  documentId?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  location?: string;
  coverImage?: {
    url: string;
  } | null;
  albums?: Album[];
}

export interface Year {
  id: number;
  year: string;
  slug: string;
  documentId?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  coverImage?: {
    url: string;
  } | null;
  albums?: Album[];
}
