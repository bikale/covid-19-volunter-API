const { gql } = require("apollo-server-express");

const data = [
  {
    title: "Webaa Application Programming",
    faculty: "Asaad Saad",
    code: "CS472",
    rating: 4,
  },
  {
    title: "Modern Web Application",
    faculty: "Asaad Saad",
    code: "CS572",
    rating: 5,
  },
  {
    title: "Enterprise Architecture",
    faculty: "Joe Bruen",
    code: "CS557",
    rating: 4,
  },
  { title: "Algorithms", faculty: "Clyde Ruby", code: "CS421", rating: 5 },
  {
    title: "Object Oriented JavaScript",
    faculty: "Keith Levi",
    code: "CS372",
    rating: 3,
  },
  { title: "Big Data", faculty: "Prem Nair", code: "CS371", rating: 5 },
  {
    title: "Web Application Architecture",
    faculty: "Rakesh Shrestha",
    code: "CS377",
    rating: 5,
  },
  {
    title: "Big Data Analytics",
    faculty: "Mrudula Mukadam",
    code: "CS378",
    rating: 5,
  },
];

const typeDefs = gql`
  type Contact {
    title: String
    faculty: String
    code: String
    rating: Int
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
