export type QuestionType = "multiple_choice" | "select_all";

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
