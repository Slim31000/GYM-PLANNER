import { Navigate } from "react-router-dom"
import { authClient } from "@/lib/auth"

const Profile = () => {
  const { data: session, isPending } = authClient.useSession()
  const plan= false; // Replace with actual logic to check if the user has a plan
  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/auth/sign-in" replace />;
  }
  if(!plan){
    return <Navigate to="/onboarding" replace />;
  }
  return (
    <div>Profile</div>
  )
}

export default Profile