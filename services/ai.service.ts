import { openai } from "@/openai/client";

import type { BuiltPrompt } from "@/services/prompt-builder.service";

// Cost-effective default for grounded clinical Q&A. Centralized so the model
// can be swapped without touching call sites.
const ANSWER_MODEL = "gpt-4o-mini";

export class AnswerGenerationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AnswerGenerationError";
  }
}

export class AiService {
  // Prompt in, answer out. Retrieval and prompt construction are the
  // caller's responsibility (searchService -> promptBuilderService).
  async generateAnswer(prompt: BuiltPrompt): Promise<string> {
    try {
      const response = await openai.responses.create({
        model: ANSWER_MODEL,
        instructions: prompt.systemPrompt,
        input: prompt.userPrompt,
      });

      const answer = response.output_text;

      if (!answer) {
        throw new AnswerGenerationError("OpenAI returned an empty response.");
      }

      return answer;
    } catch (error) {
      if (error instanceof AnswerGenerationError) {
        throw error;
      }

      throw new AnswerGenerationError(
        `Failed to generate answer: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );
    }
  }
}

export const aiService = new AiService();
