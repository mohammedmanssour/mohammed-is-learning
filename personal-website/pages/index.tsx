import { Fragment } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import Hero from '@ui/Hero';
import Technologies from '@ui/Technologies';
import BackgroundAnimation from '@ui/BackgroundAnimation';
import Timeline from '@ui/Timeline';

const Home: NextPage = () => {
  return (
    <div className="space-y-40">
      <Head>
        <title>Home | Mohammed manssour</title>
        <meta name="description" content="Thoughts, stories and ideas." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative clear-both w-full">
        <Hero />
        <BackgroundAnimation />
      </div>
      <Technologies />
      <Timeline />
    </div>
  );
};

export default Home;
