import { FC, Fragment } from 'react';
import Head from 'next/head';
import { initializeGraphQL } from '../../lib/graphql-client';
import graphQLRequest from '../../lib/graphql-request';
import { DocumentRenderer } from '@keystone-6/document-renderer';

import Project, { allProjectsQueryOptions } from 'models/Project';

interface IPackageDetails {
  project: Project;
}

const PackageDetails: FC<IPackageDetails> = ({ project }) => {
  return (
    <Fragment>
      <Head>
        <title>{project.title} by Mohammed manssour</title>
      </Head>
      <article className="max-w-4xl py-5 mx-auto space-y-5">
        <div className="flex py-2 space-x-2 text-gray-500">
          <span>Tags:</span>
          <span className="text-gray-200">
            {project.tags
              .reduce<string[]>((acc, tag) => [...acc, tag.name], [])
              .join(', ')}
          </span>
        </div>
        <div className="py-16 my-10 text-4xl font-bold text-center border-t border-b border-gray-700">
          {project.title}
        </div>

        <div className="max-w-4xl prose prose-xl dark:prose-invert">
          <DocumentRenderer document={project.content.document} />
        </div>
      </article>
    </Fragment>
  );
};

export const PROJECT_QUERY = `
  query projects($slug: String!) {
    projects(where: { slug: { equals: $slug }}) {
      id
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

export const projectQueryOptions = (slug: string) => ({
  variables: { slug },
  updateData: (prevResult: any, result: any) => ({
    ...result,
    projects: prevResult
      ? [...prevResult.projects, ...result.projects]
      : result.projects,
  }),
});

export async function getStaticProps({ params }: any) {
  const client = initializeGraphQL();

  const response = await graphQLRequest(
    client,
    PROJECT_QUERY,
    projectQueryOptions(params.slug)
  );

  //@ts-ignore
  const projects: Project[] = response.data?.projects || null;

  if (!projects) {
    return false;
  }

  return {
    props: {
      project: projects[0],
    },
  };
}

export const ALL_PROJECTS_SLUGS = `
  query {
    projects {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const client = initializeGraphQL();

  const response = await graphQLRequest(
    client,
    ALL_PROJECTS_SLUGS,
    allProjectsQueryOptions()
  );

  //@ts-ignore
  const projects: Project[] = response.data?.projects;

  const paths = projects.map(project => ({
    params: { slug: project.slug },
  }));

  return { paths, fallback: false };
}

export default PackageDetails;
