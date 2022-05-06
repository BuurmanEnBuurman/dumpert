import { gql, ApolloServer } from "apollo-server-micro";
import clientPromise from "../../lib/mongodb"

const typeDefs = gql`
  type User {
    id: ID
  }

  type VideoMediaStills {
    still: String
    still_large: String
    still_medium: String
    thumb: String
    thumb_medium: String
  }

  type VideoMediaStats {
    kudos_today: Int
    kudos_total: Int
    views_today: Int
    views_total: Int
  }

  type VideoMediaVariants {
    uri: String
    version: String
  }

  type VideoMedia {
    description: String
    duration: Int
    mediatype: String
    variants: [VideoMediaVariants]
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
    media: [VideoMedia]
    stats: VideoMediaStats
    stills: VideoMediaStills
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
    getVideoMeta: async (_, args) => {
      const db = (await clientPromise).db()
      const data = await db.collection("videos").findOne({})
      console.log(args)

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
        media: [
          {
            description: "kaas",
            duration: 2,
            mediatype: "video",
            variants: [{ uri: "uri", version: "mobile" }],
          },
        ],
        stats: {
          kudos_today: 123,
          kudos_total: 4,
          views_today: 3,
          views_total: 2,
        },
        stills: {
          still: "https://media.dumpert.nl/...",
          still_large: "https://media.dumpert.nl/...",
          still_medium: "https://media.dumpert.nl/..",
          thumb: "https://media.dumpert.nl/...",
          thumb_medium: "https://media.dumpert.nl/...",
        },
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
