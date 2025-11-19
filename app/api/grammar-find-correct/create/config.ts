import { z } from "zod";

import { CONFIG_TOPIC } from "@/app/api/topics";

// Schema cho structured output
export const GrammarChallengeSchema = z.object({
  options: z
    .array(
      z.object({
        sentence: z
          .string()
          .describe(
            "Complex sentence with main clause + subordinate clause. Same meaning as other options, different grammar. Only one is correct. Must NOT contain 'a', 'b', 'c', 'd' as standalone words.",
          ),
        label: z
          .string()
          .describe(
            "Label for the option: must be 'a', 'b', 'c', or 'd' (lowercase letters only)",
          ),
      }),
    )
    .min(3)
    .max(4)
    .describe(
      "3-4 complex sentences. Same meaning, different grammar. Only one correct.",
    ),
  correctAnswer: z
    .string()
    .describe(
      "The label of the correct answer: must be 'a', 'b', 'c', or 'd' (lowercase letter). Must match one of the labels in options.",
    ),
  explanation: z
    .string()
    .describe(
      "Very brief explanation in Vietnamese (1-2 sentences). Just state why the correct answer is correct. Keep it short and simple.",
    ),
  grammars: z
    .array(
      z.object({
        structure: z
          .string()
          .describe(
            "The sentence structure formula (e.g., 'S + have/has + V3', 'If + S + V2, S + would + V', 'S + be + V-ing', etc.)",
          ),
        explanation: z
          .string()
          .describe(
            "Brief explanation of the grammar structure in Vietnamese (1 sentence).",
          ),
      }),
    )
    .describe(
      "List of 3-5 grammar structures present in the correct sentence. Each item must include the structure formula and a brief explanation.",
    ),
});

// API Configuration
export const API_CONFIG = {
  url: "https://openrouter.ai/api/v1/chat/completions",
  model: "openai/gpt-4.1-mini",
  temperature: 1.2,
  max_tokens: 400000,
} as const;

// System Prompt
export const SYSTEM_PROMPT =
  "You are an English grammar expert creating exercises at IELTS 5.0-5.5 level.";

export const USER_PROMPT = `Create a grammar exercise where students identify the ONLY grammatically correct sentence.

REQUIREMENTS:
- 3-4 complex sentences (main clause + subordinate clause)
- All sentences have the SAME meaning, different grammar
- Only ONE sentence is correct, others have grammar errors
- Sentence must NOT contain letters 'a', 'b', 'c', 'd' as standalone words
- Labels: 'a', 'b', 'c', 'd' (lowercase)

RANDOM SELECTION & VARIETY:
- Select 2 topics from: ${CONFIG_TOPIC.MEDIUM_TOPICS}
- Choose tenses from these 6 options: Present Simple, Present Continuous, Present Perfect, Past Simple, Past Continuous, Future Simple
- Mix and match different tense combinations between main and subordinate clauses
- Use various sentence structure patterns:
  * Present Perfect + relative clause: "He has finished the work that he started yesterday."
  * Past Continuous + time clause: "She was studying when her friend called."
  * Future Simple + relative clause: "They will travel to Paris next month."
  * Present Continuous + relative clause: "I am working on a project that requires attention."
  * Past Simple + relative clause: "We visited the museum that opened last year."
  * Conditional + result: "If it rains tomorrow, we will stay home."
  * Adverbial clause + main: "Although she was tired, she continued working."
  * Passive voice + clause: "The book was written by an author who lives in London."

OUTPUT:
- Explanation: Brief Vietnamese (1-2 sentences)
- Grammars: 3-5 structures with formula and brief Vietnamese explanation`;

// JSON Schema for response format
export const JSON_SCHEMA = {
  type: "object",
  properties: {
    options: {
      type: "array",
      minItems: 3,
      maxItems: 4,
      items: {
        type: "object",
        properties: {
          sentence: {
            type: "string",
            description:
              "Complex sentence with main clause + subordinate clause. Same meaning as other options, different grammar. Only one is correct. Must NOT contain 'a', 'b', 'c', 'd' as standalone words.",
          },
          label: {
            type: "string",
            description:
              "Label for the option: must be 'a', 'b', 'c', or 'd' (lowercase letters only)",
          },
        },
        required: ["sentence", "label"],
        additionalProperties: false,
      },
      description:
        "3-4 complex sentences. Same meaning, different grammar. Only one correct.",
    },
    correctAnswer: {
      type: "string",
      description:
        "The label of the correct answer: must be 'a', 'b', 'c', or 'd' (lowercase letter). Must match one of the labels in options.",
    },
    explanation: {
      type: "string",
      description:
        "Very brief explanation in Vietnamese (1-2 sentences). Just state why the correct answer is correct. Keep it short and simple.",
    },
    grammars: {
      type: "array",
      items: {
        type: "object",
        properties: {
          structure: {
            type: "string",
            description:
              "The sentence structure formula (e.g., 'S + have/has + V3', 'If + S + V2, S + would + V', 'S + be + V-ing', etc.)",
          },
          explanation: {
            type: "string",
            description:
              "Brief explanation of the grammar structure in Vietnamese (1 sentence).",
          },
        },
        required: ["structure", "explanation"],
        additionalProperties: false,
      },
      minItems: 3,
      maxItems: 5,
      description:
        "List of 3-5 grammar structures present in the correct sentence. Each item must include the structure formula and a brief explanation.",
    },
  },
  required: ["options", "correctAnswer", "explanation", "grammars"],
  additionalProperties: false,
} as const;

// Response format configuration
export const RESPONSE_FORMAT = {
  type: "json_schema",
  json_schema: {
    name: "grammar_challenge",
    strict: true,
    schema: JSON_SCHEMA,
  },
} as const;
