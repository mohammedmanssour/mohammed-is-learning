import { FC } from 'react';
import clsx from 'classnames';

interface IKeyword {
  className?: string;
}

const Keyword: FC<IKeyword> = ({ className, children }) => (
  <span className={clsx('text-white font-extrabold', className)}>
    {children}
  </span>
);

export default Keyword;
