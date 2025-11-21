import type { Lesson } from "@/app/(tools)/translation-challenge/common/type";

import {
  LessonSchema,
  API_CONFIG,
  SYSTEM_PROMPT,
  buildUserPrompt,
  selectTopic,
  selectSentenceStructure,
  RESPONSE_FORMAT,
} from "./config";

export const createChallenge = async (): Promise<Lesson> => {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY không được cấu hình");
  }

  // Chọn topic và cấu trúc câu
  const selectedTopic = selectTopic();
  const selectedSentenceStructure = selectSentenceStructure();

  // Log để theo dõi giá trị đã chọn
  // eslint-disable-next-line no-console
  console.log("🎲 Random Selection:", {
    topic: selectedTopic,
    sentenceStructure: selectedSentenceStructure,
  });

  // Tạo prompt với topic và cấu trúc câu đã chọn
  const userPrompt = buildUserPrompt(selectedTopic, selectedSentenceStructure);

  // Gọi OpenRouter API với structured output
  const response = await fetch(API_CONFIG.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer":
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      "X-Title": "30 Days English",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: API_CONFIG.model,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      response_format: RESPONSE_FORMAT,
      temperature: API_CONFIG.temperature,
      max_tokens: API_CONFIG.max_tokens,
    }),
  });

  if (!response.ok) {
    let errorData;

    try {
      errorData = await response.json();
    } catch {
      errorData = await response.text();
    }
    // eslint-disable-next-line no-console
    console.error("OpenRouter API error:", {
      status: response.status,
      statusText: response.statusText,
      error: errorData,
    });

    throw new Error(
      `OpenRouter API error: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content;

  if (!content) {
    throw new Error("Không có dữ liệu từ API");
  }

  // Parse và validate response
  const parsedContent = JSON.parse(content);
  const validatedData = LessonSchema.parse(parsedContent);

  return validatedData;
};
