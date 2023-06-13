<script lang="ts">
  /**
   * Mobile Collection
   *
   * This is the module that shows on mobile.
   * Module includes the scrollable
   * scattered images
   */

  import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
  import { urlFor } from './sanity/client';
  import getRandom from './util/getRandom';
  import { onMount } from 'svelte';
  import { initState, setIndex } from './stores/state';
  import MobileGallery from './MobileGallery.svelte';

  export let images: SanityImageSource[];
  let imgEls: HTMLElement[] = [];
  let mounted = false;
  let slideUp: () => void;

  const imageUrls = images.map((image) => ({
    lores: urlFor(image).width(600).quality(70).auto('format').url(),
    hires: urlFor(image).width(900).quality(80).auto('format').url()
  }));

  function handleClick(i: number) {
    setIndex(i);
    slideUp();
  }

  /**
   * must hide before mount because svelte
   * renders random nums on the server and
   * then rerenders with new values
   */

  onMount(() => (mounted = true));

  initState(images.length);
</script>

<div class="container" class:hidden={!mounted}>
  {#each imageUrls as { lores }, i}
    {@const x = i !== 0 ? getRandom(-25, 25) : 0}
    {@const y = i !== 0 ? getRandom(-30, 30) : 0}

    <img
      on:click={() => handleClick(i)}
      on:keydown={() => handleClick(i)}
      style={`transform: translate3d(${x}%, ${y - 50}%, 0)`}
      src={lores}
      alt="Bridget Baker"
      bind:this={imgEls[i]}
    />
  {/each}
</div>

<MobileGallery {imageUrls} {imgEls} bind:slideUp />

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    gap: 20vh;

    padding-top: 50vh;
    margin-top: calc(var(--nav-height) * -1);

    img {
      position: sticky;
      top: 50vh;

      width: 60vw;
      height: 20vh;

      object-fit: contain;

      transform: translate3d(0, -50%, 0);
      align-self: center;

      &:last-child {
        margin-bottom: 20vh;
      }
    }
  }

  .hidden {
    display: none;
  }
</style>
