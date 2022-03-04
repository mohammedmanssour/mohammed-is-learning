import { FC } from 'react';
import clsx from 'classnames';

interface ISectionText {
  className?: string;
}

const SectionText: FC<ISectionText> = ({ className, children }) => (
  <p className={clsx('leading-loose text-xl text-gray-300', className)}>
    {children}
  </p>
);

export default SectionText;
