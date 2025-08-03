<script lang="ts">
    import type { QuestionResults } from "$lib/utils/poll";

    interface Props {
        questionResults: QuestionResults;
    }

    const { questionResults }: Props = $props();
</script>


