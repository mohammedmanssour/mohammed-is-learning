import { FC, Fragment } from 'react';
import Head from 'next/head';
import Keyword from '@ui/Keyword';
import Section from '@ui/Section';
import SectionText from '@ui/SectionText';

import Technologies from '@ui/Technologies';
import Timeline from '@ui/Timeline';

interface IAbout {}

const About: FC<IAbout> = () => (
  <Fragment>
    <Head>
      <title>About | Mohammed Manssour</title>
    </Head>
    <div className="py-16 my-10 text-4xl font-bold text-center border-t border-b border-gray-700">
      About Me
    </div>
    <div className="space-y-20">
      <Section>
        <SectionText className="mb-20 text-2xl">
          <span className="text-white">
            I am a full-stack web developer with +8 years of experience in the
            field. I love to turn great ideas into timeless experiences. I am
            passionate about gaming and definitely passionate about backend
            engineering.
          </span>
        </SectionText>
        <div className="space-y-5 xl:columns-2">
          <SectionText>
            I’ve been in the field of Web Development for more than 8 years. In
            2012 ,I started coding websites using <Keyword>HTML</Keyword> and{' '}
            <Keyword>CSS</Keyword>, but I am used to never let my skills go old,
            so I kept working on’em until I became a
            <Keyword>professional frontend developer</Keyword> in 2013 with good
            experience in <Keyword>Angular 1</Keyword> and{' '}
            <Keyword>jQuery</Keyword>.
          </SectionText>
          <SectionText>
            In 2013 I decided to go deeper in the world of Web development, so I
            started working on my <Keyword>WordPress</Keyword> skills and became
            a <Keyword>WordPress expert</Keyword> who knows when and how to push
            it to the limits and when not to use it at all. I have Once{' '}
            <Keyword>scaled a WordPress site</Keyword> with{' '}
            <Keyword>Elastic Search, Redis</Keyword>, multiple replicas of MySQL
            server and Multiple instances of PHP servers.
          </SectionText>
          <SectionText>
            In 2015 I got a new job and started to gain experience in
            Enterprise-level programming. I was the main developer of the team
            that was responsible to build cloud ERP with{' '}
            <Keyword>Yii 2.0</Keyword>, at that time my goal was to design a
            quality code that was supposed to solve complex problems, but with
            concentrating on performance.
          </SectionText>
          <SectionText>
            In late 2015, I designed a real-time tracking system (as my
            graduation project) with <Keyword>Node.js</Keyword> on the server
            side, in addition to <Keyword>Native Java</Keyword>
            with Android APIs to build a native android application. I also used
            <Keyword>Objective-C</Keyword> to build a native iOS application and
            accordingly I graduated with a{' '}
            <Keyword>bachelor’s degree in computer engineering</Keyword>.
          </SectionText>
          <SectionText>
            As I said before I never let my skills go old, since my graduation I
            kept pushing my skills forward and continued learning, I gained some
            new skills like{' '}
            <Keyword>Test Driven Development, Domain Driven Design</Keyword> and
            <Keyword>
              Setting up and maintaining fully automated and unified development
              environments using multiple platforms like Docker
            </Keyword>{' '}
            as an example.
          </SectionText>
          <SectionText>
            I’m currently doing my{' '}
            <Keyword>Master’s degree in Web Science</Keyword>, in which I use{' '}
            <Keyword>Golang</Keyword> to do my Master’s related projects and to
            achieve the goal of my research which is about{' '}
            <Keyword>
              Using Machine Learning algorithms in the context of Web
              Engineering
            </Keyword>
            .
          </SectionText>
        </div>
      </Section>
      <Timeline description={null} title="Work Experience" />
      <Technologies />
      <div className="flex items-center justify-center h-32 text-xl border-t border-gray-700">
        <Keyword>Crafted with love</Keyword>
      </div>
    </div>
  </Fragment>
);

export default About;
