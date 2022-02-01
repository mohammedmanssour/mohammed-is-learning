import { FC } from 'react';
import clsx from 'classnames';

interface ISectionTitle {
  className?: string;
}

const SectionTitle: FC<ISectionTitle> = ({ className, children }) => (
  <h1
    className={clsx(
      'pt-10 mb-3 text-3xl font-extrabold sm:text-4xl  md:mb-1 md:pt-14 md:pb-4',
      className
    )}>
    {children}
  </h1>
);

export default SectionTitle;
