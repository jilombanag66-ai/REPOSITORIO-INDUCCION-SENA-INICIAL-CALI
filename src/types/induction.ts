/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ModuleCategory = 'identidad' | 'reglamento' | 'fpi' | 'bienestar';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  normReference: string;
}

export interface Quiz {
  id: string;
  title: string;
  moduleId: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number;
}

export interface CaseOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: 'academica' | 'disciplinaria' | 'tramite';
  situation: string;
  contextArticle: string;
  options: CaseOption[];
  resolutionRule: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: string;
  required: boolean;
}

export interface Apprentice {
  id: string;
  name: string;
  documentNumber: string;
  documentType: 'CC' | 'TI' | 'CE' | 'PEP';
  email: string;
  phone: string;
  fichaNumber: string;
  programName: string;
  regional: string;
  trainingCenter: string;
  avatar: string;
  status: 'Completado' | 'En progreso' | 'Pendiente';
  progressPercentage: number;
  completedModules: string[];
  quizScores: Record<string, number>;
  checklist: Record<string, boolean>;
  startDate: string;
  lastAccess: string;
  notes?: string[];
}

export interface InductionModule {
  id: string;
  title: string;
  shortTitle: string;
  category: ModuleCategory;
  durationMinutes: number;
  description: string;
  topicsCount: number;
  objectives: string[];
}
