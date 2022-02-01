import { FC } from 'react';

import Section from '@ui/Section';
import SectionDivider from '@ui/SectionDivider';
import SectionTitle from '@ui/SectionTitle';
import SectionText from '@ui/SectionText';
import Keyword from '@ui/Keyword';
import Database from '@ui/icons/Database';
import React from '@ui/icons/React';
import Server from '@ui/icons/Server';
import Spreadsheet from '@ui/icons/Spreadsheet';
import TechListItem from './TechListItem';

const technologies = [
  {
    id: 'frontend',
    icon: <React />,
    title: 'Front-end',
    text: 'Experience with React, React testing library and redux toolkit for state management.',
  },
  {
    id: 'backend',
    icon: <Server />,
    title: 'Back-end',
    text: 'Experience with Node.js and PHP/Laravel. I can build fully-tested and scalable web applications.',
  },
  {
    id: 'database',
    icon: <Database />,
    title: 'Database',
    text: 'Experience with MySQL and MongoDB. I can write and optimize complex DB queries',
  },
  {
    id: 'systems',
    icon: <Spreadsheet />,
    title: 'Systems & Data',
    text: 'Experiece in Golang.',
  },
];

interface ITechnologies {}

const Technologies: FC<ITechnologies> = () => (
  <Section>
    <SectionDivider />
    <SectionTitle className="md:pt-10">Technologies</SectionTitle>
    <SectionText className="max-w-4xl">
      As a full-stack developer, I{"'"}ve worked with a range of technologies in
      the web development stack. <Keyword>JavaScript</Keyword> and the ecosystem
      around it is my favourite. But I still enjoy working with{' '}
      <Keyword>PHP</Keyword>, <Keyword>Laravel</Keyword> and{' '}
      <Keyword>Go</Keyword>.
    </SectionText>

    <div className="grid grid-cols-1 gap-10 mt-24 md:grid-cols-2 lg:grid-cols-4">
      {technologies.map(item => (
        <TechListItem
          key={item.id}
          icon={item.icon}
          title={item.title}
          description={item.text}
        />
      ))}
    </div>
  </Section>
);

export default Technologies;
