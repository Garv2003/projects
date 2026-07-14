import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';
import { ApolloServer } from '@apollo/server';
import typeDefs from '@/graphql/Schema';
import resolvers from '@/graphql/Resolver';

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req, res) => ({
    req,
    res
  })
})

export { handler as GET, handler as POST };