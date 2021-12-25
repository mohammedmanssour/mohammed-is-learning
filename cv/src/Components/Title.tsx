import React from "react";

const Title: React.FC = ({ children }) => (
  <h2 className="font-bold text-white p-1 bg-gray-900 inline text-lg">
    {children}
  </h2>
);

export default Title;
