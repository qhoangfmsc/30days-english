// Types for Grammar Find Correct Challenge

export interface GrammarOption {
  sentence: string;
  label: string; // "1", "2", "3", "4" or "a", "b", "c", "d"
}

export interface GrammarStructure {
  structure: string; // Công thức cấu trúc (ví dụ: "S + have/has + V3")
  explanation: string; // Giải thích ngắn gọn về cấu trúc này
}

export interface GrammarChallenge {
  options: GrammarOption[]; // 3-4 câu
  correctAnswer: string; // "1", "2", "3", "4" or "a", "b", "c", "d"
  explanation: string; // Giải thích vì sao câu đó đúng
  grammars: GrammarStructure[]; // Danh sách các cấu trúc ngữ pháp có trong câu đúng
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  details?: unknown;
}
