<script lang="ts">
    import { typeLabels, type Question } from "$lib/utils/poll";
    import type { Color } from "$lib/utils/theme";

    interface Props {
        question: Question;
        answerColor?: Color;
    }

    const { question, answerColor = "orange" }: Props = $props();
</script>

<article class="rounded-xl bg-white p-4 shadow-lg">
    <div>
        <h3 class="text-lg font-semibold text-gray-dark">
            {question.order}. {question.question}
        </h3>
        <p class="text-sm italic text-gray-dark-muted">
            {typeLabels[question.type]}
        </p>
    </div>
    <div class="mt-4 flex flex-col gap-2">
        {#each question.options as option}
            <button
                class="relative h-8 overflow-hidden rounded-full bg-gray-light shadow-sm">
                <div
                    class="relative z-20 flex h-full w-full items-center justify-between px-4">
                    <span class="text-sm font-medium">
                        {option}
                    </span>
                </div>
            </button>
        {/each}
    </div>
</article>
