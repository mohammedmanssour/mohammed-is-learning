import { FC } from 'react';
import clsx from 'classnames';

interface ISectionDivider {
  className?: string;
  from?: string;
  to?: string;
}

const SectionDivider: FC<ISectionDivider> = ({ from, to, className }) => (
  <div
    className={clsx(
      'w-96 h-1 block bg-sky-500 bg-gradient-to-r rounded-sm',
      from,
      to,
      className
    )}
  />
);

SectionDivider.defaultProps = {
  from: 'from-purple-500',
  to: 'to-pink-500',
};

export default SectionDivider;
