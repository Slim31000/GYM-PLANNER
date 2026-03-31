import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AppContext";
import { Button } from "../components/ui/button";
import {
  Calendar,
  Dumbbell,
  Loader2,
  RefreshCcw,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { PlanDisplay } from "../components/plan/PlanDisplay";

export default function Profile() {
  const { user, profile, isLoading, plan, generatePlan } = useAuth();
  const [isRegenerating, setIsRegenerating] = useState(false);

  if (isLoading) {
    return <div className="min-h-screen pt-24 pb-12 px-6">Chargement...</div>;
  }

  if (!user) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  if (profile === undefined) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6">
        Chargement du profil...
      </div>
    );
  }

  if (profile === null) {
    return <Navigate to="/onboarding" replace />;
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (isRegenerating) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center py-16">
            <CardContent className="pt-6">
              <Loader2 className="w-12 h-12 text-[var(--color-accent)] mx-auto mb-6 animate-spin" />
              <CardTitle className="text-2xl font-bold mb-2">
                Création de votre programme
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Notre IA crée votre programme d’entraînement personnalisé...
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (plan === undefined) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center py-16">
            <CardContent className="pt-6">
              <Loader2 className="w-12 h-12 text-[var(--color-accent)] mx-auto mb-6 animate-spin" />
              <CardTitle className="text-2xl font-bold mb-2">
                Chargement de votre programme
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Nous récupérons votre programme actuel...
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (plan === null) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Aucun programme trouvé</CardTitle>
              <CardDescription>
                Votre profil existe, mais aucun programme d’entraînement n’a
                encore été généré.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Button
                className="gap-2"
                onClick={async () => {
                  try {
                    setIsRegenerating(true);
                    await generatePlan();
                  } finally {
                    setIsRegenerating(false);
                  }
                }}
              >
                <RefreshCcw className="w-4 h-4" />
                Générer mon programme
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">
              Mon programme d’entraînement
            </h1>
            <p className="text-muted-foreground">
              Version {plan.version} • Créé le {formatDate(plan.createdAt)}
            </p>
          </div>

          <Button
            variant="secondary"
            className="gap-2"
            onClick={async () => {
              try {
                setIsRegenerating(true);
                await generatePlan();
              } finally {
                setIsRegenerating(false);
              }
            }}
          >
            <RefreshCcw className="w-4 h-4" />
            Régénérer le programme
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="flex items-center gap-3 pt-6">
              <div className="w-10 h-10 flex items-center justify-center">
                <Target className="w-5 h-5 text-[var(--color-accent)]" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Objectif</p>
                <p className="font-medium text-sm">{plan.overview.goal}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-3 pt-6">
              <div className="w-10 h-10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[var(--color-accent)]" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Fréquence</p>
                <p className="font-medium text-sm">{plan.overview.frequency}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-3 pt-6">
              <div className="w-10 h-10 flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-[var(--color-accent)]" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Format</p>
                <p className="font-medium text-sm">{plan.overview.split}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-3 pt-6">
              <div className="w-10 h-10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[var(--color-accent)]" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Version</p>
                <p className="font-medium text-sm">{plan.version}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Notes du programme</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {plan.overview.notes}
            </p>
          </CardContent>
        </Card>

        <h2 className="font-semibold text-xl mb-4">Planning hebdomadaire</h2>
        <PlanDisplay weeklySchedule={plan.weeklySchedule} />

        <Card>
          <CardHeader>
            <CardTitle>Stratégie de progression</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {plan.progression}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}