import { relations } from "drizzle-orm";
import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  jsonb,
  index,
  varchar,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const trainingPlans = pgTable(
  "training_plans",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    planJson: jsonb("plan_json").notNull(),
    planText: text("plan_text").notNull(),
    version: integer("version").notNull().default(1),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("idx_training_plans_user_id").on(table.userId),
  ]
);

export const userProfiles = pgTable("user_profiles", {
  userId: text("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),

  goal: varchar("goal", { length: 20 }).notNull(),
  experience: varchar("experience", { length: 20 }).notNull(),
  daysPerWeek: integer("days_per_week").notNull(),
  sessionLength: integer("session_length").notNull(),
  equipment: varchar("equipment", { length: 20 }).notNull(),
  injuries: text("injuries"),
  preferredSplit: varchar("preferred_split", { length: 20 }).notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const trainingPlansRelations = relations(trainingPlans, ({ one }) => ({
  user: one(user, {
    fields: [trainingPlans.userId],
    references: [user.id],
  }),
}));

export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
  user: one(user, {
    fields: [userProfiles.userId],
    references: [user.id],
  }),
}));

// types

export type TrainingPlan = typeof trainingPlans.$inferSelect;
export type NewTrainingPlan = typeof trainingPlans.$inferInsert;

export type UserProfile = typeof userProfiles.$inferSelect;
export type NewUserProfile = typeof userProfiles.$inferInsert;