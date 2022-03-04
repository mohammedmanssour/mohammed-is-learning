import { config } from "@keystone-6/core";
import { lists } from "./schema";
import { withAuth, session } from "./auth";
import env from "dotenv";

env.config();

export default withAuth(
  config({
    db: {
      provider: "sqlite",
      url: "file:./keystone.db",
    },
    server: {
      port: 3001,
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    images: {
      upload: "local",
      local: {
        storagePath: "public/images",
        baseUrl: "/images",
      },
    },
    lists,
    session,
    graphql: {
      playground: true,
    },
  })
);
