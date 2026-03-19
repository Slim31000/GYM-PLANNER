import { useParams } from "react-router-dom";
import { AccountView } from "@daveyplate/better-auth-ui";

const Account = () => {
  const { pathname } = useParams();

  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <AccountView pathname={pathname} />
    </div>
  );
};

export default Account;
