<script module>
    import Thing from "./Thing.svelte";
    import { defineMeta } from "@storybook/addon-svelte-csf";

    const { Story } = defineMeta({
        title: "The Thing",
        component: Thing,
    });
</script>

<Story name="Default" />