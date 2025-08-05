export type User = {
    netid: string;
    email: string;
};

export type Poll = {
    id: number;
    createdBy: User;
    isRequest: boolean;
    isActive: boolean;
    isCompleted: boolean;
    title: string;
    description: string;
    suggestedDurationDays: number;
    commentToAdmins: string;
    createdAt: string;
    beginsAt: string | null;
    endsAt: string | null;
};

export type QuestionType = "multiple_choice" | "select_all";

export const typeLabels: Record<QuestionType, string> = {
    multiple_choice: "Multiple Choice",
    select_all: "Select All That Apply"
};

export type Question = {
    id: number;
    pollId: number;
    type: QuestionType;
    order: number;
    question: string;
    options: string[];
};

export type AnswerOptionResults = {
    answer: string;
    count: number;
};

export type QuestionResults = Omit<Question, "options"> & {
    answerCount: number;
    options: AnswerOptionResults[];
};
