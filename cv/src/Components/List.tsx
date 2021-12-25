import React from "react";

const List: React.FC = ({ children }) => (
  <ul className="mt-2 text-gray-700 space-y-1 list-disc pl-5 md:text-sm print:text-sm">
    {children}
  </ul>
);

export default List;
