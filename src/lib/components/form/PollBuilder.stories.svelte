<script module>
    import PollBuilder from "./PollBuilder.svelte";
    import { defineMeta } from "@storybook/addon-svelte-csf";

    const { Story } = defineMeta({
        title: "Poll Builder",
        component: PollBuilder,
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

<Story name="Default" />
