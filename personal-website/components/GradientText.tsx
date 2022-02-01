import { FC } from 'react';
import clsx from 'classnames';

interface IGradientText {
  className?: string;
  from?: string;
  to?: string;
}

const GradientText: FC<IGradientText> = ({ className, from, to, children }) => (
  <span
    className={clsx(
      'text-transparent bg-clip-text bg-gradient-to-r',
      className,
      from,
      to
    )}>
    {children}
  </span>
);

GradientText.defaultProps = {
  from: 'from-white',
  to: 'to-gray-300',
};

export default GradientText;
