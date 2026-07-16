import { Redis } from '@upstash/redis/cloudflare'
import { Hono } from 'hono'
import { env } from 'hono/adapter'
import { cors } from 'hono/cors'
import { handle } from 'hono/vercel'

export const runtime = 'edge'

type EnvConfig = {
    REDIS_URL: string
    REDIS_TOKEN:string
}

const app = new Hono().basePath('/api')

// app.use('/*', cors())

app.get('/search', async (c) => {
    try {
        const { REDIS_URL, REDIS_TOKEN } =
            env<EnvConfig>(c)

        const start = performance.now()
        // ---------------------

        const redis = new Redis({
            token: REDIS_TOKEN,
            url: REDIS_URL,
        })

        const query = c.req.query('q')?.toUpperCase()

        if (!query) {
            return c.json({ message: 'Invalid search query' }, { status: 400 })
        }

        const res = []
        const rank = await redis.zrank('2terms', query)

        if (rank !== null && rank !== undefined) {
            const temp = await redis.zrange<string[]>('2terms', rank, rank + 100)

            for (const el of temp) {
                if (!el.startsWith(query)) {
                    break
                }

                if (el.endsWith('*')) {
                    res.push(el.substring(0, el.length - 1))
                }
            }
        }

        // ------------------------
        const end = performance.now()

        return c.json({
            results: res,
            duration: end - start,
        })
    } catch (err) {
        console.error(err)

        return c.json(
            { results: [], message: 'Something went wrong.' },
            {
                status: 500,
            }
        )
    }
})

export const GET = handle(app)
