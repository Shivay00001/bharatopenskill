
import { Course, Lesson, VolunteerRole, RoadmapItem } from './types';

export const AI_COURSE: Course = {
  id: 'ai-earning-001',
  name: 'AI Tools for Daily Earning',
  description: 'Zero theory, 100% practical. Roz kamao AI ke saath.',
  duration: '21 Days',
  goal: 'Confidence with AI tools to offer services.',
  lessons: [
    {
      id: 1,
      title: 'Prompting Basics',
      hinglishTitle: 'AI se kaam kaise karwayein?',
      skill: 'Prompt Engineering',
      tool: 'ChatGPT/Gemini',
      task: 'Explain GST to a kid.',
      output: 'Simple text summary.',
      duration: '10 mins',
      youtubeId: 'm4m9u2M65r0' // Example ID
    },
    {
      id: 2,
      title: 'Design with AI',
      hinglishTitle: 'Professional Posters banana',
      skill: 'Graphic Design',
      tool: 'Canva AI',
      task: 'Create a Kirana store ad.',
      output: 'One image file.',
      duration: '15 mins',
      youtubeId: 'PCYf0y-y_P4' // Example ID
    }
  ]
};

export const TELEGRAM_RULES = [
  'Be Respectful: No foul language.',
  'Build First: Try before you ask.',
  'No Spam: No irrelevant links.',
  'Help Others: Give back to the community.'
];

// Added missing VOLUNTEER_ROLES constant to fix import error in VolunteerSection.tsx
export const VOLUNTEER_ROLES: VolunteerRole[] = [
  {
    title: 'Mentor',
    description: 'Help students with technical doubts in Hinglish.',
    howToJoin: 'Join Telegram and help 5 people correctly.'
  },
  {
    title: 'Content Creator',
    description: 'Design practical tasks and local use-cases for AI.',
    howToJoin: 'Share a sample lesson plan on our Discord.'
  },
  {
    title: 'Outreach',
    description: 'Spread the mission to rural areas and local shops.',
    howToJoin: 'Organize a local meetup in your town.'
  }
];

// Added missing SCALE_ROADMAP constant to fix import error in VolunteerSection.tsx
export const SCALE_ROADMAP: RoadmapItem[] = [
  {
    stage: 'Phase 1',
    goal: '1,000 Daily Learners',
    method: 'Focus on AI basic earning skills via Telegram.'
  },
  {
    stage: 'Phase 2',
    goal: 'Regional Content',
    method: 'Translate courses to Bengali, Tamil, and Marathi.'
  },
  {
    stage: 'Phase 3',
    goal: 'Direct Hiring',
    method: 'Partner with MSMEs for direct skill placement.'
  }
];
