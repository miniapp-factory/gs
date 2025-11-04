"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share } from "@/components/share";
import { url, title } from "@/lib/metadata";

type Question = {
  text: string;
  options: { label: string; princess: string }[];
};

const questions: Question[] = [
  {
    text: "What is your favorite color?",
    options: [
      { label: "Red", princess: "Jasmine" },
      { label: "Blue", princess: "Aurora" },
      { label: "Pink", princess: "Anna" },
    ],
  },
  {
    text: "Which animal do you feel most connected to?",
    options: [
      { label: "Lion", princess: "Jasmine" },
      { label: "Horse", princess: "Belle" },
      { label: "Bear", princess: "Anna" },
    ],
  },
  {
    text: "What is your ideal vacation?",
    options: [
      { label: "Beach", princess: "Jasmine" },
      { label: "Mountains", princess: "Aurora" },
      { label: "Forest", princess: "Cinderella" },
    ],
  },
  {
    text: "Which trait describes you best?",
    options: [
      { label: "Kindness", princess: "Cinderella" },
      { label: "Bravery", princess: "Aurora" },
      { label: "Curiosity", princess: "Belle" },
    ],
  },
  {
    text: "What is your favorite dessert?",
    options: [
      { label: "Cake", princess: "Cinderella" },
      { label: "Ice Cream", princess: "Jasmine" },
      { label: "Pudding", princess: "Aurora" },
    ],
  },
];

export function Quiz() {
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [result, setResult] = useState<string | null>(null);

  const handleSelect = (qIndex: number, princess: string) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = princess;
    setAnswers(newAnswers);
  };

  const calculateResult = () => {
    const counts: Record<string, number> = {};
    answers.forEach((p) => {
      if (p) counts[p] = (counts[p] || 0) + 1;
    });
    const winner = Object.entries(counts).reduce(
      (a, b) => (b[1] > a[1] ? b : a),
      ["", 0]
    )[0];
    setResult(winner || "No clear winner");
  };

  return (
    <div className="w-full max-w-md space-y-6">
      {questions.map((q, idx) => (
        <div key={idx} className="space-y-2">
          <h3 className="font-semibold">{q.text}</h3>
          <div className="flex flex-col space-y-1">
            {q.options.map((opt) => (
              <Button
                key={opt.label}
                variant={answers[idx] === opt.princess ? "secondary" : "outline"}
                onClick={() => handleSelect(idx, opt.princess)}
                className="justify-start"
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>
      ))}
      <Button onClick={calculateResult} disabled={answers.includes("")}>
        Submit
      </Button>
      {result && (
        <div className="mt-4 space-y-2">
          <h4 className="font-medium">Your Disney Princess: {result}</h4>
          <Share
            text={`${title} - ${result}`}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}
