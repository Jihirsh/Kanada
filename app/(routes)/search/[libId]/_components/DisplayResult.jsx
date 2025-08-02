import React, { useState } from "react";
import {
  LucideImage,
  LucideList,
  LucideSparkles,
  LucideVideo,
} from "lucide-react";
import AnswerDisplay from "./AnswerDisplay";

const tabs = [
  { label: "Answer", icon: LucideSparkles },
  { label: "Images", icon: LucideImage },
  { label: "Videos", icon: LucideVideo },
  { label: "Sources", icon: LucideList, badge: 10 },
];

function DisplayResult({ searchInputRecord }) {
  const [activeTab, setActiveTab] = useState("Answer");

  return (
    <div className="mt-7">
      {/* {searchInputRecord?.searchInput} instead of Response */}
      <h2 className="font-medium text-3xl line-clamp-2 mb-2">Response</h2>
      <div className="flex items-center space-x-6 border-b border-gray-200 pb-2 mt-6">
        {tabs.map(({ label, icon: Icon, badge }) => (
          <button
            key={label}
            onClick={() => setActiveTab(label)}
            className={`flex items-center gap-1 relative text-sm font-medium text-gray-700 hover:text-black ${
              activeTab === label ? "text-black" : ""
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
            {badge && (
              <span className="ml-1 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                {badge}
              </span>
            )}
            {activeTab === label && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black rounded"></span>
            )}
          </button>
        ))}
      </div>

      <div>{activeTab == "Answer" ? <AnswerDisplay /> : null}</div>
    </div>
  );
}

export default DisplayResult;
