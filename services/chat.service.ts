import {
  chatRepository,
  type ChatRepository,
} from "@/repositories/chat.repository";
import { aiService, type AiService } from "@/services/ai.service";
import {
  promptBuilderService,
  type PromptBuilderService,
  type PromptCitation,
} from "@/services/prompt-builder.service";
import {
  searchService,
  type SearchService,
} from "@/services/search.service";

export class ChatError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ChatError";
  }
}

export type AskInput = {
  patientId: string;
  userId: string;
  question: string;
  limit: number;
  sessionId?: string | undefined;
};

export type AskResult = {
  sessionId: string;
  answer: string;
  citations: PromptCitation[];
};

// Session titles are derived from the first question.
const SESSION_TITLE_LENGTH = 80;

export class ChatService {
  constructor(
    private readonly chats: ChatRepository = chatRepository,
    private readonly searches: SearchService = searchService,
    private readonly prompts: PromptBuilderService = promptBuilderService,
    private readonly answers: AiService = aiService,
  ) {}

  async ask(input: AskInput): Promise<AskResult> {
    // 1. Resolve the conversation (load existing or create new).
    const session = await this.resolveSession(input);

    // 2. Persist the user's question.
    await this.chats.createMessage({
      sessionId: session.id,
      role: "user",
      content: input.question,
    });

    // 3. Retrieve the most relevant document chunks.
    const chunks = await this.searches.search({
      patientId: input.patientId,
      question: input.question,
      limit: input.limit,
    });

    // 4. Build the grounded prompt with [N] citation placeholders.
    const prompt = this.prompts.build({
      question: input.question,
      chunks,
    });

    // 5. Generate the answer.
    const answer = await this.answers.generateAnswer(prompt);

    // 6. Persist the assistant's answer with its citation map, then bump the
    //    session so it sorts as the most recent conversation.
    await this.chats.createMessage({
      sessionId: session.id,
      role: "assistant",
      content: answer,
      citations: prompt.citations,
    });

    await this.chats.touchSession(session.id);

    return {
      sessionId: session.id,
      answer,
      citations: prompt.citations,
    };
  }

  async getSessions(patientId: string) {
    return this.chats.getSessionsByPatient(patientId);
  }

  async getSession(sessionId: string) {
    return this.chats.getSessionById(sessionId);
  }

  async getMessages(sessionId: string) {
    return this.chats.getMessagesBySession(sessionId);
  }

  private async resolveSession(input: AskInput) {
    if (input.sessionId) {
      const session = await this.chats.getSessionById(input.sessionId);

      if (!session || session.patientId !== input.patientId) {
        throw new ChatError("Chat session not found");
      }

      return session;
    }

    return this.chats.createSession({
      patientId: input.patientId,
      userId: input.userId,
      title: input.question.slice(0, SESSION_TITLE_LENGTH),
    });
  }
}

export const chatService = new ChatService();
