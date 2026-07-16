import { gql } from '@elysiajs/apollo'

export const typeDefs = gql(`
    type User {
        id: ID!
        name: String!
        email: String!
        message: String!
        success: Boolean!
    }

    type Response {
        message: String!
        success: Boolean!
        token: String
    }

    type Logo{
        title: String!
        image: String!
        user_id: ID!
    }
    
    type Query {
        user: User
        logos: [Logo]
    }

    input LogoInput {
        title: String!
        image: String!
    }

    input UserInput {
        name: String!
        email: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    type Mutation {
        login(user: LoginInput): Response
        sign(user: UserInput): Response
        createLogo(logo: LogoInput): Logo
    }
`)


