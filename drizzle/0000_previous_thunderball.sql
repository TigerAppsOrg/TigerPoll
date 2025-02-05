CREATE TYPE "public"."question_type" AS ENUM('multiple_choice', 'select_all');--> statement-breakpoint
CREATE TABLE "answers" (
	"id" serial PRIMARY KEY NOT NULL,
	"question_id" integer NOT NULL,
	"answer_choices" text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE "polls" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"is_request" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL,
	"is_completed" boolean DEFAULT false NOT NULL,
	"title" text NOT NULL,
	"suggested_duration" integer,
	"comment" text DEFAULT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"ends_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"poll_id" integer NOT NULL,
	"order" integer NOT NULL,
	"question_type" "question_type" NOT NULL,
	"question" text NOT NULL,
	"answer_choices" text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_has_done_poll" (
	"user_id" text NOT NULL,
	"poll_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"netid" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"is_admin" boolean DEFAULT false NOT NULL,
	"is_email_list" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "polls" ADD CONSTRAINT "polls_user_id_users_netid_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("netid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_poll_id_polls_id_fk" FOREIGN KEY ("poll_id") REFERENCES "public"."polls"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_has_done_poll" ADD CONSTRAINT "user_has_done_poll_user_id_users_netid_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("netid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_has_done_poll" ADD CONSTRAINT "user_has_done_poll_poll_id_polls_id_fk" FOREIGN KEY ("poll_id") REFERENCES "public"."polls"("id") ON DELETE no action ON UPDATE no action;