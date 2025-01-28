import { and, asc, eq } from "drizzle-orm";
import { db } from "./db";
import { polls, questions, userHasDonePoll } from "./db/schema";
import type { PollDetails, PollMetadata } from "./types";

/**
 * Retrieves a list of poll metadata to be displayed on the dashboard.
 * @param netid user's netid
 * @returns list of poll metadata
 */
export const getPollMetadatas = async (
    netid: string
): Promise<PollMetadata[]> => {
    // Open a transaction to ensure data consistency
    const pollMetadatas = await db.transaction(async (tx) => {
        // Retrieve poll details
        const poll = await tx
            .select({
                id: polls.id,
                title: polls.title,
                createdAt: polls.createdAt,
                endsAt: polls.endsAt,
                isCompleted: polls.isCompleted
            })
            .from(polls);

        // Retrieve hasDonePoll details
        const hasDonePolls = await tx
            .select()
            .from(userHasDonePoll)
            .where(and(eq(userHasDonePoll.userId, netid)));

        // Create a set of the user completed pollIds
        const donePollIds = new Set(hasDonePolls.map((row) => row.pollId));

        // Construct the PollMetadata
        const pollArray = poll.map((onePoll) => {
            return {
                id: onePoll.id,
                title: onePoll.title,
                createdAt: onePoll.createdAt.toString(),
                endsAt: onePoll.endsAt.toString(),
                isCompleted: onePoll.isCompleted,
                hasDone: donePollIds.has(onePoll.id)
            };
        });
        return pollArray;
    });

    return pollMetadatas;
};

/**
 * Retrieves the details of a poll that the user is filling out.
 * @param netid user's netid
 * @param pollId poll id
 * @returns Poll details
 */
export const getPollDetails = async (
    netid: string,
    pollId: number
): Promise<PollDetails> => {
    // Open a transaction to ensure data consistency
    const poll = await db.transaction(async (tx) => {
        // Check if the user has already done the poll
        const hasDonePoll =
            (
                await tx
                    .select()
                    .from(userHasDonePoll)
                    .where(
                        and(
                            eq(userHasDonePoll.userId, netid),
                            eq(userHasDonePoll.pollId, pollId)
                        )
                    )
            ).length > 0;
        if (hasDonePoll) throw new Error("User has already done the poll");

        // Retrieve poll details
        const poll = await tx
            .select({
                id: polls.id,
                title: polls.title
            })
            .from(polls)
            .where(eq(polls.id, pollId));

        if (poll.length === 0) throw new Error("Poll not found");

        // Retrieve questions
        const qs = await tx
            .select({
                id: questions.id,
                questionType: questions.questionType,
                question: questions.question,
                answerChoices: questions.answerChoices
            })
            .from(questions)
            .where(eq(questions.pollId, pollId))
            .orderBy(asc(questions.order));

        return {
            id: poll[0].id,
            title: poll[0].title,
            questions: qs.map((q) => ({
                id: q.id,
                questionType: q.questionType,
                question: q.question,
                answerChoices: q.answerChoices
            }))
        };
    });

    return poll;
};
