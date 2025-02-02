import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, CheckCircle, Clock, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QuizResults } from "@/components/QuizResults";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuizResult {
  score: number;
  date: string;
  timeSpent: string;
  totalQuestions: number;
  correctAnswers: number;
}

const Dashboard = () => {
  const [userStats, setUserStats] = useState({
    completedQuizzes: 0,
    averageScore: 0,
    totalTime: "0h 0m",
    currentRank: "Beginner",
    name: "", // Added to display in dashboard
  });

  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "To crack any exams",
  });

  useEffect(() => {
    const results = JSON.parse(localStorage.getItem("quizResults") || "[]");
    setQuizResults(results);

    if (results.length > 0) {
      const totalScore = results.reduce(
        (acc: number, curr: QuizResult) => acc + curr.score,
        0
      );
      setUserStats((prev) => ({
        ...prev,
        completedQuizzes: results.length,
        averageScore: Math.round(totalScore / results.length),
        totalTime: `${Math.floor(results.length * 5)}m`,
        currentRank: results.length > 5 ? "Advanced" : "Beginner",
      }));
    }

    const savedProfile = JSON.parse(localStorage.getItem("userProfile") || "{}");
    if (savedProfile && Object.keys(savedProfile).length > 0) {
      setUserProfile(savedProfile);
      setUserStats((prev) => ({ ...prev, name: savedProfile.name })); // Update name in dashboard
    }
  }, []);

  const handleProfileUpdate = () => {
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
    setUserStats((prev) => ({ ...prev, name: userProfile.name })); // Instantly update dashboard name
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome, {userStats.name || "User"}! 🎉
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completed Quizzes
              </CardTitle>
              <Book className="h-4 w-4 text-quiz-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.completedQuizzes}</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <CheckCircle className="h-4 w-4 text-quiz-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.averageScore}%</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Time</CardTitle>
              <Clock className="h-4 w-4 text-quiz-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.totalTime}</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Rank</CardTitle>
              <User className="h-4 w-4 text-quiz-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.currentRank}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <QuizResults results={quizResults} />
          </div>

          <div>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>My Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    placeholder="Enter your name"
                    value={userProfile.name}
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={userProfile.email}
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    placeholder="Enter your phone number"
                    value={userProfile.phone}
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, phone: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Interest</label>
                  <Select
                    value={userProfile.interest}
                    onValueChange={(value) =>
                      setUserProfile({ ...userProfile, interest: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your interest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="To crack any exams">
                        To crack any exams
                      </SelectItem>
                      <SelectItem value="Timepass">Timepass</SelectItem>
                      <SelectItem value="Learning">Learning</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  className="w-full bg-quiz-primary hover:bg-quiz-primary/90"
                  onClick={handleProfileUpdate}
                >
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;