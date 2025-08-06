"use client"
import React, { useState } from "react";

// Placeholder for FileText icon (replace with your actual icon component, e.g., from react-icons)
const FileText = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

// Placeholder ResourceFilters component
const ResourceFilters = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { value: "all", label: "All" },
    { value: "pdf", label: "PDFs" },
    { value: "youtube", label: "Videos" },
    { value: "mechanics", label: "Mechanics" },
    { value: "quantum", label: "Quantum" },
    { value: "electromagnetism", label: "Electromagnetism" },
    { value: "thermodynamics", label: "Thermodynamics" },
    { value: "modern", label: "Modern Physics" },
    { value: "mathematics", label: "Mathematics" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            activeFilter === filter.value
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

// ResourceCard component
const ResourceCard = ({ resource }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
    <p className="text-sm text-gray-500 mb-2">
      {resource.type === "pdf" ? `PDF • ${resource.pages} pages` : `Video • ${resource.duration}`}
    </p>
    <p className="text-gray-600 mb-4">{resource.description}</p>
    <p className="text-sm text-gray-500 mb-4">By {resource.author}</p>
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
    >
      View Resource
    </a>
  </div>
);

const Resources = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  // Sample data
  const resources = [
    {
      id: 1,
      title: "Classical Mechanics Fundamentals",
      type: "pdf",
      category: "mechanics",
      description: "Comprehensive guide to Newtonian mechanics and motion",
      url: "https://example.com/mechanics.pdf",
      author: "MIT OpenCourseWare",
      pages: 240,
    },
    {
      id: 2,
      title: "Quantum Physics Explained",
      type: "youtube",
      category: "quantum",
      description: "Complete video series on quantum mechanics basics",
      url: "https://youtube.com/playlist?list=example",
      author: "Physics Professor",
      duration: "12 hours",
    },
    {
      id: 3,
      title: "Electromagnetism Theory",
      type: "pdf",
      category: "electromagnetism",
      description: "Maxwell's equations and electromagnetic field theory",
      url: "https://example.com/electromagnetism.pdf",
      author: "Stanford University",
      pages: 180,
    },
    {
      id: 4,
      title: "Thermodynamics & Statistical Mechanics",
      type: "youtube",
      category: "thermodynamics",
      description: "Heat, entropy, and statistical physics playlist",
      url: "https://youtube.com/playlist?list=example2",
      author: "Physics Academy",
      duration: "8 hours",
    },
    {
      id: 5,
      title: "Modern Physics Concepts",
      type: "pdf",
      category: "modern",
      description: "Relativity, particle physics, and cosmology",
      url: "https://example.com/modern-physics.pdf",
      author: "Harvard Physics",
      pages: 320,
    },
    {
      id: 6,
      title: "Mathematical Methods in Physics",
      type: "youtube",
      category: "mathematics",
      description: "Essential math tools for physics students",
      url: "https://youtube.com/playlist?list=example3",
      author: "Math & Physics",
      duration: "15 hours",
    },
  ];

  const filteredResources = resources.filter(
    (resource) =>
      activeFilter === "all" ||
      resource.type === activeFilter ||
      resource.category === activeFilter
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-black text-white py-16 rounded-b-[20px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Free Physics Resources
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Curated collection of free PDFs and video playlists to accelerate
            your physics journey
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ResourceFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No resources found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters to see more resources.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Resources;