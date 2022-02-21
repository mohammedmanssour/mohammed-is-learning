import React, { ReactNode } from "react";
import List from "./List";

interface IWorkExperience {
  title: string;
  company: string;
  start: string;
  end: string;
  responsibilities: ReactNode[];
}

const WorkExperience: React.FC<IWorkExperience> = ({
  title,
  company,
  start,
  end,
  responsibilities,
}) => (
  <section>
    <div className="flex items-center space-x-2">
      <h3 className="font-medium">
        {title} <span className="font-normal">@</span> {company}
      </h3>
    </div>
    <div className="space-x-2 text-sm text-gray-600">
      <span>{start}</span>
      <span>-</span>
      <span>{end}</span>
    </div>
    <List>
      {responsibilities.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </List>
  </section>
);

export default WorkExperience;
