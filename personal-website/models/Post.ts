export default interface Project {
  id: string;
  featuredImage?: {
    publicUrl: string;
  };
  slug: string;
  title: string;
  excerpt: any;
  content: {
    document: any;
  };
  tags: { name: string }[];
}

export const ALL_POSTS_QUERY = `
  query {
    posts (where: { status: { equals: published } }) {
      id
      slug
      title
      featuredImage {
        publicUrl
      }
      excerpt
      tags {
        name
      }
    }
  }
`;

export const allPostsQueryOptions = (skip = 0) => ({
  variables: {},
  updateData: (prevResult: any, result: any) => ({
    ...result,
    posts: prevResult ? [...prevResult.posts, ...result.posts] : result.posts,
  }),
});
