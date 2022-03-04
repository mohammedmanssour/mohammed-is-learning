import { list } from "@keystone-6/core";
import {
  text,
  select,
  timestamp,
  relationship,
  image,
} from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";

const Post = list({
  fields: {
    featuredImage: image(),
    title: text({ validation: { isRequired: true } }),
    slug: text({ validation: { isRequired: true } }),
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
