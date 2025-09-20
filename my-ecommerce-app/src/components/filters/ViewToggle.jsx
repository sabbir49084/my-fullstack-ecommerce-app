import React from "react";
import { Grid3X3, LayoutGrid, List } from "lucide-react";

const ViewToggle = ({ view, setView }) => {
  return (
    <div className="flex space-x-2">
      <button onClick={() => setView("grid")}><LayoutGrid size={20} /></button>
      <button onClick={() => setView("three")}><Grid3X3 size={20} /></button>
      <button onClick={() => setView("four")}><List size={20} /></button>
    </div>
  );
};

export default ViewToggle;
