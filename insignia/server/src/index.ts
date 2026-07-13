import { Elysia } from "elysia";
import mongoose from 'mongoose'
import { apollo } from '@elysiajs/apollo'
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { context } from "./graphql/context";
import { cors } from '@elysiajs/cors'

const app = new Elysia()

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.get("/", () => "Testing Elysia Server")

app.use(
  apollo({
    typeDefs,
    resolvers,
    context
  })
)

mongoose.connect(process.env.MONGO_URI || "")
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(3000);
    console.log(
      `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
    );
  })
  .catch((err) => {
    console.error(err)
  })
