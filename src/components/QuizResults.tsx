import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface QuizResult {
  score: number;
  date: string;
  timeSpent: string;
  totalQuestions: number;
  correctAnswers: number;
}

export const QuizResults = ({ results }: { results: QuizResult[] }) => {
  if (results.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            No quiz history available. Take a quiz to see your results!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {results.map((result, index) => (
            <div
              key={index}
              className="flex flex-col space-y-2 p-4 bg-muted/50 rounded-lg"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">Score</span>
                <span className="text-quiz-primary">{result.score}%</span>
              </div>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>Date</span>
                <span>{new Date(result.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>Time Spent</span>
                <span>{result.timeSpent}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>Correct Answers</span>
                <span>{result.correctAnswers} / {result.totalQuestions}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};