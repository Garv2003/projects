import { gql } from 'graphql-tag';

const typeDefs = gql`
    type User {
        id: ID!
        name: String
        email: String
        age: Int
    }
  type Query {
    User: User
  }
`;

export default typeDefs;