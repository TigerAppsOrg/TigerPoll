export const VALIDATION_CONSTANTS = {
    MAX_ANSWER_OPTIONS: 10,
    MIN_ANSWER_OPTIONS: 2,
    MAX_ANSWER_LENGTH: 100,
    MAX_QUESTION_LENGTH: 200
};

export type ArrValidationError = {
    index: number;
    message: string;
};

export const validateAnswerOptions = (
    options: string[]
): ArrValidationError[] => {
    const errors: ArrValidationError[] = [];
    options.forEach((option, index) => {
        const trimmedOption = option.trim();
        if (!trimmedOption) {
            errors.push({ index, message: "Answer option cannot be empty." });
        }

        if (trimmedOption.length > VALIDATION_CONSTANTS.MAX_ANSWER_LENGTH) {
            errors.push({
                index,
                message: `Answer option must be shorter than ${VALIDATION_CONSTANTS.MAX_ANSWER_LENGTH} characters.`
            });
        }

        const firstIndex = options.indexOf(option);
        if (firstIndex !== index) {
            errors.push({
                index,
                message: `Duplicate answer option found (Question ${firstIndex + 1}).`
            });
        }
    });

    return errors;
};

export const validateQuestion = (question: string): string[] => {
    const errors: string[] = [];
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
        errors.push("Question cannot be empty.");
    }

    if (trimmedQuestion.length > VALIDATION_CONSTANTS.MAX_QUESTION_LENGTH) {
        errors.push(
            `Question must be shorter than ${VALIDATION_CONSTANTS.MAX_QUESTION_LENGTH} characters.`
        );
    }

    return errors;
};
