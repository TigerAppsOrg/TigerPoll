<script module>
    import QuestionResults from "./QuestionResults.svelte";
    import { defineMeta } from "@storybook/addon-svelte-csf";

    const { Story } = defineMeta({
        title: "Question Results",
        component: QuestionResults,
    });
</script>

<Story name="Default" />