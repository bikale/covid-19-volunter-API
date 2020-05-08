const fs = require("fs");
const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { ApolloServer, gql, graphqlExpress } = require("apollo-server-express");

const { resolvers, typeDefs } = require("./graphql/schema");

const PORT = 4000;

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

// app.use(cors());
server.applyMiddleware({ app });

app.listen(process.env.PORT || PORT, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
