export type QuestionType = 'multiple_choice' | 'select_all'

export type AnswerOptionResults = {
    answer: string;
    count: number;
}

export type QuestionResults = {
    id: string;
    poll_id: number;
    type: QuestionType;
    order: number;
    question: string;
    options: AnswerOptionResults[];
}