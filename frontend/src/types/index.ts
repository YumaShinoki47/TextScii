export interface ASCIIRequest {
  text: string;
  style: ASCIIStyle;
  width: number;
  height: number;
  charset: CharsetType;
  density: number;
  language: string;
}

export interface ASCIIResponse {
  ascii_art: string;
  style: string;
  width: number;
  height: number;
  generation_time?: number;
  created_at: string;
}

export interface RefineRequest {
  original_text: string;
  modification: string;
  current_ascii: string;
}

export enum ASCIIStyle {
  CLASSIC = 'classic',
  MODERN = 'modern',
  MINIMAL = 'minimal',
  ARTISTIC = 'artistic'
}

export enum CharsetType {
  STANDARD = 'standard',
  EXTENDED = 'extended',
  MINIMAL = 'minimal',
  CUSTOM = 'custom'
}

export interface GenerationSettings {
  style: ASCIIStyle;
  width: number;
  height: number;
  charset: CharsetType;
  density: number;
}

export interface APIError {
  detail: string;
}