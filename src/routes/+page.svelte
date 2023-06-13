<script lang="ts">
  import MobileCollection from '$lib/MobileCollection.svelte';
  import Stage from '$lib/Stage.svelte';
  import type { CollectionQuery } from '$lib/sanity/queries';
  import { isMobile } from '$lib/util/isMobile';
  import { onMount } from 'svelte';
  export let data: CollectionQuery & { isMobile: boolean };

  onMount(() => {
    /**
     * If the useragent string from l
     * ayout.server.ts is incorrect,
     * this should correct it.
     */
    data.isMobile = isMobile();
  });
</script>

{#if data.isMobile}
  <MobileCollection images={data.images} />
{:else}
  <Stage images={data.images} />
{/if}
