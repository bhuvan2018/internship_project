import { Navbar } from "@/components/Navbar";
import { QuizCard } from "@/components/QuizCard";
import { useNavigate } from "react-router-dom";

const quizzes = [
  {
    id: 1,
    title: "General Knowledge Quiz",
    description: "Test your knowledge across various subjects with our comprehensive quiz",
    questionCount: 10,
    timeLimit: 5,
  }
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to QuizMaster</h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Challenge yourself with our quiz containing 10 random questions. Test your
          knowledge across different subjects and track your progress.
        </p>
        
        <div className="max-w-md mx-auto">
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              {...quiz}
              onStart={() => navigate(`/quiz`)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;