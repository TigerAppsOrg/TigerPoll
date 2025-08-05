import { relations, sql } from "drizzle-orm";
import {
    pgTable,
    text,
    integer,
    pgEnum,
    boolean,
    serial,
    timestamp
} from "drizzle-orm/pg-core";

//----------------------------------------------------------------------
// Enums
//----------------------------------------------------------------------

export const questionTypeEnum = pgEnum("question_type", [
    "multiple_choice",
    "select_all"
]);

export const pollStateEnum = pgEnum("poll_state", [
    "draft",
    "request",
    "active",
    "completed"
]);

//----------------------------------------------------------------------
// Tables
//----------------------------------------------------------------------

export const users = pgTable("users", {
    id: serial("id").primaryKey().notNull(),
    netid: text("netid").notNull().unique(),
    email: text("email").notNull(),
    isAdmin: boolean("is_admin").notNull().default(false),
    isEmailList: boolean("is_email_list").notNull().default(false)
});

export const userRelations = relations(users, ({ many }) => ({
    polls: many(polls),
    userHasDonePoll: many(userHasDonePoll)
}));

export const polls = pgTable("polls", {
    id: serial("id").primaryKey().notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => users.netid),
    state: pollStateEnum("state").notNull().default("draft"),
    areResultsPublic: boolean("are_results_public").notNull().default(false),
    title: text("title").notNull(),
    suggestedDurationDays: integer("suggested_duration_days"),
    commentToAdmins: text("comment_to_admin").default(sql`NULL`),
    createdAt: timestamp("created_at")
        .notNull()
        .default(sql`now()`),
    beginsAt: timestamp("begins_at").notNull(),
    endsAt: timestamp("ends_at").default(sql`NULL`)
});

export const pollRelations = relations(polls, ({ many, one }) => ({
    questions: many(questions),
    user: one(users, {
        fields: [polls.userId],
        references: [users.netid]
    }),
    userHasDonePolls: many(userHasDonePoll)
}));

export const questions = pgTable("questions", {
    id: serial("id").primaryKey().notNull(),
    pollId: integer("poll_id")
        .notNull()
        .references(() => polls.id),
    order: integer("order").notNull(),
    questionType: questionTypeEnum("question_type").notNull(),
    question: text("question").notNull(),
    answerChoices: text("answer_choices").array().notNull()
});

export const questionRelations = relations(questions, ({ many, one }) => ({
    answers: many(answers),
    poll: one(polls, {
        fields: [questions.pollId],
        references: [polls.id]
    })
}));

export const answers = pgTable("answers", {
    id: serial("id").primaryKey().notNull(),
    questionId: integer("question_id")
        .notNull()
        .references(() => questions.id),
    content: text("answer_choices").array().notNull()
});

export const answerRelations = relations(answers, ({ one }) => ({
    questions: one(questions, {
        fields: [answers.questionId],
        references: [questions.id]
    })
}));

export const userHasDonePoll = pgTable("user_has_done_poll", {
    userId: text("user_id")
        .notNull()
        .references(() => users.netid),
    pollId: integer("poll_id")
        .notNull()
        .references(() => polls.id)
});

export const userHasDonePollRelations = relations(
    userHasDonePoll,
    ({ one }) => ({
        poll: one(polls, {
            fields: [userHasDonePoll.pollId],
            references: [polls.id]
        }),
        user: one(users, {
            fields: [userHasDonePoll.userId],
            references: [users.netid]
        })
    })
);
