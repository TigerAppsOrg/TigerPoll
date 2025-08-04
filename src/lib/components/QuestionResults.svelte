<script lang="ts">
    import type { QuestionType } from "$lib/server/types";
    import type { QuestionResults } from "$lib/utils/poll";
    import { colorMap, type Color } from "$lib/utils/theme";
    import SealCheck from "phosphor-svelte/lib/SealCheck";

    interface Props {
        questionResults: QuestionResults;
        winnerColor?: Color;
        defaultColor?: Color;
    }

    const TYPE_LABELS: Record<QuestionType, string> = {
        multiple_choice: "Multiple Choice",
        select_all: "Select All That Apply"
    };

    const {
        questionResults,
        winnerColor = "red",
        defaultColor = "indigo"
    }: Props = $props();

    const maxVotes = Math.max(
        ...questionResults.options.map((option) => option.count)
    );

    const optionsWithPercentage = questionResults.options
        .map((option) => ({
            ...option,
            percentage:
                questionResults.answerCount > 0
                    ? Math.round(
                          (option.count / questionResults.answerCount) * 100
                      )
                    : 0,
            isHighest: option.count === maxVotes && maxVotes > 0
        }))
        .sort((a, b) => b.count - a.count);

    function getColorClasses(isWinner: boolean) {
        const selectedColor = isWinner ? winnerColor : defaultColor;
        return colorMap[selectedColor];
    }
</script>

<article class="rounded-xl bg-white p-4 shadow-lg">
    <div>
        <h3 class="text-gray-dark text-lg font-semibold">
            {questionResults.order}. {questionResults.question}
        </h3>
        <p class="text-gray-dark-muted text-sm italic">
            {TYPE_LABELS[questionResults.type]}
        </p>
    </div>
    <div class="mt-4 flex flex-col gap-2">
        {#each optionsWithPercentage as option}
            {@const colorClasses = getColorClasses(option.isHighest)}
            <div
                class="bg-gray-light relative h-8 overflow-hidden rounded-full shadow-sm">
                <div
                    class="absolute h-full rounded-lg transition-all duration-300 {colorClasses.light}"
                    style="width: {option.percentage}%">
                </div>
                <div
                    class="relative z-20 flex h-full w-full items-center justify-between px-4 {colorClasses.dark}">
                    <span class="text-sm font-medium">
                        {option.answer}
                    </span>
                    <div class="flex items-center gap-2">
                        {#if option.isHighest}
                            <SealCheck class="text-orange-dark" size={16} />
                        {/if}
                        <span class="text-sm">
                            {option.percentage}% ({option.count} votes)
                        </span>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</article>
