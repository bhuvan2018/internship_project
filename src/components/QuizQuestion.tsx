import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

interface QuizQuestionProps {
  question: string;
  options: string[];
  correctAnswer: string;
  onAnswer: (isCorrect: boolean) => void;
}

export const QuizQuestion = ({
  question,
  options,
  correctAnswer,
  onAnswer,
}: QuizQuestionProps) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const { toast } = useToast();

  // Reset states when the question changes
  useEffect(() => {
    setTimeLeft(30);
    setSelectedAnswer(null);
  }, [question]);

  useEffect(() => {
    if (timeLeft <= 0) {
      toast({
        title: "Time's up!",
        description: "Moving to the next question",
        variant: "destructive",
      });
      onAnswer(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onAnswer, toast]);

  const handleAnswer = (option: string) => {
    setSelectedAnswer(option);
    const isCorrect = option === correctAnswer;
    onAnswer(isCorrect);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto animate-fadeIn">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{question}</CardTitle>
          <span className="text-lg font-semibold">{timeLeft}s</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {options.map((option) => (
            <Button
              key={option}
              onClick={() => handleAnswer(option)}
              variant={selectedAnswer === option ? "secondary" : "outline"}
              className="w-full text-left justify-start h-auto py-4 px-6"
              disabled={selectedAnswer !== null}
            >
              {option}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
