"use client";

import React, { useState } from "react";

interface FilterSectionProps {
  title: string;
  category: string;
  data: string[];
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, data }) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const handleCheckboxChange = (label: string) => {
    setSelected((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(label)) {
        newSet.delete(label);
      } else {
        newSet.add(label);
      }
      return newSet;
    });
  };

  return (
    <section>
      <h3 className="text-lg font-bold text-gray-200 mb-3 px-2">{title}</h3>
      <div className="space-y-1">
        {data.map((label, index) => (
          <label
            key={index}
            className="flex items-center gap-3 px-3 py-2 text-gray-300 rounded-md cursor-pointer hover:bg-gray-800 transition-colors duration-200"
          >
            <input
              type="checkbox"
              className="w-4 h-4 text-lime-400 bg-gray-700 rounded border-gray-600 focus:ring-lime-500 focus:ring-offset-gray-900"
              checked={selected.has(label)}
              onChange={() => handleCheckboxChange(label)}
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </section>
  );
};

export default FilterSection;
