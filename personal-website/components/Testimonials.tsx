import { FC } from 'react';

import { Carousel } from '@trendyol-js/react-carousel';

import Link from 'next/link';
import Section from './Section';
import SectionTitle from './SectionTitle';
import SectionText from './SectionText';
import SectionDivider from './SectionDivider';
import Keyword from './Keyword';

interface ITestimonials {}

const testimonials = [
  {
    id: 'bill-jula',
    name: 'Bill Jula',
    title: 'Co-founder of MyOpportunity',
    text: 'Mohammed has done a tremendous job of improving upon our social networking application that connects millions of professionals worldwide. His understanding of both front-end and back-end app development (particularly using Fuse Tools) has helped us improve our user experience and allows us to finally be proud of our user experience.',
  },
  {
    id: 'mahmoud-elawwamy',
    name: 'Mahmoud Elawwamy',
    title: 'CEO at Designify',
    text: 'Mohamed proved himself to be a dependable employee and a hard worker with solid problem solving and technical skills. I was always impressed by Mohamed’s ability to handle and finish whatsoever complex projects I throw at and has never missed a deadline.',
  },
  {
    id: 'moaaz-el-masry',
    name: 'Moaaz El Masry',
    title: 'Scrum Master',
    text: 'Mohamed is vocal about his software ideas, but respects his superiors and enthusiastically tackles every assignment as he is directed. He is friendly, easy to get along with, well-liked by clients and respected by his co-workers.',
  },
  {
    id: 'bassam-h-arays',
    name: 'Bassam H.Arays',
    title: 'Scrum Master',
    text: 'He is professionally sound, hard-working, a devoted and motivated employee whose dedication in taking initiative and contribution for the realization of organizational goals and objectives has proven helpful in the advancement of our establishment repeatedly.',
  },
];

const Testimonials: FC<ITestimonials> = () => {
  return (
    <Section>
      <SectionDivider />
      <SectionTitle className="md:pt-10">Testimonials</SectionTitle>
      <SectionText className="max-w-4xl">
        Don{"'"}t take it from me, here are couple of my happy clients.
      </SectionText>

      <div className="mt-24 timeline">
        <Carousel
          show={1}
          slide={1}
          swiping
          useArrowKeys
          rightArrow={
            <div className="absolute hidden w-20 text-gray-400 transform translate-x-24 cursor-pointer sm:block bottom-5 right-1/2 hover:text-white">
              Next Testimonial
            </div>
          }
          leftArrow={
            <div className="hidden sm:block absolute z-50 w-[87px] text-right text-gray-400 transform -translate-x-28 bottom-5 left-1/2 cursor-pointer hover:text-white">
              Previous Testimonial
            </div>
          }
          className="relative w-full leading-relaxed text-gray-300 rounded-lg shadow bg-dark-700 min-h-[430px]">
          {testimonials.map(item => (
            <div
              key={item.id}
              className="relative p-4 space-y-10 text-xl blockquote sm:p-10 md:p-20">
              <p>{item.text}</p>

              <div className="space-y-2">
                <p className="text-2xl">
                  <Keyword>{item.name}</Keyword>
                </p>
                <p>
                  <Keyword>{item.title}</Keyword>
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </Section>
  );
};

export default Testimonials;
