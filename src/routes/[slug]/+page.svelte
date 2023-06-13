<script lang="ts">
  import RootPage from '../+page.svelte';
  import type { CollectionQuery } from '$lib/sanity/queries';
  export let data: CollectionQuery & { isMobile: boolean };
</script>

{#key data.title}
  <RootPage {data} />
{/key}
