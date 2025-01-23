<script lang="ts">
    import { page } from "$app/state";
</script>

<svelte:head>
    <title>TigerPoll | Oh Noes!</title>
    <meta property="og:title" content="TigerPoll | Oh Noes!" />
</svelte:head>

<div class="flex h-[80vh] items-center justify-center">
    <div class="text-center">
        <h1 class="mb-2 text-9xl font-bold">
            <span class="">Oh</span>
            <span class="">noes!</span>
        </h1>
        <h2 class="mb-8 text-5xl font-light text-zinc-700">
            {page.status}
            {page.error?.message}
        </h2>
        <a href="/">
            <button class="text-2xl"> Go To Homepage → </button>
        </a>
    </div>
</div>
