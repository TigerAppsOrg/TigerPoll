<script module>
    import QuestionResults from "./QuestionResults.svelte";
    import { defineMeta } from "@storybook/addon-svelte-csf";

    const { Story } = defineMeta({
        title: "Question Results",
        component: QuestionResults,
    });
</script>

<Story name="Default" 
        args={{
        questionResults: {
            id: "1",
            poll_id: 123,
            type: "multiple_choice",
            order: 1,
            question: "What's your favorite programming language?",
            options: [
                { answer: "JavaScript", count: 45 },
                { answer: "Python", count: 32 },
                { answer: "TypeScript", count: 28 },
                { answer: "Go", count: 15 }
            ]
        }
    }}
/>