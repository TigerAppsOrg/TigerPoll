<script lang="ts">
    import {
        typeLabels,
        type Question,
        type QuestionType
    } from "$lib/utils/poll";
    import Trash from "phosphor-svelte/lib/Trash";
    import { tick } from "svelte";
    import { slide } from "svelte/transition";

    interface Props {
        question: Question;
    }

    const { question }: Props = $props();

    let optionInputs: HTMLInputElement[] = [];

    // Create stable keys for each option
    let optionKeys = $state(question.options.map(() => Symbol()));

    function setQuestionType(type: QuestionType) {
        question.type = type;
    }

    function addOption() {
        question.options = [...question.options, ""];
        optionKeys = [...optionKeys, Symbol()];

        tick().then(() => {
            const lastInput = optionInputs[optionInputs.length - 1];
            if (lastInput) {
                lastInput.focus();
            }
        });
    }

    function deleteOption(index: number) {
        question.options = question.options.filter((_, i) => i !== index);
        optionKeys = optionKeys.filter((_, i) => i !== index);
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
            text-lg font-semibold text-gray-dark outline-none transition-colors focus:border-std-blue-default" />
    </div>

    <!-- Question Type Toggle -->
    <div class="relative mt-4 flex rounded-full bg-gray-light p-1">
        <div
            class="absolute bottom-1 left-1 top-1 w-1/2 rounded-full shadow transition-all duration-300 ease-in-out"
            class:bg-std-violet-light={question.type === "multiple_choice"}
            class:bg-std-orange-light={question.type === "select_all"}
            style:transform={question.type === "select_all"
                ? "translateX(100%)"
                : "translateX(0)"}>
        </div>

        {#each Object.keys(typeLabels) as type (type)}
            {@const isSelected = question.type === type}
            <button
                onclick={() => setQuestionType(type as QuestionType)}
                class="relative z-10 w-1/2 rounded-full py-1.5 text-center text-sm font-medium transition-colors duration-200"
                class:!font-semibold={isSelected}
                class:text-std-violet-dark={isSelected &&
                    type === "multiple_choice"}
                class:text-std-orange-dark={isSelected && type === "select_all"}
                class:text-gray-dark-muted={!isSelected}
                class:hover:bg-gray-light-accent={!isSelected}>
                {typeLabels[type as QuestionType]}
            </button>
        {/each}
    </div>

    <!-- Answer Options List -->
    <div class="mt-4 flex flex-col gap-2">
        {#each question.options as option, index (optionKeys[index])}
            <div
                class="flex items-center gap-2"
                transition:slide={{ duration: 200 }}>
                <input
                    type="text"
                    placeholder="Answer Option"
                    bind:value={question.options[index]}
                    bind:this={optionInputs[index]}
                    onkeydown={(e) => handleOptionKeydown(e, index)}
                    class="h-9 w-full rounded-full border bg-gray-light px-4 text-sm
                text-gray-dark shadow-sm transition-colors
                placeholder:text-gray-light-muted focus:border-std-blue-default focus:outline-none focus:ring-1
                focus:ring-std-blue-default" />
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
            hover:border-std-blue-default">
            + Add Option
        </button>
    </div>
</article>
