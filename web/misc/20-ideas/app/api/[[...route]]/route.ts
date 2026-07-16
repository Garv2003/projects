import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { db } from "@/drizzle/db";
import { ideas } from "@/drizzle/schema";
import { eq } from 'drizzle-orm';

const app = new Hono().basePath('/api')

app.get('/test', (c) => {
    return c.json({
        message: 'Testing Hono.Js on Vercel!',
    })
})

app.get("/ideas", async (c) => {
    try {
        const all_ideas = await db.select().from(ideas);
        return c.json(all_ideas)
    } catch (e) {
        return c.json({ message: 'Ideas not found' }, 404)
    }
})

app.post("/ideas", async (c) => {
    const body = await c.req.json()
    try {
        const new_idea = await db.insert(ideas).values(body).returning();
        return c.json(new_idea)
    } catch (e) {
        return c.json({ message: 'Idea not created' }, 400)
    }
})

app.put("/ideas/:id/upvote", async (c) => {
    const idea_id = c.req.param('id')
    try {
        const idea = await db.selectDistinct().from(ideas).where(eq(ideas.id, idea_id))
        if (!idea[0]) {
            return c.json({ message: 'Idea not found' }, 404)
        }
        const update_idea = await db.update(ideas).set({ votes: Number(idea[0].votes) + 1 }).where(eq(ideas.id, idea_id))
        return c.json(update_idea)
    } catch (e) {
        return c.json({ message: 'Idea not found' }, 404)
    }
})

app.put("/ideas/:id/downvote", async (c) => {
    const id = c.req.param('id')
    try {
        const idea = await db.selectDistinct().from(ideas).where(eq(ideas.id, id))
        if (!idea[0]) {
            return c.json({ message: 'Idea not found' }, 404)
        }
        const update_idea = await db.update(ideas).set({ votes: Number(idea[0].votes) - 1 }).where(eq(ideas.id, id))
        return c.json(update_idea)
    } catch (e) {
        return c.json({ message: 'Idea not found' }, 404)
    }
})

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)