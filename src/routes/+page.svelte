<svelte:head>
    <title>Infinite SMBC</title> 
</svelte:head>

<script lang="ts">
    import { onMount } from "svelte";

    let comics: any[] = [];

    onMount(async () => {
        const response = await fetch('/api/infinite-stream');
        const output: any = await response.json();
        comics = output.comics;
    });
</script>

<h1>Infinite SMBC</h1>

<p><q>An infinite-scroll SMBC would be <b>devastating</b> to my personal and professional life.</q> — OpenBagTwo, 2024</p>

{#each comics as comic}
  <img src="{comic.src}" alt="{comic.alt}" />
{/each}