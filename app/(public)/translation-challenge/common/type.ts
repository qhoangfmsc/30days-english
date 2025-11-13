export interface DayChallenge {
  day: number;
  tense: string;
  vietnameseText: string;
  englishText: string;
  description?: string;
  newVocabulary: {
    word: string;
    type: string;
    translation: string;
  }[];
  reviewVocabulary: string[];
}

export interface ChallengeData {
  success: boolean;
  data: {
    days: DayChallenge[];
  };
}

export interface ChallengeListProps {
  days: DayChallenge[];
}

export interface ExportButtonProps {
  days: DayChallenge[];
}

export interface ShareButtonProps {
  day?: DayChallenge;
  isOpen?: boolean;
  onClose?: () => void;
}

export interface LessonData {
  tense: string;
  vietnameseText: string;
  englishText: string;
  newVocabulary: {
    word: string;
    type: string;
    translation: string;
  }[];
  reviewVocabulary?: string[];
}

export interface GenerateButtonProps {
  onGenerate: (data: LessonData) => void;
  className?: string;
  showStatus?: boolean;
}

interface DiscordField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface WebhookConfig {
  name: string;
  url: string;
}

