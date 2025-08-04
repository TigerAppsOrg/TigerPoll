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
    const maxVotes = Math.max(
        ...questionResults.options.map((option) => option.count)
    );
    const optionsWithPercentage = questionResults.options.map((option) => ({
        ...option,
        percentage:
            questionResults.answerCount > 0
                ? Math.round((option.count / questionResults.answerCount) * 100)
                : 0,
        isHighest: option.count === maxVotes && maxVotes > 0
    }));
</script>

<article class="rounded-xl bg-white p-4 shadow-lg">
    <div>
        <h3 class="text-lg font-semibold text-slate-900">
            {questionResults.order}. {questionResults.question}
        </h3>
        <p class="text-sm text-slate-500">
            {TYPE_LABELS[questionResults.type]}
        </p>
    </div>
    <div class="mt-4 flex flex-col gap-2">
        {#each optionsWithPercentage as option}
            <div
                class="relative h-8 overflow-hidden rounded-full bg-slate-50 shadow-sm">
                <div
                    class="absolute h-full rounded-lg transition-all duration-300 {option.isHighest
                        ? 'bg-red-500'
                        : 'bg-blue-500'}"
                    style="width: {option.percentage}%">
                </div>
                <div
                    class="relative z-20 flex h-full w-full items-center justify-between px-4">
                    <span class="text-sm font-medium text-slate-700">
                        {option.answer}
                    </span>
                    <span class="text-sm text-slate-500">
                        {option.percentage}% ({option.count} votes)
                    </span>
                </div>
            </div>
        {/each}
    </div>
</article>
