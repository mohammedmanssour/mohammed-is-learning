import { FC, Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Section from '@ui/Section';
import Keyword from '@ui/Keyword';
import SectionText from '@ui/SectionText';

import { initializeGraphQL } from '../../lib/graphql-client';
import graphQLRequest from '../../lib/graphql-request';
import Post, { ALL_POSTS_QUERY, allPostsQueryOptions } from 'models/Post';

interface IBlog {
  posts: {
    posts: Post[];
  };
}

const imageLoader = ({ src }: { src: string }) => src;

const Blog: FC<IBlog> = ({ posts }) => {
  return (
    <Fragment>
      <Head>
        <title>Open source packages | Mohammed Manssour</title>
      </Head>
      <div className="py-16 my-10 text-4xl font-bold text-center border-t border-b border-gray-700">
        Blog
      </div>
      <Section className="max-w-4xl mx-auto space-y-20">
        {posts.posts.map(post => (
          <article key={post.id} className="py-5 space-y-5">
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
            <h1 className="w-full text-2xl font-medium text-center text-white hover:underline">
              <Link href={`/blog/${post.slug}`}>
                <a>{post.title}</a>
              </Link>
            </h1>
            <div className="flex py-2 space-x-2 text-gray-500 border-gray-700 border-y">
              <span>Tags:</span>
              <span className="text-gray-200">
                {post.tags
                  .reduce<string[]>((acc, tag) => [...acc, tag.name], [])
                  .join(', ')}
              </span>
            </div>
            <SectionText>{post.excerpt}</SectionText>
          </article>
        ))}
        <div className="flex items-center justify-center h-32 text-xl border-t border-gray-700">
          <Keyword>Crafted with love</Keyword>
        </div>
      </Section>
    </Fragment>
  );
};

export async function getStaticProps() {
  const client = initializeGraphQL();

  const response = await graphQLRequest(
    client,
    ALL_POSTS_QUERY,
    allPostsQueryOptions()
  );

  return {
    props: {
      //@ts-ignore
      posts: response.data,
    },
  };
}

export default Blog;
