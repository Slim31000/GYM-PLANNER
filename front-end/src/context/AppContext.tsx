import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type {
  GeneratedPlanResponse,
  OnboardingFormData,
  TrainingPlan,
  User,
} from "../types";
import { authClient } from "../lib/auth";
import { api } from "../lib/api";

// Ce que le contexte partage dans toute l'application
interface AuthContextType {
  user: User | null;
  plan: TrainingPlan | null;
  isLoading: boolean;
  saveProfile: (profile: OnboardingFormData) => Promise<void>;
  generatePlan: () => Promise<TrainingPlan>;
}

// Création du contexte
const AuthContext = createContext<AuthContextType | null>(null);

// Provider principal de l'auth
export default function AuthProvider({ children }: { children: ReactNode }) {
  // Utilisateur connecté
  const [user, setUser] = useState<User | null>(null);

  // Plan généré
  const [plan, setPlan] = useState<TrainingPlan | null>(null);

  // État de chargement de la session
  const [isLoading, setIsLoading] = useState(true);

  // Au montage, on récupère la session Better Auth
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

  // Sauvegarde du profil onboarding
  async function saveProfile(profileData: OnboardingFormData) {
    if (!user) {
      throw new Error("User must be authenticated to save profile");
    }

    await api.saveProfile(profileData);
  }

  // Génération du plan d'entraînement
  async function generatePlan(): Promise<TrainingPlan> {
    if (!user) {
      throw new Error("User must be authenticated to generate a plan");
    }

    const generatedPlan: GeneratedPlanResponse = await api.generatePlan();

    const fullPlan: TrainingPlan = {
      id: generatedPlan.id,
      userId: user.id,
      version: generatedPlan.version,
      createdAt: generatedPlan.createdAt,
      ...generatedPlan.planJson,
    };

    setPlan(fullPlan);

    return fullPlan;
  }

  // Valeurs rendues disponibles dans toute l'application
  return (
    <AuthContext.Provider
      value={{
        user,
        plan,
        isLoading,
        saveProfile,
        generatePlan,
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