const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    password: String
    createdEvents: [Event!]
  }
  type Query {
    courses: [Contact]
  }
`;
const resolvers = {
  Query: {
    courses: () => data,
  },
};

module.exports = { typeDefs, resolvers };
