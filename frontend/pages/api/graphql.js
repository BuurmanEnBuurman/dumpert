import { gql, ApolloServer } from "apollo-server-micro";

const typeDefs = gql`
  type User {
    id: ID
  }

  type VideoMedia {
    description
    duration
    mediatype
  }

  type Video {
    id: ID
    article_id: ID
    description: String
    media_type: String
    nopreroll: String
    nsfw: Boolean
    scripts: String
    secret: Boolean
    still: String
    tags: String
    thumbnail: String
    title: String
    upload_id: ID
    upload_date: String
  }

  type Query {
    getUser: User
    getVideoMeta: Video
  }
`;

const resolvers = {
  Query: {
    getUser: () => {
      return {
        id: "ID",
      };
    },
    getVideoMeta: () => {
      return {
        id: "Foo",
        article_id: "ID",
        description: "String",
        media_type: "String",
        nopreroll: "String",
        nsfw: true,
        scripts: "String",
        secret: false,
        still: "String",
        tags: "String",
        thumbnail: "String",
        title: "String",
        upload_id: "ID",
        upload_date: "String",
      };
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
