import env from "dotenv";
import { list } from "@keystone-6/core";
import {
  text,
  select,
  timestamp,
  relationship,
  image,
} from "@keystone-6/core/fields";
import { cloudinaryImage } from "@keystone-6/cloudinary";
import { document } from "@keystone-6/fields-document";

env.config();

const Post = list({
  fields: {
    featuredImage: cloudinaryImage({
      cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
        apiKey: process.env.CLOUDINARY_API_KEY as string,
        apiSecret: process.env.CLOUDINARY_API_SECRET as string,
        folder: process.env.CLOUDINARY_API_FOLDER,
      },
    }),
    title: text({ validation: { isRequired: true } }),
    slug: text({ validation: { isRequired: true }, isFilterable: true }),
    excerpt: text({
      validation: { isRequired: true },
      ui: {
        displayMode: "textarea",
      },
    }),
    status: select({
      type: "enum",
      options: [
        { label: "Published", value: "published" },
        { label: "Draft", value: "draft" },
      ],
      defaultValue: "draft",
    }),
    content: document({
      formatting: true,
      links: true,
      dividers: true,
    }),
    publishDate: timestamp(),
    tags: relationship({
      ref: "Tag.posts",
      many: true,
    }),
  },
  ui: {
    listView: {
      initialColumns: ["title", "slug", "status", "publishDate"],
    },
  },
});

export default Post;
