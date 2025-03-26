import { useState } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

export const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const { toast } = useToast();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
    toast({
      title: `Switched to ${isDark ? "light" : "dark"} mode`,
      duration: 1500,
    });
  };

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/home" className="text-2xl font-bold text-quiz-primary">
            QuizMaster
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/home" className="hover:text-quiz-primary transition-colors">
              Home
            </Link>
            <Link to="/about" className="hover:text-quiz-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="hover:text-quiz-primary transition-colors">
              Contact
            </Link>
            <Link to="/dashboard" className="hover:text-quiz-primary transition-colors">
              Dashboard
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};