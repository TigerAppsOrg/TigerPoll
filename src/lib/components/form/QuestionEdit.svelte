<script lang="ts">
    import {
        type Question,
        typeLabels,
        type QuestionType
    } from "$lib/utils/poll";
    import { flip } from "svelte/animate";
    import { slide } from "svelte/transition";
    import { tick } from "svelte";
    import Trash from "phosphor-svelte/lib/Trash";

    interface Props {
        question: Question;
    }

    const { question }: Props = $props();

    let optionInputs: HTMLInputElement[] = [];

    function setQuestionType(type: QuestionType) {
        question.type = type;
    }

    function addOption() {
        question.options = [...question.options, ""];

        tick().then(() => {
            const lastInput = optionInputs[optionInputs.length - 1];
            if (lastInput) {
                lastInput.focus();
            }
        });
    }

    function deleteOption(index: number) {
        question.options = question.options.filter((_, i) => i !== index);
    }

    async function handleOptionKeydown(event: KeyboardEvent, index: number) {
        if (event.key === "Enter") {
            event.preventDefault();

            if (index === question.options.length - 1) {
                addOption();
            } else {
                // Otherwise, focus the next option input
                const nextInput = optionInputs[index + 1];
                if (nextInput) {
                    nextInput.focus();
                }
            }
        }
    }
</script>

<article class="rounded-xl bg-white p-4 shadow-lg">
    <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-dark">
            Question {question.order}
        </h3>
    </div>

    <!-- Question Text Input -->
    <div>
        <input
            type="text"
            bind:value={question.question}
            placeholder="Type your question here..."
            class="w-full border-b-2 border-gray-light bg-transparent pb-1
            text-lg font-semibold text-gray-dark outline-none transition-colors focus:border-std-orange-default" />
    </div>

    <!-- Question Type Toggle -->
    <div class="mt-4 flex rounded-full bg-gray-light p-1">
        {#each Object.keys(typeLabels) as type (type)}
            {@const isSelected = question.type === type}
            <button
                onclick={() => setQuestionType(type as QuestionType)}
                class="w-1/2 rounded-full py-1.5 text-center text-sm font-medium transition-colors duration-200
                {isSelected
                    ? 'bg-std-yellow-default text-gray-light shadow'
                    : 'text-gray-dark-muted hover:bg-gray-light-accent'}">
                {typeLabels[type as QuestionType]}
            </button>
        {/each}
    </div>

    <!-- Answer Options List -->
    <div class="mt-4 flex flex-col gap-2">
        {#each question.options as option, index (index)}
            <div
                class="flex items-center gap-2"
                animate:flip={{ duration: 250 }}
                transition:slide={{ duration: 200 }}>
                <input
                    type="text"
                    placeholder="Answer Option"
                    bind:value={question.options[index]}
                    bind:this={optionInputs[index]}
                    onkeydown={(e) => handleOptionKeydown(e, index)}
                    class="h-9 w-full rounded-full border bg-gray-light px-4 text-sm
                    text-gray-dark shadow-sm transition-colors
                    placeholder:text-gray-dark-muted focus:border-std-orange-default focus:outline-none focus:ring-1
                    focus:ring-std-orange-default" />
                <button
                    onclick={() => deleteOption(index)}
                    title="Delete option"
                    aria-label="Delete option"
                    class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-gray-dark-muted transition-colors hover:bg-red-100 hover:text-red-600">
                    <Trash size={16} />
                </button>
            </div>
        {/each}
    </div>

    <!-- Add Option Button -->
    <div class="mt-4">
        <button
            onclick={addOption}
            class="w-full rounded-full border-2 border-dashed border-gray-light py-1.5
            text-sm font-semibold text-gray-dark-muted transition-colors
            hover:border-std-orange-default hover:text-std-orange-default">
            + Add Option
        </button>
    </div>
</article>
