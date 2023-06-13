<script lang="ts">
  /**
   * Window Height
   *
   * Sets window height for mobile because
   * it doesn't work right otherwise.
   */

  let windowHeight: number;

  function setWindowHeight(height: number) {
    if (typeof document === 'undefined') return;
    const doc = document.documentElement;
    doc.style.setProperty('--window-height', `${height}px`);
  }

  $: setWindowHeight(windowHeight);
</script>

<svelte:window bind:innerHeight={windowHeight} />
