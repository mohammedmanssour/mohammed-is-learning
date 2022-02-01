import { FC } from 'react';
import Link from 'next/link';

import Section from '@ui/Section';
import GradientText from '@ui/GradientText';
import SectionTitle from '@ui/SectionTitle';
import SectionText from '@ui/SectionText';
import Keyword from '@ui/Keyword';

interface IHero {}

const Hero: FC<IHero> = () => (
  <Section>
    <div className="flex flex-col w-full sm:w-4/5 md:w-full">
      <SectionTitle>
        <GradientText className="leading-relaxed">
          Welcome,
          <br /> I{"'"}m Mohammed!
        </GradientText>
      </SectionTitle>
      <h2 className="pb-3 mb-3 text-xl font-extrabold sm:text-2xl lg:text-3xl md:mb-4 md:pb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
          Senior Software Engineer / Project Lead
        </span>
      </h2>
      <SectionText className="max-w-4xl text-justify">
        I help <Keyword>Individuals</Keyword>, <Keyword>Startups</Keyword> and{' '}
        <Keyword>Companies</Keyword> convert their Business Ideas to{' '}
        <Keyword>Beautiful</Keyword>, <Keyword>Fully Functional</Keyword>,{' '}
        <Keyword>market-ready</Keyword>, Piece of art Softwares that can handle
        Growth
      </SectionText>

      <div className="block mt-12">
        <Link href="mailto:hello@mohammedmanssour.me">
          <a className="relative px-12 py-3 text-lg font-extrabold leading-6 text-white transition duration-150 ease-in-out border border-white rounded-lg shadow sm:text-xl bg-slate-800 hover:bg-slate-700">
            Hire me
            <span className="absolute top-0 right-0 flex w-3 h-3 -mt-1 -mr-1">
              <span className="absolute inline-flex w-full h-full bg-white rounded-full opacity-75 animate-ping"></span>
              <span className="relative inline-flex w-3 h-3 bg-white rounded-full"></span>
            </span>
          </a>
        </Link>
      </div>
    </div>
  </Section>
);

export default Hero;
