<script lang="ts">
  import { onMount } from "svelte";

  let currentId = "";
  let comics: any = [];
  let loading = true;

  const fetchComics = async () => {
    loading = true;
    const output = await (await fetch(`/api/stream?before=${currentId}`)).json();
    currentId = output[output.length - 1].previous;
    comics = [...comics, ...output];
    loading = false;
  };

  const onScroll = async (e: Event) => {
    const el = document.documentElement;
    const offset = Math.min((document.querySelector('img:last-child')?.clientHeight ?? 1000) / 2, 500);

    if (!loading && el.scrollTop + el.clientHeight >= el.scrollHeight - offset) {
        await fetchComics();
    }
  };

  onMount(() => {
    fetchComics();
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  });
</script>

<svelte:head>
  <title>Infinite SMBC</title>
</svelte:head>

<h1>Infinite SMBC</h1>

<p><q>An infinite-scroll SMBC would be <b>devastating</b> to my personal and professional life.</q> — OpenBagTwo, 2024</p>

<div class="comic-stream">
  {#each comics as { id, src, title } (id)}
    <div class="comic">
      <!-- svelte-ignore a11y-missing-attribute -->
      <a href="https://www.smbc-comics.com/{id}">
        <img data-id={id} {src} {title} />
      </a>
    </div>
    <hr />
  {/each}
  {#if loading}
    <p>Loading, please wait...</p>
  {/if}
</div>

<style>
  .comic-stream {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3rem;
  }
  hr {
    width: 25vw;
    margin: 3rem 0;
  }
</style>
