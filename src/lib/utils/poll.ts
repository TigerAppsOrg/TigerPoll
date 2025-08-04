export type QuestionType = 'multiple_choice' | 'select_all'

export type AnswerOptionResults = {
    answer: string;
    count: number;
}

export type QuestionResults = {
    id: string;
    pollId: number;
    type: QuestionType;
    order: number;
    question: string;
    answerCount: number;
    options: AnswerOptionResults[];
}