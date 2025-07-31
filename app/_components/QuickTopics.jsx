import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Atom, Zap, Telescope, Wrench } from "lucide-react";

function QuickTopics() {
  const quickTopics = [
    {
      name: "Quantum Mechanics",
      icon: Atom,
      description: "Explore the quantum world",
    },
    {
      name: "Classical Physics",
      icon: Wrench,
      description: "Newton's laws and more",
    },
    {
      name: "Electromagnetism",
      icon: Zap,
      description: "Electric and magnetic fields",
    },
    {
      name: "Astrophysics",
      icon: Telescope,
      description: "Explore the cosmos",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 opacity-80">Quick Topics</h2>
      <div className="flex justify-around w-full max-w-4xl gap-5">
        {quickTopics.map((topic) => (
          <Card
            key={topic.name}
            className="w-1/4 p-2 flex items-center justify-center"
          >
            <CardContent className="flex flex-col items-center text-center p-2">
              <div className="p-2 text-primary">
                <topic.icon />
              </div>
              <CardTitle className="p-2">{topic.name}</CardTitle>
              <CardDescription>{topic.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="p-5 text-shadow-3xs opacity-60">Start by typing a question above or click on any topic</p>
    </div>
  );
}

export default QuickTopics;
