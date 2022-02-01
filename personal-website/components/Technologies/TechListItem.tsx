import { FC, ReactNode } from 'react';

interface ITechListItem {
  icon: ReactNode;
  title: string;
  description: string;
}

const TechListItem: FC<ITechListItem> = ({ icon, title, description }) => (
  <div className="flex flex-col justify-start w-full space-y-3">
    <span className="w-10 h-10">{icon}</span>
    <h3 className="text-2xl font-extrabold">{title}</h3>
    <p className="text-lg leading-relaxed">{description}</p>
  </div>
);

export default TechListItem;
