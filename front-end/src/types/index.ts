export interface User {
  id: string;
  email: string;
  createdAt: Date;
}

export interface OnboardingFormData {
  goal: "cut" | "bulk" | "recomp" | "strength" | "endurance";
  experience: "beginner" | "intermediate" | "advanced";
  daysPerWeek: number;
  sessionLength: number;
  equipment: "full_gym" | "home" | "dumbbells";
  injuries?: string;
  preferredSplit: "full_body" | "upper_lower" | "ppl" | "custom";
}

export interface UserProfile extends OnboardingFormData {
  userId: string;
  updatedAt: Date;
}