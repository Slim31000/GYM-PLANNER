import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import { authClient } from "@/lib/auth";
import { useNavigate, Link as ReactRouterLink } from "react-router-dom";
import type {
  ReactNode,
  AnchorHTMLAttributes,
  MouseEventHandler,
} from "react";

type RouterLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">;

function RouterLink({
  href,
  className,
  children,
  onClick,
  target,
  rel,
  ...rest
}: RouterLinkProps) {
  return (
    <ReactRouterLink
      to={href}
      className={className}
      onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
      target={target}
      rel={rel}
      {...rest}
    >
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
      localization={{
        INVALID_EMAIL: "Adresse email invalide",
        INVALID_PASSWORD: "Mot de passe invalide",
        PASSWORD_TOO_SHORT: "Le mot de passe est trop court",
        PASSWORD_TOO_LONG: "Le mot de passe est trop long",
        INVALID_EMAIL_OR_PASSWORD: "Email ou mot de passe incorrect",
        INVALID_USERNAME_OR_PASSWORD: "Email ou mot de passe incorrect",
        USER_NOT_FOUND: "Email ou mot de passe incorrect",
        EMAIL_NOT_VERIFIED: "Vérifie ton email avant de te connecter",
        UNEXPECTED_ERROR: "Une erreur est survenue",
        UNKNOWN_ERROR: "Une erreur est survenue",
        UNKNOWN: "Une erreur est survenue",
      }}
    >
      {children}
    </AuthUIProvider>
  );
}