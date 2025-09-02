// db.test.ts
// Vitest tests for database
import { expect, test } from "vitest";
import { getPollMetadatas, getPollDetails } from '../server/read';
import { db } from '../server/db/index'
import { users, questions, polls, answers, userHasDonePoll, questionTypeEnum } from '../server/db/schema'
import { eq, and } from "drizzle-orm";


test("should insert and retrieve data from the database", async () => {
  // Sample data to be inserted
  const user = {
    netid: "jdoe123",
    email: "jdoe@example.com",
    isAdmin: true,
    isEmailList: false,
  };

  const poll = {
    userId: "jdoe123",
    isRequest: false,
    isActive: true,
    isCompleted: false,
    title: "Favorite Movie Poll",
    suggested_duration: 5,
    endsAt: new Date("2025-02-01T23:59:59Z"),
  };

  const question = {
    pollId: null, // Will be set after the poll is inserted
    order: 1,
    questionType: questionTypeEnum.enumValues[0], // Assuming "multiple_choice"
    question: "What is your favorite movie?",
    answerChoices: ["Inception", "Titanic", "Avatar", "The Matrix"],
  };

  const answer = {
    questionID: null, // Will be set after the question is inserted
    content: ["Inception"],
  };

  const userCompletedPoll = {
    userId: "jdoe123",
    pollId: null, // Will be set after poll is inserted
  };

  let insertedPollId: number;
  let insertedQuestionId: number;
  let insertedAnswerId: number;
  let insertedUserId: string;
  let insertedUserCompletedPollId: string;

  /* // occassionally have to delete the data in the poll for some reason
  await db.delete(answers);
  await db.delete(questions);
  await db.delete(userHasDonePoll);  
  await db.delete(polls);
  await db.delete(users);
  */
  

  // Start the transaction to insert data
  await db.transaction(async (trx) => {
    // Insert the user
    const insertedUser = await trx.insert(users).values(user).returning();
    insertedUserId = insertedUser[0].netid; // Store the inserted user ID
    console.log("User added:", insertedUser);

    // Insert the poll and get the inserted poll's ID
    const insertedPoll = await trx.insert(polls).values(poll).returning();
    insertedPollId = insertedPoll[0].id; // Store the inserted poll ID
    console.log("Poll added:", insertedPoll);

    // Insert the question and set pollId dynamically
    const insertedQuestion = await trx.insert(questions).values({
      ...question,
      pollId: insertedPollId, // Set dynamically from the inserted poll
    }).returning();
    insertedQuestionId = insertedQuestion[0].id; // Store the inserted question ID
    console.log("Question added:", insertedQuestion);

    // Insert the answer and set questionID dynamically
    const insertedAnswer = await trx.insert(answers).values({
      ...answer,
      questionId: insertedQuestionId, // Set dynamically from the inserted question
    }).returning();
    insertedAnswerId = insertedAnswer[0].id; // Store the inserted answer ID
    console.log("Answer added:", insertedAnswer);

    // Insert the user poll completion record
    const insertedUserCompletedPoll = await trx.insert(userHasDonePoll).values({
      ...userCompletedPoll,
      pollId: insertedPollId, // Set dynamically from the inserted poll
    }).returning();
    insertedUserCompletedPollId = insertedUserCompletedPoll[0].userId; // Store the inserted user poll completion record ID
    console.log("User completed poll record added:", insertedUserCompletedPoll);
  });

  // Assertions to check if the data was retreived by getPollMetadatas correctly
  const result = await getPollMetadatas("jdoe123")
  console.log(result)
  
  expect(result).toHaveLength(1);
  expect(result[0]["title"]).toBe('Favorite Movie Poll');
  expect(result[0]["isCompleted"]).toBe(false);
  expect(result[0]["hasDone"]).toBe(true);
  expect(result[0]["endsAt"] as string).toBe("Sat Feb 01 2025 18:59:59 GMT-0500 (Eastern Standard Time)");

  // Cleanup: Delete the inserted data after the test
  await db.transaction(async (trx) => {
    // Delete the user-poll completion record first to avoid foreign key constraint violations
    await trx.delete(userHasDonePoll).where(eq(userHasDonePoll.userId, insertedUserCompletedPollId));
    
    // Delete the answers
    await trx.delete(answers).where(eq(answers.id, insertedAnswerId));
    
    // Delete the question
    await trx.delete(questions).where(eq(questions.id, insertedQuestionId));

    // Delete the poll
    await trx.delete(polls).where(eq(polls.id, insertedPollId));

    // Finally, delete the user
    await trx.delete(users).where(eq(users.netid, insertedUserId));
  });
});