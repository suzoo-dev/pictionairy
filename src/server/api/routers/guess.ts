import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const guessRouter = createTRPCRouter({
  send: publicProcedure
    .input(z.object({ image: z.string() }))
    .mutation(async ({ input }) => {
      console.log(input.image);

      return {
        image: input.image,
      };
    }),
});
