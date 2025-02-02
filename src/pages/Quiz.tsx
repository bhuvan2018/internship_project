import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QuizRegistration } from "@/components/QuizRegistration";
import { QuizQuestion } from "@/components/QuizQuestion";
import { useToast } from "@/hooks/use-toast";

const allQuestions = [
  {
    subject: "General Knowledge",
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    subject: "Science",
    question: "What is the chemical symbol for water?",
    options: ["CO2", "H2O", "O2", "N2"],
    correctAnswer: "H2O",
  },
  {
    subject: "Mathematics",
    question: "What is 15 × 4?",
    options: ["45", "50", "60", "75"],
    correctAnswer: "60",
  },
  {
    subject: "History",
    question: "Who was the first President of the United States?",
    options: ["John Adams", "Thomas Jefferson", "George Washington", "Benjamin Franklin"],
    correctAnswer: "George Washington",
  },
  {
    subject: "Geography",
    question: "Which is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctAnswer: "Pacific",
  },
  {
    subject: "Literature",
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: "William Shakespeare",
  },
  {
    subject: "Science",
    question: "What is the closest planet to the Sun?",
    options: ["Venus", "Mars", "Mercury", "Earth"],
    correctAnswer: "Mercury",
  },
  {
    subject: "Mathematics",
    question: "What is the square root of 144?",
    options: ["10", "12", "14", "16"],
    correctAnswer: "12",
  },
  {
    subject: "History",
    question: "In which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctAnswer: "1945",
  },
  {
    subject: "Geography",
    question: "Which continent is the largest by land area?",
    options: ["North America", "Africa", "Asia", "Europe"],
    correctAnswer: "Asia",
  }
];

const Quiz = () => {
  const [step, setStep] = useState<"registration" | "quiz">("registration");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState(allQuestions);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 10));
  }, []);

  const handleRegistrationSubmit = (data: { name: string; email: string; phone: string }) => {
    setStep("quiz");
    localStorage.setItem("userProfile", JSON.stringify(data));
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 10);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Quiz completed
      const quizResult = {
        score,
        date: new Date().toISOString(),
        timeSpent: "5 minutes", // This could be made dynamic
        totalQuestions: questions.length,
        correctAnswers: score / 10,
      };

      const currentResults = JSON.parse(localStorage.getItem("quizResults") || "[]");
      currentResults.push(quizResult);
      localStorage.setItem("quizResults", JSON.stringify(currentResults));

      toast({
        title: "Quiz completed!",
        description: `Your score: ${score}%. Check your results in the dashboard.`,
      });
      
      navigate("/dashboard");
    }
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      {step === "registration" ? (
        <QuizRegistration onSubmit={handleRegistrationSubmit} />
      ) : (
        <QuizQuestion
          question={questions[currentQuestion].question}
          options={questions[currentQuestion].options}
          correctAnswer={questions[currentQuestion].correctAnswer}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
};

export default Quiz;