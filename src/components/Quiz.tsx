"use client";

import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CompleteButton from "./CompleteButton";
import Confetti from "react-confetti";

type Question = {
  question: string;
  options: string[];
  answer: number; // Index of the correct answer
};

const quizQuestions: Question[] = [
  {
    question: "Bike gani kati ya hizi ni aina ya electric?",
    options: ["TVS", "Roam", "Captain", "Boxer", "Skygo"],
    answer: 1, // b. Roam
  },
  {
    question: "Bike gani imeweza kutoa filter ili kurefusha maisha ya engine?",
    options: ["Ranger", "Honda", "TVS", "Boxer", "Captain"],
    answer: 3, // d. Boxer
  },
  {
    question:
      "Ni kampuni gani kati ya hizi inatengeneza helmet hapa nchini Kenya?",
    options: [
      "Nairobi safety shop",
      "Helmets Kenya",
      "Bodaplus",
      "Safety hub enterprises",
      "Bike Suppliers",
    ],
    answer: 2, // c. Bodaplus
  },
  {
    question: "Bike za electric zinaweza kubadilisha battery kwa vituo vya",
    options: ["Shell", "Stima boda", "Kenya Power", "Boda power", "Total"],
    answer: 1, // b. Stima boda
  },
  {
    question: "Ni oil gani kati ya hizi inatumika kwa boda",
    options: [
      "V power",
      "Shell Helix",
      "Total excellium",
      "Total Hi Perf",
      "Rubis Ultra tec",
    ],
    answer: 3, // d. Total Hi Perf
  },
];

const Quiz = () => {
  const router = useRouter();
  const [Btn, setBtn] = useState(false);
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const detectSize = () => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => window.removeEventListener("resize", detectSize);
  }, []);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>(
    Array(quizQuestions.length).fill(-1)
  );
  const [score, setScore] = useState<number | null>(null); // State to hold the score

  const handleOptionClick = (optionIndex: number) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let calculatedScore = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === quizQuestions[index].answer) {
        calculatedScore += 2; // 2 points per correct answer
      }
    });
    setScore(calculatedScore); // Set the calculated score
  };

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    calculateScore(); // Calculate score on completion
  };

  return (
    <div className="p-6 border rounded-bl-xl rounded-br-xl shadow-sm bg-white">
      {/* Instructions Section */}
      <div className="mb-6">
        <h2 className="font-semibold text-lg">
          Sheria za Maswali au Chemsha Bongo
        </h2>
        <div className="text-xs text-gray-600 space-y-2">
          <p>
            1. <strong>Wanaoruhusiwa kushiriki:</strong> Maswali yako wazi kwa
            washiriki wote waliosajiliwa kwenye app. Washiriki lazima wawe na
            akaunti halali ya BodaHub.
          </p>
          <p>
            2. <strong>Unaweza kujaribu mara ngapi:</strong> Kila mtu
            anaruhusiwa jaribio moja kwa kila Chemsha Bongo au mtihani. Baada ya
            kuwasilisha majibu yako, hayawezi kubadilishwa.
          </p>
          <p>
            3. <strong>Muda wa kujibu:</strong> Mtihani lazima ukamilishwe ndani
            ya dakika 10. Baada ya muda kuisha, majibu yatatumwa hata kama
            haujamaliza.
          </p>
          <p>
            4. <strong>Points au Alama:</strong> Kila jibu sahihi litapewa alama
            2. Hakuna alama zitakazoondolewa kwa majibu yasiyo sahihi.
          </p>
          <p>
            5. <strong>Uwasilishaji:</strong> Hakikisha umewasilisha majibu yako
            kabla ya muda kuisha. Majibu yaliyochelewa hayatakubaliwa.
          </p>
          <p>
            6. <strong>Udanganyifu:</strong> Udanganyifu umepigwa marufuku
            kabisa. Ikiwa utagunduliwa, utapigwa marufuku kushiriki katika
            mitihani ya baadaye.
          </p>
          <p>
            7. <strong>Matokeo na Maoni:</strong> Matokeo ya mtihani
            yatapatikana mara tu baada ya kuwasilisha, yakionyesha alama zako na
            majibu sahihi.
          </p>
          <p>
            9. <strong>Zawadi:</strong> Alama zitakusaidia kushiriki kwenye
            mashindano yanayoambatana na zawadi.
          </p>
        </div>
      </div>

      {/* Quiz Questions */}
      {score === null ? (
        <>
          <div className="space-y-6">
            <p className="font-bold text-wrap text-xl">
              {quizQuestions[currentQuestionIndex].question}
            </p>
            <RadioGroup
              defaultValue={userAnswers[currentQuestionIndex]?.toString() || ""}
              onValueChange={(value) => handleOptionClick(Number(value))}
            >
              {quizQuestions[currentQuestionIndex].options.map(
                (option, optionIndex) => (
                  <div
                    className="flex items-center space-x-2"
                    key={optionIndex}
                  >
                    <RadioGroupItem
                      value={optionIndex.toString()}
                      id={`option-${optionIndex}`}
                      checked={
                        userAnswers[currentQuestionIndex] === optionIndex
                      }
                    />
                    <Label htmlFor={`option-${optionIndex}`}>{option}</Label>
                  </div>
                )
              )}
            </RadioGroup>
          </div>

          <div className="flex flex-row gap-8 mt-8">
            <Button
              className="bg-bhgreen w-full"
              disabled={currentQuestionIndex === 0}
              onClick={handlePrevious}
            >
              Previous
            </Button>

            {currentQuestionIndex < quizQuestions.length - 1 ? (
              <Button className="bg-bhgreen w-full" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <>
                <Button
                  className="bg-bhgreen full"
                  onClick={(e) => {
                    setBtn(!Btn);
                    handleComplete(e);
                  }}
                >
                  Complete
                </Button>
                {Btn && (
                  <Confetti
                    width={windowDimension.width}
                    height={windowDimension.height}
                    tweenDuration={1000}
                  />
                )}
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="text-center ">
              <h2 className="text-2xl font-bold">Quiz Complete!</h2>
              <p className="mt-4 font-bold text-xl">Your score:</p>
              <h1>
                {score} / {quizQuestions.length * 2}
              </h1>
            </div>
            <CompleteButton onComplete={() => handleComplete} />
            <Button
              onClick={() => router.push("/tasks")}
              className="w-full bg-bhgreen mt-6"
            >
              Return to Tasks
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
