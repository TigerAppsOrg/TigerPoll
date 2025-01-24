export type QuestionType = "multiple_choice" | "select_all";

export type Question = {
    id: number;
    questionType: QuestionType;
    question: string;
    answerChoices: string[];
};

// Poll data to be displayed on the dashboard.
export type PollMetadata = {
    id: number;
    title: string;
    hasDone: boolean;
    isCompleted: boolean;
    createdAt: string;
    endsAt: string;
};

// Complete poll data for when filling out a poll
export type PollDetails = {
    id: number;
    title: string;
    questions: Question[];
};
