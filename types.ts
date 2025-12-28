
export interface Lesson {
  id: number;
  title: string;
  hinglishTitle: string;
  skill: string;
  tool: string;
  task: string;
  output: string;
  duration: string;
  youtubeId: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  duration: string;
  goal: string;
  lessons: Lesson[];
  externalLink?: string; 
  isEmbedded?: boolean; // New flag to determine if link should open in iframe
  thumbnailUrl?: string;
}

export interface User {
  name: string;
  isLoggedIn: boolean;
  progress: number[];
}

export interface VolunteerRole {
  title: string;
  description: string;
  howToJoin: string;
}

export interface RoadmapItem {
  stage: string;
  goal: string;
  method: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export type ViewState = 'home' | 'course' | 'assistant' | 'profile' | 'certification' | 'resource';
