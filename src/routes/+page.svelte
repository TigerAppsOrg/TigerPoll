<script lang="ts">
    import { onMount } from "svelte";
    import ArrowRight from "phosphor-svelte/lib/ArrowRight";
    import ChartBar from "phosphor-svelte/lib/ChartBar";
    import Users from "phosphor-svelte/lib/Users";
    import Lightning from "phosphor-svelte/lib/Lightning";
    import Question from "phosphor-svelte/lib/Question";
    import CheckCircle from "phosphor-svelte/lib/CheckCircle";
    import TrendUp from "phosphor-svelte/lib/TrendUp";
    import Heart from "phosphor-svelte/lib/Heart";

    let mounted = $state(false);
    let floatingBoxes = $state([
        {
            id: 1,
            x: 10,
            y: 20,
            rotation: -5,
            delay: 0,
            icon: Question,
            color: "std-violet"
        },
        {
            id: 2,
            x: 85,
            y: 15,
            rotation: 8,
            delay: 200,
            icon: CheckCircle,
            color: "std-blue"
        },
        {
            id: 3,
            x: 5,
            y: 70,
            rotation: 3,
            delay: 400,
            icon: TrendUp,
            color: "std-green"
        },
        {
            id: 4,
            x: 90,
            y: 75,
            rotation: -8,
            delay: 600,
            icon: Heart,
            color: "std-orange"
        }
    ]);

    onMount(() => {
        setTimeout(() => {
            mounted = true;
        }, 100);
    });
</script>

<svelte:head>
    <title>TigerPoll - Polls for Princeton Students</title>
    <meta
        name="description"
        content="Create and answer informal polls for the Princeton University student body. Built by TigerApps and Princeton USG." />
</svelte:head>

<main
    class="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
    <!-- Floating Background Boxes -->
    {#each floatingBoxes as box}
        <div
            class="absolute h-20 w-20 rounded-xl opacity-60 shadow-lg transition-all duration-1000 ease-out"
            class:translate-y-0={mounted}
            class:translate-y-8={!mounted}
            class:opacity-80={mounted}
            style="
                left: {box.x}%; 
                top: {box.y}%; 
                transform: rotate({box.rotation}deg);
                transition-delay: {box.delay}ms;
            "
            class:bg-std-violet-light={box.color === "std-violet"}
            class:bg-std-blue-light={box.color === "std-blue"}
            class:bg-std-green-light={box.color === "std-green"}
            class:bg-std-orange-light={box.color === "std-orange"}>
            <div class="flex h-full w-full items-center justify-center">
                <svelte:component
                    this={box.icon}
                    size={24}
                    class={box.color === "std-violet"
                        ? "text-std-violet-dark"
                        : box.color === "std-blue"
                          ? "text-std-blue-dark"
                          : box.color === "std-green"
                            ? "text-std-green-dark"
                            : "text-std-orange-dark"} />
            </div>
        </div>
    {/each}

    <!-- Main Content Container -->
    <div
        class="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12">
        <!-- Header with Logo/Title -->
        <div
            class="mb-8 text-center transition-all duration-700 ease-out"
            class:translate-y-0={mounted}
            class:opacity-100={mounted}
            class:translate-y-8={!mounted}
            class:opacity-0={!mounted}>
            <div class="mb-4 flex items-center justify-center gap-4">
                <div
                    class="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-std-violet-default to-std-indigo-default shadow-lg">
                    <ChartBar class="text-white" size={32} />
                </div>
                <h1
                    class="bg-gradient-to-r from-std-violet-dark to-std-indigo-dark bg-clip-text py-4 text-6xl font-bold text-transparent">
                    TigerPoll
                </h1>
            </div>
            <p class="max-w-2xl text-xl text-gray-dark-muted">
                Create and answer informal polls for the Princeton University
                student body
            </p>
        </div>

        <!-- Feature Cards -->
        <div
            class="mb-12 grid w-full max-w-4xl grid-cols-1 gap-6 transition-all duration-700 ease-out md:grid-cols-3"
            class:translate-y-0={mounted}
            class:opacity-100={mounted}
            class:translate-y-8={!mounted}
            class:opacity-0={!mounted}
            style="transition-delay: 200ms;">
            <div
                class="rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div
                    class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-std-orange-light">
                    <Lightning class="text-std-orange-dark" size={20} />
                </div>
                <h3 class="mb-2 text-lg font-semibold text-gray-dark">
                    Quick & Easy
                </h3>
                <p class="text-sm text-gray-dark-muted">
                    Create polls in seconds and get instant feedback from your
                    peers
                </p>
            </div>

            <div
                class="rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div
                    class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-std-blue-light">
                    <Users class="text-std-blue-dark" size={20} />
                </div>
                <h3 class="mb-2 text-lg font-semibold text-gray-dark">
                    Princeton Only
                </h3>
                <p class="text-sm text-gray-dark-muted">
                    Exclusive to Princeton students for authentic campus
                    opinions
                </p>
            </div>

            <div
                class="rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div
                    class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-std-green-light">
                    <ChartBar class="text-std-green-dark" size={20} />
                </div>
                <h3 class="mb-2 text-lg font-semibold text-gray-dark">
                    Real Results
                </h3>
                <p class="text-sm text-gray-dark-muted">
                    Beautiful charts and instant analytics for your polls
                </p>
            </div>
        </div>

        <!-- CTA Section -->
        <div
            class="text-center transition-all duration-700 ease-out"
            class:translate-y-0={mounted}
            class:opacity-100={mounted}
            class:translate-y-8={!mounted}
            class:opacity-0={!mounted}
            style="transition-delay: 400ms;">
            <a
                href="/login"
                class="group inline-flex items-center gap-3 rounded-2xl bg-std-violet-dark px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-std-violet-default hover:shadow-xl">
                Get Started
                <ArrowRight
                    class="transition-transform duration-300 group-hover:translate-x-1"
                    size={20} />
            </a>
            <p class="mt-4 text-sm text-gray-dark-muted">
                Sign in with your Princeton NetID
            </p>
        </div>

        <!-- Footer Credits -->
        <div
            class="mt-16 text-center transition-all duration-700 ease-out"
            class:translate-y-0={mounted}
            class:opacity-100={mounted}
            class:translate-y-8={!mounted}
            class:opacity-0={!mounted}
            style="transition-delay: 600ms;">
            <p class="text-sm text-gray-dark-muted">
                Built in collaboration between
                <a
                    href="https://tigerapps.org"
                    target="_blank"
                    rel="noopener"
                    class="font-medium text-std-orange-dark transition-colors hover:text-std-orange-default">
                    TigerApps
                </a>
                and
                <a
                    href="https://usg.princeton.edu"
                    target="_blank"
                    rel="noopener"
                    class="font-medium text-std-orange-dark transition-colors hover:text-std-orange-default">
                    Princeton USG
                </a>
            </p>
        </div>
    </div>

    <!-- Animated gradient overlay for extra visual interest -->
    <div class="pointer-events-none absolute inset-0 opacity-5">
        <div
            class="absolute inset-0 animate-pulse bg-gradient-to-r from-std-violet-default via-transparent to-std-indigo-default">
        </div>
    </div>
</main>

<style>
    @keyframes float {
        0%,
        100% {
            transform: translateY(0px) rotate(var(--rotation));
        }
        50% {
            transform: translateY(-10px) rotate(var(--rotation));
        }
    }

    .floating-box {
        animation: float 6s ease-in-out infinite;
    }
</style>
