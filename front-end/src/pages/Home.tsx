import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AppContext";

const Home = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/profile" replace />;
  }

  return <div>Home</div>;
};

export default Home;