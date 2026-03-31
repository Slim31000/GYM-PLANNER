import { Dumbbell, Info } from "lucide-react";
import type { DaySchedule, Exercise } from "../../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

function ExerciseMobileCard({
  exercise,
  index,
}: {
  exercise: Exercise;
  index: number;
}) {
  return (
    <div className="rounded-lg border border-border p-4 space-y-3">
      <div className="flex items-start gap-3">
        <span className="text-xs text-muted-foreground w-5 shrink-0">
          {index + 1}.
        </span>

        <div className="min-w-0 flex-1">
          <p className="font-medium">{exercise.name}</p>

          {exercise.notes && (
            <p className="text-xs text-muted-foreground mt-1 flex items-start gap-1">
              <Info className="w-3 h-3 mt-0.5 shrink-0" />
              <span>{exercise.notes}</span>
            </p>
          )}

          {exercise.alternatives && exercise.alternatives.length > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              <span className="font-medium">Alternatives :</span>{" "}
              {exercise.alternatives.join(", ")}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-md bg-muted/40 p-2 text-center">
          <p className="text-xs text-muted-foreground">Séries x reps</p>
          <p className="font-medium">
            {exercise.sets} x {exercise.reps}
          </p>
        </div>

        <div className="rounded-md bg-muted/40 p-2 text-center">
          <p className="text-xs text-muted-foreground">Repos</p>
          <p className="font-medium">{exercise.rest}</p>
        </div>

        <div className="rounded-md bg-muted/40 p-2 text-center">
          <p className="text-xs text-muted-foreground">RPE</p>
          <span
            className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium mt-1 ${
              exercise.rpe >= 8
                ? "bg-red-500/10 text-red-400"
                : exercise.rpe >= 7
                  ? "bg-yellow-500/10 text-yellow-400"
                  : "bg-green-500/10 text-green-400"
            }`}
          >
            {exercise.rpe}
          </span>
        </div>
      </div>
    </div>
  );
}

function ExerciseDesktopRow({
  exercise,
  index,
}: {
  exercise: Exercise;
  index: number;
}) {
  return (
    <tr className="border-b border-border last:border-0">
      <td className="py-3 pr-4">
        <div className="flex items-start gap-3">
          <span className="text-xs text-muted-foreground w-5">
            {index + 1}.
          </span>

          <div>
            <p className="font-medium">{exercise.name}</p>

            {exercise.notes && (
              <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                <Info className="w-3 h-3" />
                {exercise.notes}
              </p>
            )}

            {exercise.alternatives && exercise.alternatives.length > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                <span className="font-medium">Alternatives :</span>{" "}
                {exercise.alternatives.join(", ")}
              </p>
            )}
          </div>
        </div>
      </td>

      <td className="py-3 px-4 text-center whitespace-nowrap">
        <span className="text-[var(--color-accent)] font-medium">
          {exercise.sets}
        </span>
        <span className="text-muted-foreground"> x </span>
        <span>{exercise.reps}</span>
      </td>

      <td className="py-3 px-4 text-center">
        <span className="text-muted-foreground">{exercise.rest}</span>
      </td>

      <td className="py-3 px-4 text-center">
        <span
          className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium ${
            exercise.rpe >= 8
              ? "bg-red-500/10 text-red-400"
              : exercise.rpe >= 7
                ? "bg-yellow-500/10 text-yellow-400"
                : "bg-green-500/10 text-green-400"
          }`}
        >
          {exercise.rpe}
        </span>
      </td>
    </tr>
  );
}

function DayCard({ schedule }: { schedule: DaySchedule }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div>
          <CardTitle className="text-lg">{schedule.day}</CardTitle>
          <CardDescription className="text-[var(--color-accent)]">
            {schedule.focus}
          </CardDescription>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
          <Dumbbell className="w-4 h-4" />
          <span>{schedule.exercises.length} exercices</span>
        </div>
      </CardHeader>

      <CardContent>
        {/* Mobile */}
        <div className="space-y-3 md:hidden">
          {schedule.exercises.map((exercise, index) => (
            <ExerciseMobileCard
              key={`${schedule.day}-${exercise.name}-${index}`}
              exercise={exercise}
              index={index}
            />
          ))}
        </div>

        {/* Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground text-xs uppercase tracking-wider">
                <th className="text-left py-2 pr-4 font-medium">Exercice</th>
                <th className="py-2 px-4 font-medium">Séries x reps</th>
                <th className="py-2 px-4 font-medium">Repos</th>
                <th className="py-2 px-4 font-medium">RPE</th>
              </tr>
            </thead>

            <tbody>
              {schedule.exercises.map((exercise, index) => (
                <ExerciseDesktopRow
                  key={`${schedule.day}-${exercise.name}-${index}`}
                  exercise={exercise}
                  index={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

interface PlanDisplayProps {
  weeklySchedule: DaySchedule[];
}

export function PlanDisplay({ weeklySchedule }: PlanDisplayProps) {
  return (
    <div className="space-y-6 mb-8">
      {weeklySchedule.map((schedule, index) => (
        <DayCard key={`${schedule.day}-${index}`} schedule={schedule} />
      ))}
    </div>
  );
}