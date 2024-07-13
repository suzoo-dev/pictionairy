/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export const guessRouter = createTRPCRouter({
  send: publicProcedure
    .input(z.object({ image: z.string() }))
    .mutation(async ({ input }) => {
      const prompt =
        "What has been drawn in this picture? Please answer in as few words as possible.";

      const { text, finishReason } = await generateText({
        // model: google("models/gemini-1.5-pro-latest"),
        model: openai("gpt-4-turbo"),
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt,
              },
              {
                type: "image",
                image: input.image,
              },
            ],
          },
        ],
      });

      return {
        answer: text,
        finishReason,
      };
    }),

  getIdea: publicProcedure
    .input(z.object({ oldIdea: z.array(z.string()) }))
    .query(async ({ input }) => {
      const prompt = `Please give me an idea to draw in a game of pictionary. It should be an object or animal, only 1 or 2 words, and easy to draw. Please just give the word as the response with no other formatting. It must be different from the last idea ${input.oldIdea.join(", ")}`;
      const { text } = await generateText({
        model: google("models/gemini-1.5-pro-latest"),
        prompt: prompt,
      });

      return {
        idea: text,
      };
    }),
});
