<script module>
    import QuestionEdit from "./QuestionEdit.svelte";
    import { defineMeta } from "@storybook/addon-svelte-csf";

    const { Story } = defineMeta({
        title: "Question Edit",
        component: QuestionEdit
    });
</script>

<Story
    name="Default"
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
    name="Blank"
    args={{
        question: {
            id: 2,
            pollId: 123,
            type: "multiple_choice",
            order: 2,
            question: "",
            options: ["", ""]
        }
    }} />
