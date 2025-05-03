// lib/global.ts

export const TRANSITION_DURATION = 300;

export interface Album {
  id: number;
  slug: string;
  title: string;
  year?: {
    year: string;
  };
  places?: {
    name: string;
  }[];
}

export interface Place {
  id: number;
  name: string;
  slug: string;
  albums?: Album[];
}

export interface Year {
  id: number;
  year: string;
  slug: string;
  albums?: Album[];
}
