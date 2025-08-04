<script module>
    import Question from "./Question.svelte";
    import { defineMeta } from "@storybook/addon-svelte-csf";

    const { Story } = defineMeta({
        title: "Question",
        component: Question,
        argTypes: {
            answerColor: {
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
        question: {
            id: 1,
            pollId: 123,
            type: "multiple_choice",
            order: 1,
            question: "What's your favorite programming language?",
            options: ["JavaScript", "Python", "TypeScript", "Go"]
        }
    }} />

<Story
    name="Select All"
    args={{
        question: {
            id: 2,
            pollId: 123,
            type: "select_all",
            order: 2,
            question: "What's your favorite dining hall(s)?",
            options: ["RoMa", "Whitman", "Yeh/NCW", "Forbes", "CJL"]
        }
    }} />
