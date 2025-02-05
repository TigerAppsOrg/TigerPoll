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

//----------------------------------------------------------------------
// Tables
//----------------------------------------------------------------------

export const users = pgTable("users", {
    netid: text("netid").notNull().primaryKey(),
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
    isRequest: boolean("is_request").notNull().default(false),
    isActive: boolean("is_active").notNull().default(false),
    isCompleted: boolean("is_completed").notNull().default(false),
    title: text("title").notNull(),
    suggested_duration: integer("suggested_duration"),
    comment: text("comment").default(sql`NULL`),
    createdAt: timestamp("created_at")
        .notNull()
        .default(sql`now()`),
    endsAt: timestamp("ends_at").notNull()
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
