import type { OnboardingFormData, UserProfile, GeneratedPlanResponse } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Fonction utilitaire pour les requêtes POST
async function post(path: string, body?: object) {
  const res = await fetch(`${BASE_URL}/api${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    throw new Error(
      (await res.json().catch(() => ({}))).error || "Request failed",
    );
  }

  return res.json();
}

async function get(path: string) {
    const res = await fetch(`${BASE_URL}/api${path}`,{
        method: "GET",
        credentials: "include",
    });
    if (!res.ok) {
      throw new Error(
        (await res.json().catch(() => ({}))).error || "Request failed",
      );
    }
    return res.json();
}


export const api = {
  // Sauvegarde du profil onboarding
  async saveProfile(profile: OnboardingFormData): Promise<UserProfile> {
    const data = await post("/profile", profile);
    return data.profile;
  },

  async getCurrentProfile(): Promise<UserProfile> {
    const data = await get("/profile/current");
    return data.profile;
  },

  // Génère un plan d'entraînement
  async generatePlan(): Promise<GeneratedPlanResponse> {
    return post("/plan/generate");
  },

  async getCurrentPlan(): Promise<GeneratedPlanResponse> {
    return get("/plan/current");
  },
};
