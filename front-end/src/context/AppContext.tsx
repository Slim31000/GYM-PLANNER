import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { OnboardingFormData, User } from "../types";
import { authClient } from "../lib/auth";
import { api } from "../lib/api";

// Ce que le contexte va partager dans l'application
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  saveProfile: (profile: OnboardingFormData) => Promise<void>;
}

// Création du contexte
const AuthContext = createContext<AuthContextType | null>(null);

// Provider principal
export default function AuthProvider({ children }: { children: ReactNode }) {
 
  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  // Au chargement, on demande à Better Auth s'il existe une session active
  useEffect(() => {
    async function loadUser() {
      try {
        const result = await authClient.getSession();

        if (result?.data?.user) {
          setUser(result.data.user as User);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error loading session:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  // Envoie les données du formulaire d'onboarding au backend
  async function saveProfile(profileData: OnboardingFormData) {
    if (!user) {
      throw new Error("User must be authenticated to save profile");
    }

    await api.saveProfile(profileData);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        saveProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook pratique pour utiliser le contexte
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}