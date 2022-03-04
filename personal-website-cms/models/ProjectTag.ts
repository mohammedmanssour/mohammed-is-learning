import { list } from "@keystone-6/core";
import { relationship, text } from "@keystone-6/core/fields";

const ProjectTag = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    projects: relationship({
      ref: "Project.tags",
      ui: {
        hideCreate: true,
      },
      many: true,
    }),
  },
});

export default ProjectTag;
