import { useParams } from "react-router-dom";
import { AccountView } from "@daveyplate/better-auth-ui";

const Account = () => {
    const { pathname } = useParams();

  return (
    <div><div className="min-h-screen p-4">
      <AccountView pathname={pathname} />
    </div></div>
  )
}

export default Account