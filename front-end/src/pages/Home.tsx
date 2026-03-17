import { Navigate } from "react-router-dom";
import { authClient } from "@/lib/auth";

const Home = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (session?.user) {
    return <Navigate to="/profile" replace />;
  }

  return <div>Home</div>;
};

export default Home;