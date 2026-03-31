import { Link } from "react-router-dom";
import { Dumbbell } from "lucide-react";
import { Button } from "../ui/button";
import { UserButton } from "@daveyplate/better-auth-ui";
import { useAuth } from "@/context/AppContext";

const Navbar = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2 text-foreground min-w-0">
          <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6 text-accent shrink-0" />
          <span className="font-semibold text-sm sm:text-lg truncate">
            GYM PLANNER
          </span>
        </Link>

        <nav className="flex items-center gap-2 shrink-0">
          {user ? (
            <>
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="px-2 sm:px-3">
                  My Plan
                </Button>
              </Link>

              <UserButton size="lg" />
            </>
          ) : (
            <>
              <Link to="/auth/sign-in">
                <Button variant="ghost" size="sm" className="px-2 sm:px-3">
                  Sign In
                </Button>
              </Link>

              <Link to="/auth/sign-up">
                <Button size="sm" className="px-2 sm:px-3">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;