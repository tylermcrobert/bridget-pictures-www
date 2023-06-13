<script lang="ts">
  /**
   * Navigation
   *
   * This is the global nav for both desktop
   * and mobile. On desktop this includes the
   * threshold controls and the index. On
   * mobile it just includes the page navigation.
   */

  import type { NavItem } from './sanity/queries';
  import Mono from './util/svelte/Monospace.svelte';
  import { state, incThreshold, decThreshold } from './stores/state';

  export let links: NavItem[];
  export let currentId: string;
</script>

<nav>
  <div>
    <a href="/">Bridget Baker</a>
  </div>

  <div class="links">
    {#each links as { slug, title }, i}
      {@const comma = i !== links.length - 1 ? ', ' : ''}
      {@const current = slug === currentId}
      <a href={slug} class="link" class:current>{title}</a>{comma}
    {/each}
  </div>

  <div class="threshold">
    <span>Threshold:</span>
    <span>
      <button on:click={decThreshold}>－</button>
      <Mono value={$state.threshold} />
      <button on:click={incThreshold}>＋</button>
    </span>
  </div>

  <div class="index">
    <Mono value={$state.index + 1} />
    <span>/</span>
    <Mono value={$state.length} />
  </div>
</nav>

<style lang="scss">
  @import '../styles/mixins';
  $tablet: map-get($breakpoints, 'tablet') - 1;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: var(--nav-height);
    padding: 0 var(--space-standard);

    position: fixed;
    bottom: 0;
    background: white;

    z-index: var(--z-nav);

    /* Maintain functionality while container is locked */
    pointer-events: all;
  }

  .current {
    font-style: italic;
    text-decoration: underline;
  }

  @media (max-width: $tablet), (hover: none) {
    nav {
      top: 0;
      position: sticky;
    }

    .index,
    .threshold {
      display: none;
    }
  }
</style>
