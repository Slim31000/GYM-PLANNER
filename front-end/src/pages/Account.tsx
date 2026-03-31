import { useParams, useNavigate } from "react-router-dom";
import { AccountView } from "@daveyplate/better-auth-ui";
import { authClient } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const Account = () => {
  const { pathname } = useParams();
  const navigate = useNavigate();

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate("/auth/sign-in", { replace: true });
        },
      },
    });
  }

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <AccountView pathname={pathname} />

        <div className="flex justify-end">
          <Button variant="destructive" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Account;