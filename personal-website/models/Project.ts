export default interface Project {
  id: string;
  slug: string;
  title: string;
  excerpt: any;
  content: {
    document: any;
  };
  tags: { name: string }[];
}

export const ALL_PROJECTS_QUERY = `
  query {
    projects(where: { status: { equals: published } }, orderBy: {publishDate: desc}) {
      id
      slug
      title
      excerpt
      tags {
        name
      }
    }
  }
`;

export const allProjectsQueryOptions = (skip = 0) => ({
  variables: {},
  updateData: (prevResult: any, result: any) => ({
    ...result,
    projects: prevResult
      ? [...prevResult.projects, ...result.projects]
      : result.projects,
  }),
});
