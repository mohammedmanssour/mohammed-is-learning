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
    <div className="sm:w-4/5 md:w-full flex flex-col w-full">
      <SectionTitle>
        <GradientText className="leading-relaxed">
          Welcome,
          <br /> I{"'"}m Mohammed!
        </GradientText>
      </SectionTitle>
      <h2 className="sm:text-2xl lg:text-3xl md:mb-4 md:pb-4 pb-3 mb-3 text-xl font-extrabold">
        <span className="bg-clip-text bg-gradient-to-r from-white to-gray-300 text-transparent">
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

      <div className="sm:flex-row sm:space-y-0 sm:space-x-10 flex flex-col items-center mt-12 space-y-10">
        <Link href="mailto:hello@mohammedmanssour.me">
          <a className="sm:text-xl bg-slate-800 hover:bg-slate-700 relative px-12 py-3 text-lg font-extrabold leading-6 text-white transition duration-150 ease-in-out border border-white rounded-lg shadow">
            Hire me
            <span className="absolute top-0 right-0 flex w-3 h-3 -mt-1 -mr-1">
              <span className="animate-ping absolute inline-flex w-full h-full bg-white rounded-full opacity-75"></span>
              <span className="relative inline-flex w-3 h-3 bg-white rounded-full"></span>
            </span>
          </a>
        </Link>
        <Link href="https://mohammedmanssour.me/cv.pdf">
          <a
            target="_blank"
            className="sm:text-xl px-12 py-3 text-lg font-extrabold leading-6 text-white transition duration-150 ease-in-out border border-white rounded-lg shadow">
            Checkout my cv
          </a>
        </Link>
      </div>
    </div>
  </Section>
);

export default Hero;
