<script module>
    import QuestionResults from "./QuestionResults.svelte";
    import { defineMeta } from "@storybook/addon-svelte-csf";

    const { Story } = defineMeta({
        title: "Question Results",
        component: QuestionResults,
        argTypes: {
            winnerColor: {
                control: { type: "select" },
                options: [
                    "red",
                    "orange",
                    "yellow",
                    "green",
                    "blue",
                    "indigo",
                    "violet"
                ],
                type: { name: "string" } // Override the inferred type
            },
            defaultColor: {
                control: { type: "select" },
                options: [
                    "red",
                    "orange",
                    "yellow",
                    "green",
                    "blue",
                    "indigo",
                    "violet"
                ],
                type: { name: "string" } // Override the inferred type
            }
        }
    });
</script>

<Story
    name="Multiple Choice"
    args={{
        questionResults: {
            id: "1",
            pollId: 123,
            type: "multiple_choice",
            order: 1,
            question: "What's your favorite programming language?",
            answerCount: 120,
            options: [
                { answer: "JavaScript", count: 45 },
                { answer: "Python", count: 32 },
                { answer: "TypeScript", count: 28 },
                { answer: "Go", count: 15 }
            ]
        },
        winnerColor: "green",
        defaultColor: "indigo"
    }} />

<Story
    name="Select All"
    args={{
        questionResults: {
            id: "2",
            pollId: 123,
            type: "select_all",
            order: 2,
            question: "What's your favorite dining hall(s)?",
            answerCount: 30,
            options: [
                { answer: "RoMa", count: 27 },
                { answer: "Whitman", count: 0 },
                { answer: "Yeh/NCW", count: 10 },
                { answer: "Forbes", count: 29 },
                { answer: "CJL", count: 5 }
            ]
        },
        winnerColor: "red",
        defaultColor: "blue"
    }} />
