<script lang="ts">
  /**
   * Monospace
   *
   * This is a small utility that splits
   * characters and puts them in evenly
   * spaced container. This is used for
   * numbers so that when they change it
   * doesn't cause the width of the
   * lockup to change.
   */

  export let value: number | string;
  $: leadingZeros = value.toString().padStart(4, '0');
</script>

{#each leadingZeros.split('') as num}
  <span class="num">{num}</span>
{/each}

<style>
  .num {
    width: 0.625em;
    display: inline-block;
    text-align: center;
  }
</style>
