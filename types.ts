export interface SyllabusData {
  [key: string]: string[];
}

export interface NoteTypeOption {
  value: string;
  label: string;
  promptPrefix: string;
}

export interface Source {
  uri: string;
  title: string;
}

export interface GenerationResult {
  text: string;
  sources: Source[];
}

export type GenerationMode = 'notes' | 'questions';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
