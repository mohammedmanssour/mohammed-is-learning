import { list } from "@keystone-6/core";
import { text, select, timestamp, relationship } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";

const Project = list({
  fields: {
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
      ref: "ProjectTag.projects",
      many: true,
    }),
  },
  ui: {
    listView: {
      initialColumns: ["title", "slug", "status", "publishDate"],
    },
  },
});

export default Project;
