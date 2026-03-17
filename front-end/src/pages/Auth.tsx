import { useParams } from "react-router-dom";
import { AuthView } from "@daveyplate/better-auth-ui";

export default function Auth() {
  const { pathname } = useParams();

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <AuthView pathname={pathname} />
    </main>
  );
}
