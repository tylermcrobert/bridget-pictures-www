<script lang="ts">
  let cursor: HTMLElement;
  export let active: boolean;

  function onMouse(e: MouseEvent) {
    const x = e.clientX;
    const y = e.clientY;
    cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }
</script>

<div class="cursor" class:active bind:this={cursor}>
  <div class="cursorInner">
    <slot />
  </div>
</div>

<svelte:window on:mousemove={onMouse} />

<style>
  .cursor {
    position: fixed;
    z-index: var(--z-cursor);
    top: 0;
    left: 0;

    display: none;
    cursor: none;
    pointer-events: none;

    color: white;
    mix-blend-mode: difference;
  }

  .active {
    display: block;
  }

  .cursorInner {
    transform: translate3d(-50%, -50%, 0);
  }
</style>
