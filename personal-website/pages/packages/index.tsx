import { FC, Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Section from '@ui/Section';
import Keyword from '@ui/Keyword';

import { initializeGraphQL } from '../../lib/graphql-client';
import graphQLRequest from '../../lib/graphql-request';
import Project, {
  ALL_PROJECTS_QUERY,
  allProjectsQueryOptions,
} from 'models/Project';
import SectionText from '@ui/SectionText';
import SectionDivider from '@ui/SectionDivider';

interface IProjects {
  projects: {
    projects: Project[];
  };
}

const Projects: FC<IProjects> = ({ projects }) => {
  return (
    <Fragment>
      <Head>
        <title>Open source packages | Mohammed Manssour</title>
      </Head>
      <div className="py-16 my-10 text-4xl font-bold text-center border-t border-b border-gray-700">
        Open source packages
      </div>
      <Section className="max-w-4xl mx-auto space-y-20">
        {projects.projects.map(project => (
          <article key={project.id} className="py-5 space-y-5">
            <h1 className="w-full text-2xl font-medium text-center text-white hover:underline">
              <Link href={`/packages/${project.slug}`}>
                <a>{project.title}</a>
              </Link>
            </h1>
            <div className="flex py-2 space-x-2 text-gray-500 border-gray-700 border-y">
              <span>Tags:</span>
              <span className="text-gray-200">
                {project.tags
                  .reduce<string[]>((acc, tag) => [...acc, tag.name], [])
                  .join(', ')}
              </span>
            </div>
            <SectionText>{project.excerpt}</SectionText>
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
    ALL_PROJECTS_QUERY,
    allProjectsQueryOptions()
  );

  return {
    props: {
      //@ts-ignore
      projects: response.data,
    },
  };
}

export default Projects;
