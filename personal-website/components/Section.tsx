import { FC } from 'react';
import clsx from 'classnames';

interface ISection {
  className?: string;
}

const Section: FC<ISection> = ({ children }) => (
  <section
    className={clsx(
      'relative flex flex-col px-4 pt-4 sm:pt-6 md:pt-8',
      children
    )}>
    {children}
  </section>
);

export default Section;
