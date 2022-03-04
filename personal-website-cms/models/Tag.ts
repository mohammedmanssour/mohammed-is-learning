import { list } from "@keystone-6/core";
import { relationship, text } from "@keystone-6/core/fields";

const Tag = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    posts: relationship({
      ref: "Post.tags",
      ui: {
        hideCreate: true,
      },
    }),
  },
});

export default Tag;
