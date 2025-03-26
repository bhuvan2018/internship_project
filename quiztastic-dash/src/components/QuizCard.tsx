import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Clock } from "lucide-react";

interface QuizCardProps {
  title: string;
  description: string;
  questionCount: number;
  timeLimit: number;
  onStart: () => void;
}

export const QuizCard = ({
  title,
  description,
  questionCount,
  timeLimit,
  onStart,
}: QuizCardProps) => {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow animate-fadeIn">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Clock className="h-4 w-4" />
          <span>{timeLimit} minutes</span>
          <span className="mx-2">•</span>
          <span>{questionCount} questions</span>
        </div>
        <Button onClick={onStart} className="w-full bg-quiz-primary hover:bg-quiz-primary/90">
          Start Quiz
        </Button>
      </CardContent>
    </Card>
  );
};