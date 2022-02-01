import { FC, useEffect, useRef, useState } from 'react';

import { Carousel, ScrollingCarousel } from '@trendyol-js/react-carousel';

import Link from 'next/link';
import Section from './Section';
import SectionTitle from './SectionTitle';
import SectionText from './SectionText';
import SectionDivider from './SectionDivider';
import Keyword from './Keyword';
import GradientText from './GradientText';

interface ITimeline {}

const timeline = [
  {
    year: '2021',
    text: 'Promoted to Project Lead @ MobyMax',
  },
  {
    year: '2019',
    text: 'Senior Software engineer @ MobyMax',
  },
  {
    year: '2017',
    text: 'Senior software engineer @ MyOpportunity',
  },
  {
    year: '2015',
    text: 'Started my journey as a Freelancer',
  },
  {
    year: '2013',
    text: 'Started my journey as a Software Engineer @ Bereeq soft',
  },
];

const Timeline: FC<ITimeline> = () => {
  return (
    <Section>
      <SectionDivider />
      <SectionTitle className="md:pt-10">About Me</SectionTitle>
      <SectionText className="max-w-4xl">
        I{"'"}ve been working as a software engineers since{' '}
        <Keyword>2013</Keyword>, supported with a big passion and a{' '}
        <Keyword>Computer Engineering background</Keyword>.{' '}
        <Link href="/about">
          <a className="text-sky-500 hover:underline hover:text-white">
            Read more.
          </a>
        </Link>
      </SectionText>

      <div className="mt-24 timeline">
        <ScrollingCarousel>
          {timeline.map(item => (
            <div key={item.year} className="relative pr-10 w-80">
              <div className="relative z-50 inline-block w-auto pr-5 bg-dark-800">
                <GradientText className="text-2xl font-extrabold">
                  {item.year}
                </GradientText>
              </div>
              <SectionDivider
                from="from-white"
                to="to-dark-800 h-0.5"
                className="absolute left-0 z-10 sm:w-10/12 top-4"
              />
              <p className="mt-5 text-lg text-gray-300">{item.text}</p>
            </div>
          ))}
        </ScrollingCarousel>
      </div>
    </Section>
  );
};

export default Timeline;
