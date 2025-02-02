import { Navbar } from "@/components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">About QuizMaster</h1>
          <div className="space-y-6 text-lg">
            <p>
              Welcome to QuizMaster, your ultimate platform for testing and enhancing your knowledge
              across various subjects. Our platform offers a comprehensive quiz experience with
              timed challenges and immediate feedback.
            </p>
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
              <ul className="space-y-3 list-disc pl-6">
                <li>Select your preferred subject from our diverse quiz categories</li>
                <li>Complete a brief registration before starting the quiz</li>
                <li>Answer 5 questions within 30 seconds each</li>
                <li>Get instant results and track your progress in the dashboard</li>
                <li>Review your answers and learn from your mistakes</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;