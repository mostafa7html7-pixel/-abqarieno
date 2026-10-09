export type ToolType = 'pencil' | 'ballpoint' | 'fountain' | 'eraser' | 'stamp' | 'touch';

export type InkColor = 'blue' | 'black' | 'red' | 'sepia';

export type AtmosphereType = 'morning' | 'lamp' | 'night' | 'horror' | 'cafe';

export type ReciterId = 'abdulbasit' | 'minshawi' | 'dossari' | 'radio_cairo';

export interface ReciterInfo {
  id: ReciterId;
  nameAr: string;
  titleAr: string;
  descriptionAr: string;
  defaultSurahId: string;
}

export interface QuranSurah {
  id: string;
  number: number;
  nameAr: string;
  englishName: string;
  ayahCount: number;
  reciterId: ReciterId;
  audioUrl: string;
}

export type StampType = 'urgent' | 'approved' | 'archive' | 'editor';

export interface PaperCrease {
  id: string;
  x: number;
  y: number;
  intensity: number;
  radius: number;
}

export interface EraserCrumb {
  id: string;
  x: number;
  y: number;
  size: number;
}

export interface DrawingPoint {
  x: number;
  y: number;
  pressure?: number;
}

export interface DrawingStroke {
  tool: ToolType;
  color: string;
  width: number;
  points: DrawingPoint[];
}

export interface PageContent {
  pageNumber: number;
  titleAr: string;
  subtitleAr: string;
}
