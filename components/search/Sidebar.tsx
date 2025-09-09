"use client";

import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import FilterSection from "./FilterSection";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  masterData: { [key: string]: string[] };
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, masterData }) => {
  return (
    <aside
      className={`fixed top-0 left-0 w-72 h-screen bg-black/80 backdrop-blur-sm text-white transform transition-transform duration-300 z-[1000] no-scrollbar ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 shadow-xl">
        <h2 className="text-xl font-bold text-sky-400">Filter</h2>
        <button
          className="text-gray-400 hover:text-white hover:scale-110 transition-transform duration-200"
          aria-label="Close sidebar"
          type="button"
          onClick={onClose}
        >
          <IoCloseOutline size={28} />
        </button>
      </div>
      <div className="p-4 overflow-y-auto h-[calc(100vh-65px)] no-scrollbar">
        <div className="space-y-6">
          <FilterSection
            title="플랫폼별"
            category="platforms"
            data={masterData.platforms}
          />
          <FilterSection
            title="장르별"
            category="genres"
            data={masterData.genres}
          />
          <FilterSection
            title="평점별"
            category="ratings"
            data={masterData.ratings}
          />
          <FilterSection
            title="년도별"
            category="years"
            data={masterData.years}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
