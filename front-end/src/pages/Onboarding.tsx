import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AppContext";
import { OnboardingFormData } from "@/types";
import { RedirectToSignIn, SignedIn } from "@daveyplate/better-auth-ui";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const goalOptions = [
  { value: "bulk", label: "Prise de masse" },
  { value: "cut", label: "Perte de graisse (sèche)" },
  { value: "recomp", label: "Recomposition corporelle" },
  { value: "strength", label: "Développer la force" },
  { value: "endurance", label: "Améliorer l’endurance" },
];

const experienceOptions = [
  { value: "beginner", label: "Débutant (0 à 1 an)" },
  { value: "intermediate", label: "Intermédiaire (1 à 3 ans)" },
  { value: "advanced", label: "Avancé (3 ans et plus)" },
];

const daysOptions = [
  { value: "2", label: "2 jours par semaine" },
  { value: "3", label: "3 jours par semaine" },
  { value: "4", label: "4 jours par semaine" },
  { value: "5", label: "5 jours par semaine" },
  { value: "6", label: "6 jours par semaine" },
];

const sessionOptions = [
  { value: "30", label: "30 minutes" },
  { value: "45", label: "45 minutes" },
  { value: "60", label: "60 minutes" },
  { value: "90", label: "90 minutes" },
];

const equipmentOptions = [
  { value: "full_gym", label: "Salle de sport complète" },
  { value: "home", label: "Salle à domicile" },
  { value: "dumbbells", label: "Haltères uniquement" },
];

const splitOptions = [
  { value: "full_body", label: "Corps complet" },
  { value: "upper_lower", label: "Haut / Bas du corps" },
  { value: "ppl", label: "Pousser / Tirer / Jambes" },
  { value: "custom", label: "Laisser l’IA décider" },
];

const Onboarding = () => {
  const { user ,saveProfile} = useAuth();

  const [formData, setFormData] = useState({
    goal: "bulk",
    experience: "intermediate",
    daysPerWeek: "4",
    sessionLength: "60",
    equipment: "full_gym",
    injuries: "",
    preferredSplit: "upper_lower",
  });

  const updateForm = (field: string, value: string) => {
    console.log("updateForm ->", field, value);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleQuestionnaire = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("formData submit ->", formData);
    const profile: OnboardingFormData = {
    goal: formData.goal as OnboardingFormData["goal"],
    experience: formData.experience as OnboardingFormData["experience"],
    daysPerWeek: parseInt(formData.daysPerWeek, 10),
    sessionLength: parseInt(formData.sessionLength, 10),
    equipment: formData.equipment as OnboardingFormData["equipment"],
    injuries: formData.injuries || undefined,
    preferredSplit: formData.preferredSplit as OnboardingFormData["preferredSplit"],
  };
    try {
      await saveProfile(profile);
      
    } catch (error) {
      console.error("Failed to save profile:", error);
      
    }
  };

  if (!user) {
    return <RedirectToSignIn />;
  }

  return (
    <SignedIn>
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-xl mx-auto">
          <Card className="border border-border px-8 py-8">
            <h1 className="text-2xl font-bold mb-2">Parlez-nous de vous</h1>

            <p className="text-muted-foreground mb-8">
              Aidez-nous à créer le programme parfait pour vous.
            </p>

            <form onSubmit={handleQuestionnaire} className="space-y-6">
              <div className="space-y-3">
                <label htmlFor="goal" className="text-sm font-medium block">
                  Quel est votre objectif principal ?
                </label>
                <Select
                  value={formData.goal}
                  onValueChange={(value) => updateForm("goal", value)}
                >
                  <SelectTrigger id="goal">
                    <SelectValue placeholder="Choisissez votre objectif" />
                  </SelectTrigger>
                  <SelectContent>
                    {goalOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label htmlFor="experience" className="text-sm font-medium block">
                  Niveau d’expérience en entraînement
                </label>
                <Select
                  value={formData.experience}
                  onValueChange={(value) => updateForm("experience", value)}
                >
                  <SelectTrigger id="experience">
                    <SelectValue placeholder="Choisissez votre niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-3">
                  <label htmlFor="daysPerWeek" className="text-sm font-medium block">
                    Jours par semaine
                  </label>
                  <Select
                    value={formData.daysPerWeek}
                    onValueChange={(value) => updateForm("daysPerWeek", value)}
                  >
                    <SelectTrigger id="daysPerWeek">
                      <SelectValue placeholder="Choisir" />
                    </SelectTrigger>
                    <SelectContent>
                      {daysOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label htmlFor="sessionLength" className="text-sm font-medium block">
                    Durée de la séance
                  </label>
                  <Select
                    value={formData.sessionLength}
                    onValueChange={(value) => updateForm("sessionLength", value)}
                  >
                    <SelectTrigger id="sessionLength">
                      <SelectValue placeholder="Choisir" />
                    </SelectTrigger>
                    <SelectContent>
                      {sessionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="equipment" className="text-sm font-medium block">
                  Équipement disponible
                </label>
                <Select
                  value={formData.equipment}
                  onValueChange={(value) => updateForm("equipment", value)}
                >
                  <SelectTrigger id="equipment">
                    <SelectValue placeholder="Choisissez votre équipement" />
                  </SelectTrigger>
                  <SelectContent>
                    {equipmentOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label htmlFor="preferredSplit" className="text-sm font-medium block">
                  Répartition d’entraînement préférée
                </label>
                <Select
                  value={formData.preferredSplit}
                  onValueChange={(value) => updateForm("preferredSplit", value)}
                >
                  <SelectTrigger id="preferredSplit">
                    <SelectValue placeholder="Choisissez un format" />
                  </SelectTrigger>
                  <SelectContent>
                    {splitOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label htmlFor="injuries" className="text-sm font-medium block">
                  Des blessures ou limitations ? (optionnel)
                </label>

                <Textarea
                  id="injuries"
                  placeholder="Ex. : douleurs lombaires, conflit d’épaule..."
                  rows={3}
                  value={formData.injuries}
                  onChange={(e) => {
                    updateForm("injuries", e.target.value);
                  }}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1 gap-2">
                  Générer mon programme <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </SignedIn>
  );
};

export default Onboarding;