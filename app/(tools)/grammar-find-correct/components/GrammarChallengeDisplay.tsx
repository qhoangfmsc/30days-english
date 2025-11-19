"use client";

import type { GrammarChallenge } from "../common/type";

import { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";
import { Icon } from "@iconify/react";

interface GrammarChallengeDisplayProps {
  challenge: GrammarChallenge;
}

export const GrammarChallengeDisplay = ({
  challenge,
}: GrammarChallengeDisplayProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSelectAnswer = (label: string) => {
    setSelectedAnswer(label);
    setShowExplanation(true);
  };

  const isCorrect = selectedAnswer === challenge.correctAnswer;

  return (
    <div className="flex flex-col gap-6">
      <Card className="bg-gradient-to-br from-primary-50 via-purple-50 to-secondary-50 border-none shadow-xl">
        <CardBody className="p-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full">
                <Icon
                  className="w-6 h-6 text-white"
                  icon="heroicons:clipboard-document-check"
                />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600 bg-clip-text text-transparent">
                Tìm câu đúng
              </h2>
            </div>

            <p className="text-default-600 text-sm">
              Chọn câu có ngữ pháp đúng trong các câu sau:
            </p>

            <div className="flex flex-col gap-4 mt-4">
              {challenge.options.map((option) => {
                const isSelected = selectedAnswer === option.label;
                const isCorrectOption =
                  option.label === challenge.correctAnswer;
                const showAsCorrect =
                  showExplanation && isCorrectOption && !isSelected;

                return (
                  <Button
                    key={option.label}
                    className={`w-full justify-start text-left h-auto py-4 px-6 transition-all whitespace-pre-line ${
                      isSelected
                        ? isCorrectOption
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                          : "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg"
                        : showAsCorrect
                          ? "bg-gradient-to-r from-green-400 to-emerald-400 text-white shadow-lg border-2 border-green-300"
                          : "bg-white hover:bg-default-100 border-2 border-default-200"
                    }`}
                    isDisabled={showExplanation}
                    variant={isSelected || showAsCorrect ? "solid" : "bordered"}
                    onPress={() => handleSelectAnswer(option.label)}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          isSelected || showAsCorrect
                            ? "bg-white/20 text-white"
                            : "bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700"
                        }`}
                      >
                        {option.label.toUpperCase()}
                      </div>
                      <p className="flex-1 text-base">{option.sentence}</p>
                      {(isSelected && isCorrectOption) || showAsCorrect ? (
                        <Icon
                          className="w-6 h-6 text-white flex-shrink-0"
                          icon="heroicons:check-circle"
                        />
                      ) : isSelected && !isCorrectOption ? (
                        <Icon
                          className="w-6 h-6 text-white flex-shrink-0"
                          icon="heroicons:x-circle"
                        />
                      ) : null}
                    </div>
                  </Button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="flex flex-col gap-4 mt-6">
                <Alert
                  color={isCorrect ? "success" : "danger"}
                  title={isCorrect ? "Chính xác! 🎉" : "Sai rồi! 😔"}
                  variant="flat"
                >
                  <div className="mt-2">
                    <p className="font-semibold mb-2">Giải thích:</p>
                    <p className="text-sm whitespace-pre-line">
                      {challenge.explanation}
                    </p>
                  </div>
                </Alert>

                {challenge.grammars && challenge.grammars.length > 0 && (
                  <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-none">
                    <CardBody className="p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Icon
                          className="w-5 h-5 text-primary-600"
                          icon="heroicons:academic-cap"
                        />
                        <p className="font-semibold text-primary-700">
                          Cấu trúc ngữ pháp trong câu:
                        </p>
                      </div>
                      <div className="flex flex-col gap-3">
                        {challenge.grammars.map((grammar, index) => (
                          <div
                            key={index}
                            className="p-3 bg-white rounded-lg border border-primary-200 shadow-sm"
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white text-xs font-bold">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <p className="font-mono text-sm font-semibold text-primary-700 mb-1">
                                  {grammar.structure}
                                </p>
                                <p className="text-sm text-default-600">
                                  {grammar.explanation}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                )}
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
