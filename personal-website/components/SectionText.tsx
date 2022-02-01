import { FC } from 'react';
import clsx from 'classnames';

interface ISectionText {
  className?: string;
}

const SectionText: FC<ISectionText> = ({ className, children }) => (
  <p className={clsx('leading-relaxed text-xl text-gray-400', className)}>
    {children}
  </p>
);

export default SectionText;
