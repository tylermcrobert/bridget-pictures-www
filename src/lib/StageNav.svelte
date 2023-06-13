<script lang="ts">
  /**
   * Stage Nav
   *
   * This is the experience that happens
   * when a user clicks on an image from
   * the stage. This component just includes
   * the navigation for the gallery and the
   * custom cursor.
   */

  import CustomCursor from './CustomCursor.svelte';
  import type { HistoryItem } from './Stage.svelte';
  import { decIndex, incIndex, state } from './stores/state';
  import decrement from './util/decrement';
  import increment from './util/increment';

  type NavItem = (typeof navItems)[number];
  const navItems = ['prev', 'close', 'next'] as const;

  export let cordHist: HistoryItem[];
  export let isOpen: boolean;
  export let isAnimating: boolean;
  export let minimizeImage: () => void;

  let hoverLabel: NavItem = 'close';

  $: active = isOpen && !isAnimating;

  /**
   * handlers for click and key events.
   * Different input sources to accomplish
   * the same thing.
   */

  function handleClick(type: NavItem) {
    if (type === 'prev') prevImage();
    if (type === 'close') minimizeImage();
    if (type === 'next') nextImage();
  }

  function handleKey({ key }: KeyboardEvent) {
    if (!isOpen || isAnimating) return;
    if (key === 'ArrowLeft') prevImage();
    if (key === 'Escape') minimizeImage();
    if (key === 'ArrowRight') nextImage();
  }

  /**
   * Functions to handle prev/next images.
   * Accomplished by shifting the underlying cord
   * history by incrementing the index. This is done
   * so that the trail is populated by the most
   * recent previous images.
   */

  function nextImage() {
    if (isAnimating) return;
    cordHist = cordHist.map((item) => {
      return { ...item, i: increment(item.i, $state.length) };
    });

    incIndex();
  }

  function prevImage() {
    if (isAnimating) return;
    cordHist = cordHist.map((item) => {
      return { ...item, i: decrement(item.i, $state.length) };
    });

    decIndex();
  }
</script>

<div class="navOverlay" class:active>
  {#each navItems as navItem}
    <div
      class="overlay"
      class:navItem
      on:click={() => handleClick(navItem)}
      on:keydown={() => handleClick(navItem)}
      on:mouseover={() => (hoverLabel = navItem)}
      on:focus={() => (hoverLabel = navItem)}
    />
  {/each}
</div>

<CustomCursor {active}>
  {hoverLabel.toUpperCase()}
</CustomCursor>

<svelte:window on:keydown={handleKey} />

<style lang="scss">
  .navOverlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: var(--z-nav-gallery);

    width: 100vw;
    height: calc(var(--window-height) - var(--nav-height));

    display: flex;
    cursor: none;

    &:not(.active) {
      pointer-events: none;
      display: none;
    }
  }

  .overlay {
    flex: 1;
  }
</style>
