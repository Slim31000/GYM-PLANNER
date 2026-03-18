import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import { authClient } from "@/lib/auth";
import { useNavigate, Link as ReactRouterLink } from "react-router-dom";
import type { ReactNode } from "react";

type RouterLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

function RouterLink({ href, className, children }: RouterLinkProps) {
  return (
    <ReactRouterLink to={href} className={className}>
      {children}
    </ReactRouterLink>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={navigate}
      Link={RouterLink}
    >
      {children}
    </AuthUIProvider>
  );
}