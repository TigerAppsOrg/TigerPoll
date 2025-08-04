<script lang="ts">
    import { page } from "$app/state";
    import House from "phosphor-svelte/lib/House";
    import Warning from "phosphor-svelte/lib/Warning";
</script>

<svelte:head>
    <title>TigerPoll | Oh Noes!</title>
    <meta property="og:title" content="TigerPoll | Oh Noes!" />
</svelte:head>

<main
    class="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
    <div class="flex min-h-screen items-center justify-center px-6">
        <div class="text-center">
            <!-- Error Icon -->
            <div class="mb-4 flex justify-center">
                <div
                    class="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-std-orange-default to-std-red-default shadow-lg">
                    <Warning class="text-white" size={40} />
                </div>
            </div>

            <!-- Error Title -->
            <h1 class="mb-4 text-7xl font-bold text-std-red-dark md:text-8xl">
                Oh noes!
            </h1>

            <!-- Error Details -->
            <div class="mb-8">
                <h2 class="text-3xl font-light text-gray-dark md:text-5xl">
                    {page.status}
                </h2>
                {#if page.error?.message}
                    <p class="mt-1 text-lg text-gray-dark-muted">
                        {page.error.message}
                    </p>
                {/if}
            </div>

            <!-- CTA Button -->
            <a
                href="/"
                class="group inline-flex items-center gap-3 rounded-2xl bg-std-indigo-dark px-8 py-4 text-xl font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-std-indigo-default hover:shadow-xl">
                <House size={24} />
                Go To Homepage
                <span
                    class="transition-transform duration-300 group-hover:translate-x-1"
                    >→</span>
            </a>
        </div>
    </div>

    <!-- Subtle animated gradient overlay -->
    <div class="pointer-events-none absolute inset-0 opacity-5">
        <div
            class="absolute inset-0 animate-pulse bg-gradient-to-r from-std-orange-default via-transparent to-std-red-default">
        </div>
    </div>
</main>
