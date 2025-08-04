<script lang="ts">
    import { typeLabels, type Question } from "$lib/utils/poll";
    import { colorMap, type Color } from "$lib/utils/theme";

    interface Props {
        question: Question;
        answerColor?: Color;
    }

    const { question, answerColor = "orange" }: Props = $props();

    let selectedOptions = $state<string[]>([]);

    function toggleOption(option: string) {
        if (question.type === "multiple_choice") {
            selectedOptions = [option];
        } else {
            // For other question types that allow multiple selections
            if (selectedOptions.includes(option)) {
                selectedOptions = selectedOptions.filter(
                    (selected) => selected !== option
                );
            } else {
                selectedOptions = [...selectedOptions, option];
            }
        }
    }

    function isSelected(option: string): boolean {
        return selectedOptions.includes(option);
    }

    function getColorClasses(isSelected: boolean) {
        if (isSelected) {
            return colorMap[answerColor];
        }
        return {
            light: "hover:bg-gray-light-accent",
            dark: "text-gray-dark"
        };
    }
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
            {@const colorClasses = getColorClasses(isSelected(option))}
            <button
                class="relative h-8 overflow-hidden rounded-full bg-gray-light shadow-sm transition-colors duration-200 {isSelected(
                    option
                )
                    ? colorClasses.light
                    : 'hover:bg-gray-light-accent'}"
                onclick={() => toggleOption(option)}>
                <div
                    class="relative z-20 flex h-full w-full items-center justify-center px-4 {isSelected(
                        option
                    )
                        ? colorClasses.dark
                        : 'text-gray-dark'}">
                    <span class="text-sm font-medium">
                        {option}
                    </span>
                </div>
            </button>
        {/each}
    </div>
</article>
