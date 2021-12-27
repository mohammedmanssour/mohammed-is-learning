import List from "./Components/List";
import Title from "./Components/Title";
import WorkExperience from "./Components/WorkExperience";

import { workExperience } from "./data";

function App() {
  return (
    <div className="container p-5 mx-auto space-y-5 font-sans">
      <header className="flex flex-col pb-3 border-b border-gray-300 sm:flex-row print:flex-row">
        <div className="w-full space-y-2">
          <h1 className="text-3xl font-medium print:text-2xl">
            Mohammed Manssour
          </h1>
          <p className="text-gray-700 print:text-sm">
            Senior Software Engineer
          </p>
        </div>
        <aside className="w-full space-y-1 text-sm text-gray-700 print:space-y-0">
          <p>
            <strong className="font-medium">(+971)</strong> 0505144752
          </p>
          <p>hello@mohammedmanssour.me</p>
          <p>https://mohammedmanssour.me</p>
        </aside>
      </header>
      <div className="flex flex-col space-y-10 md:space-y-0 md:flex-row md:space-x-10 print:space-y-0 print:flex-row print:space-x-10">
        <div className="w-full space-y-10">
          <div className="space-y-4">
            <Title>Objectives</Title>
            <p className="text-justify text-gray-700 md:text-sm print:text-sm">
              Logical and results-driven Full-Stack Developer with +7 years of
              experience in the field of Web Engineering, dedicated to building
              and optimizing data-driven, user-focused applications with various
              business objectives. Technically proficient and problem solver
              with calm and focused demeanor.
            </p>
          </div>
          <div className="space-y-4">
            <Title>Tech</Title>
            <List>
              <li>
                <strong className="font-medium">Database:</strong> MySQL and
                MongoDB. Able to optimize complicated SQL Queries.
              </li>
              <li>
                <strong className="font-medium">Golang</strong>
              </li>
              <li>
                <strong className="font-medium">JS:</strong> vanilla JavaScript,
                Node.js, React.js and TypeScript.
              </li>
              <li>
                <strong className="font-medium">PHP:</strong> vanilla PHP,
                Laravel, and CakePHP.
              </li>
              <li>
                <strong className="font-medium">Elasticsearch</strong>
              </li>
              <li>
                <strong className="font-medium">Automated Testing:</strong>{" "}
                proficient with the TDD approach
              </li>
              <li>
                <strong className="font-medium">DevOps:</strong> Docker and
                Kubernetes
              </li>
            </List>
          </div>

          <div className="space-y-4">
            <Title>Education</Title>
            <div>
              <h3 className="text-xl font-medium">Damascus Unitversity</h3>
              <p className="text-gray-700">
                Bachelor of Engineering in Computer Engineering
              </p>
            </div>
          </div>
        </div>
        <div className="w-full space-y-4">
          <Title>Work Experience</Title>
          {workExperience.map((item) => (
            <WorkExperience key={item.company} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
