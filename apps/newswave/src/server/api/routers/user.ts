import { z } from "zod";
import bcrypt from "bcrypt";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
    register: publicProcedure.input(z.object({
        email: z.string().email(),
        firstName: z.string().min(2).max(50),
        lastName: z.string().min(2).max(50),
        password: z.string().min(8).max(20),
    })).mutation(async ({ ctx, input }) => {
        try {
            const existUser = await ctx.db.select().from(users).where(eq(users.email, input.email));

            if (existUser.length > 0) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "User already exists",
                });
            }

            const hashedPassword = await bcrypt.hash(input.password, 12);

            const newUser = await ctx.db.insert(users).values({
                firstname: input.firstName,
                lastname: input.lastName,
                email: input.email,
                password: hashedPassword,
            })

            return newUser;
        }
        catch (err) {
            console.error(err);
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Something went wrong",
            });
        }
    }),
    updateProfile: protectedProcedure.input(z.object({
        image: z.string(),
        bio: z.string(),
    })).mutation(async ({ ctx, input }) => {
        try {
            const updatedUser = await ctx.db.update(users).set({
                image: input.image,
                bio: input.bio,
            }).where(eq(users.id, ctx.session?.user.id));

            return updatedUser;
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
