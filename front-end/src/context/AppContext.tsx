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
  UserProfile,
} from "../types";
import { authClient } from "../lib/auth";
import { api } from "../lib/api";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null | undefined;
  plan: TrainingPlan | null | undefined;
  isLoading: boolean;
  saveProfile: (profile: OnboardingFormData) => Promise<void>;
  generatePlan: () => Promise<TrainingPlan>;
  refreshProfile: () => Promise<void>;
  refreshPlan: () => Promise<void>;
}

const AppContext = createContext<AuthContextType | null>(null);

export default function AppProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = authClient.useSession();

  const [profile, setProfile] = useState<UserProfile | null | undefined>(
    undefined,
  );
  const [plan, setPlan] = useState<TrainingPlan | null | undefined>(undefined);

  const user = (session?.user as User) ?? null;
  const isLoading = isPending;

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      setProfile(undefined);
      setPlan(undefined);
      return;
    }

    setProfile(undefined);
    setPlan(undefined);

    refreshProfile();
    refreshPlan();
  }, [user?.id, isLoading]);

  async function refreshProfile() {
    if (!user) return;

    try {
      const currentProfile = await api.getCurrentProfile();
      setProfile(currentProfile);
    } catch {
      setProfile(null);
    }
  }

  async function refreshPlan() {
    if (!user) return;

    try {
      const currentPlan = await api.getCurrentPlan();

      const fullPlan: TrainingPlan = {
        id: currentPlan.id,
        userId: currentPlan.userId,
        version: currentPlan.version,
        createdAt: currentPlan.createdAt,
        ...currentPlan.planJson,
      };

      setPlan(fullPlan);
    } catch {
      setPlan(null);
    }
  }

  async function saveProfile(profileData: OnboardingFormData) {
    if (!user) {
      throw new Error("User must be authenticated to save profile");
    }

    const savedProfile = await api.saveProfile(profileData);
    setProfile(savedProfile);
  }

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

  return (
    <AppContext.Provider
      value={{
        user,
        profile,
        plan,
        isLoading,
        saveProfile,
        generatePlan,
        refreshProfile,
        refreshPlan,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAuth must be used within an AppProvider");
  }

  return context;
}