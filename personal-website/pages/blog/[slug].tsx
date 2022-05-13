import { FC, Fragment } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { initializeGraphQL } from '../../lib/graphql-client';
import graphQLRequest from '../../lib/graphql-request';
import { DocumentRenderer } from '@keystone-6/document-renderer';

import Post, { allPostsQueryOptions } from 'models/Post';

interface IPackageDetails {
  post: Post;
}

const imageLoader = ({ src }: { src: string }) => src;

const PackageDetails: FC<IPackageDetails> = ({ post }) => {
  return (
    <Fragment>
      <Head>
        <title>{post.title} by Mohammed manssour</title>
      </Head>
      <article className="w-full max-w-4xl px-4 py-5 mx-auto space-y-5 overflow-auto">
        <div className="flex py-2 space-x-2 text-gray-500">
          <span>Tags:</span>
          <span className="text-gray-200">
            {post.tags
              .reduce<string[]>((acc, tag) => [...acc, tag.name], [])
              .join(', ')}
          </span>
        </div>
        <div className="py-16 my-10 text-4xl font-bold text-center border-t border-b border-gray-700">
          {post.title}
        </div>

        {Boolean(post.featuredImage) && (
          <div className="w-full overflow-hidden rounded">
            <Image
              src={post.featuredImage?.publicUrl as string}
              layout="responsive"
              width={1000}
              height={400}
              alt={post.title}
              loader={imageLoader}
            />
          </div>
        )}

        <div className="prose-invert max-w-4xl prose prose-xl">
          <DocumentRenderer document={post.content.document} />
        </div>
      </article>
    </Fragment>
  );
};

export const PROJECT_QUERY = `
  query posts($slug: String!) {
    posts(where: { slug: { equals: $slug }}) {
      id
      featuredImage {
        publicUrl
      }
      slug
      title
      content {
        document
      }
      tags {
        name
      }
    }
  }
`;

export const postQueryOptions = (slug: string) => ({
  variables: { slug },
  updateData: (prevResult: any, result: any) => ({
    ...result,
    posts: prevResult ? [...prevResult.posts, ...result.posts] : result.posts,
  }),
});

export async function getStaticProps({ params }: any) {
  const client = initializeGraphQL();

  const response = await graphQLRequest(
    client,
    PROJECT_QUERY,
    postQueryOptions(params.slug)
  );

  //@ts-ignore
  const posts: Post[] = response.data?.posts || null;

  if (!posts) {
    return false;
  }

  return {
    props: {
      post: posts[0],
    },
  };
}

export const ALL_POSTS_SLUGS = `
  query {
    posts (where: { status: { equals: published } }) {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const client = initializeGraphQL();

  const response = await graphQLRequest(
    client,
    ALL_POSTS_SLUGS,
    allPostsQueryOptions()
  );

  //@ts-ignore
  const posts: Project[] = response.data?.posts;

  const paths = posts.map(project => ({
    params: { slug: project.slug },
  }));

  return { paths, fallback: false };
}

export default PackageDetails;
