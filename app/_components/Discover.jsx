import { Atom, Calculator, Eye, Telescope, Waves, Zap } from "lucide-react";
import React from "react";

const courses = [
  {
    id: "quantum-physics",
    title: "Quantum Physics",
    description:
      "Dive into the mysterious world of quantum mechanics, wave-particle duality, and quantum field theory.",
    lessons: 28,
    projects: 6,
    icon: Atom,
    difficulty: "Advanced",
    color: "from-gray-900 to-gray-700",
  },
  {
    id: "classical-mechanics",
    title: "Classical Mechanics",
    description:
      "Master Newton's laws, energy conservation, rotational dynamics, and oscillations.",
    lessons: 24,
    projects: 8,
    icon: Calculator,
    difficulty: "Beginner",
    color: "from-gray-800 to-gray-600",
  },
  {
    id: "electromagnetism",
    title: "Electromagnetism",
    description:
      "Explore electric and magnetic fields, Maxwell's equations, and electromagnetic radiation.",
    lessons: 26,
    projects: 7,
    icon: Zap,
    difficulty: "Intermediate",
    color: "from-gray-700 to-gray-500",
  },
  {
    id: "thermodynamics",
    title: "Thermodynamics",
    description:
      "Understand heat, energy transfer, entropy, and the fundamental laws of thermodynamics.",
    lessons: 22,
    projects: 5,
    icon: Waves,
    difficulty: "Beginner",
    color: "from-gray-600 to-gray-400",
  },
  {
    id: "astrophysics",
    title: "Astrophysics",
    description:
      "Journey through space and time, studying stars, galaxies, and cosmic phenomena.",
    lessons: 30,
    projects: 9,
    icon: Telescope,
    difficulty: "Advanced",
    color: "from-gray-900 to-gray-700",
  },
  {
    id: "optics",
    title: "Optics & Waves",
    description:
      "Discover the properties of light, wave interference, and optical phenomena.",
    lessons: 20,
    projects: 4,
    icon: Eye,
    difficulty: "Beginner",
    color: "from-gray-500 to-gray-300",
  },
];

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "Beginner":
      return "text-green-600 bg-green-100";
    case "Intermediate":
      return "text-yellow-600 bg-yellow-100";
    case "Advanced":
      return "text-red-600 bg-red-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

const CourseCard = ({ course }) => {
  const {
    title,
    description,
    lessons,
    projects,
    icon: Icon,
    difficulty,
    color,
  } = course;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 group max-w-md">
      {/* Header with gradient background */}
      <div
        className={`bg-gradient-to-r ${color} p-6 text-white relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 w-20 h-20 opacity-20">
          <Icon className="w-full h-full" />
        </div>
        <div className="relative z-10">
          <Icon className="w-8 h-8 mb-3" />
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
              difficulty
            )}`}
          >
            {difficulty}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            {lessons} Lessons
          </span>
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
            {projects} Projects
          </span>
        </div>

        <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-black transition-colors group-hover:bg-black">
          Start Course
        </button>
      </div>
    </div>
  );
};

function Discover() {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 mt-20">
        Master Physics
      </h1>
      <p className="text-xl text-center text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
        Explore the fundamental laws that govern our universe. From quantum
        mechanics to classical physics, build a deep understanding through
        structured learning paths and interactive content.
      </p>
      <div className="flex justify-center gap-4 mb-8">
        <button className="px-8 py-4 font-semibold bg-black text-white rounded-lg">
          Start Learning
        </button>
        <button className="border-2 border-gray-300 px-8 py-4 font-semibold bg-gray-100 text-gray-600 rounded-lg">
          Explore Resources
        </button>
      </div>

      <div className="flex flex-col items-center justify-center mt-25">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Discover Physics
        </h2>
        <p className="text-lg text-center text-gray-600 max-w-2xl mb-10">
          Choose your learning path and dive deep into the fascinating world of
          physics. Each course is carefully structured to build your
          understanding progressively.
        </p>
      </div>

      <div className="max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-15">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Discover;
