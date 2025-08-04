<script lang="ts">
    import type { QuestionType } from "$lib/server/types";
    import type { QuestionResults } from "$lib/utils/poll";

    interface Props {
        questionResults: QuestionResults;
    }

    const TYPE_LABELS: Record<QuestionType, string> = {
        multiple_choice: "Multiple Choice",
        select_all: "Select All That Apply"
    };

    const { questionResults }: Props = $props();
</script>

<article class="rounded-xl bg-white p-4 shadow-lg">
    <div>
        <h3 class="text-lg font-semibold text-gray-900">
            {questionResults.order}. {questionResults.question}
        </h3>
        <p class="text-sm text-gray-500">
            {TYPE_LABELS[questionResults.type]}
        </p>
    </div>
    <div class="mt-4 flex flex-col gap-2">
        {#each questionResults.options as option}
    {/each}
    </div>
</article>
