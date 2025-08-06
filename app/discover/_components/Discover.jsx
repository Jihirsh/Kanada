import { Atom, Calculator, Eye, Telescope, Waves, Zap } from "lucide-react";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

function Discover() {
  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-white">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Master Physics</h1>
      <p className="text-center text-gray-600 mb-8 max-w-2xl">
        Explore the fundamental laws that govern our universe. From quantum
        mechanics to classical physics, build a deep understanding through
        structured learning paths and interactive content.
      </p>
      <div>
        <Button className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
          Start Learning
        </Button>
        <Button className="bg-white border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-gray-400 hover:text-gray-900 transition-colors">
          Explore Resources
        </Button>
      </div>

      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Discover Physics
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose your learning path and dive deep into the fascinating world of
          physics. Each course is carefully structured to build your
          understanding progressively.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <Card
            key={course.id}
            className={`bg-gradient-to-b ${course.color} text-white rounded-lg shadow-lg overflow-hidden`}
          >
            <CardHeader className="p-4">
              <course.icon className="w-6 h-6 mb-2" />
              <CardTitle className="text-lg font-semibold">
                {course.title}
              </CardTitle>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  course.difficulty === "Advanced"
                    ? "bg-red-500"
                    : course.difficulty === "Intermediate"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                } text-white`}
              >
                {course.difficulty}
              </span>
            </CardHeader>
            <CardContent className="p-4 text-gray-200">
              <CardDescription>{course.description}</CardDescription>
              <p className="mt-2 text-sm">
                <span>Lessons: {course.lessons}</span> |{" "}
                <span>Projects: {course.projects}</span>
              </p>
            </CardContent>
            <CardFooter className="p-4">
              <button className="w-full px-4 py-2 bg-black text-white rounded-lg">
                Start Course
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Discover;
