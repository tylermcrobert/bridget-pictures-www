<script lang="ts">
  import { scroll } from '$lib/stores/scroll';
</script>

<div class="scrollContainer" class:disableScroll={!$scroll}>
  <slot />
</div>

<style>
  .scrollContainer {
    position: fixed;
    top: 0;
    z-index: 0;

    width: 100vw;
    height: var(--window-height);

    overflow-y: scroll;
    overflow-x: hidden;
    background: white;

    overscroll-behavior: none;
    -webkit-overflow-scrolling: none;
  }

  .disableScroll {
    pointer-events: none;
  }
</style>
