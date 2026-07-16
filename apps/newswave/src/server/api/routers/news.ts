import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { posts, users } from "~/server/db/schema";
import type { NewsProps } from "~/types";
import { env } from "~/env";
import { eq } from 'drizzle-orm';

export const newsRouter = createTRPCRouter({
  news: publicProcedure.input(z.object({
    category: z.string(),
    page: z.number(),
  })).query(async ({ input }) => {
    try {
      const news = await fetch(`https://newsapi.org/v2/everything?q=${input.category}&page=${input.page}&pageSize=${12}&apiKey=${env.NEWS_API_KEY}`);
      const newsJson = await news.json() as NewsProps;
      return newsJson;
    }
    catch (err) {
      console.error(err);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  }),


  create: protectedProcedure
    .input(z.object({
      name: z.string(),
      author: z.string(),
      title: z.string(),
      description: z.string(),
      url: z.string(),
      urlToImage: z.string(),
      publishedAt: z.string(),
      content: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {

        const postExist = await ctx.db.select().from(posts).where(eq(posts.url, input.url));

        if (postExist.length > 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Post already exists",
          });
        }

        await ctx.db.insert(posts).values({
          createdById: ctx.session?.user.id,
          name: input.name,
          author: input.author,
          title: input.title,
          description: input.description,
          url: input.url,
          urlToImage: input.urlToImage,
          publishedAt: input.publishedAt,
          content: input.content,
        })

        return { message: "Post saved successfully" };
      }
      catch (err) {
        console.error(err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),

  deleteSavedNews: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.delete(posts).where(eq(posts.id, input.id));

        return { message: "Post deleted successfully" };
      }
      catch (err) {
        console.error(err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),

  getProfile: protectedProcedure.query(async ({ ctx }) => {
    try {
      const user = await ctx.db.select().from(users).where(eq(users.id, ctx.session?.user.id));
      const blogs = await ctx.db.select().from(posts).where(eq(posts.createdById, ctx.session?.user.id));

      return { user: user[0], blogs };
    }
    catch (err) {
      console.error(err);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  }),
});

