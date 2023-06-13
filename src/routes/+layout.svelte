<script lang="ts">
  import Nav from '$lib/Nav.svelte';
  import WindowHeight from '$lib/util/svelte/WindowHeight.svelte';
  import ScrollContainer from '$lib/util/svelte/ScrollContainer.svelte';
  import type { Data } from './+layout';

  import '../styles/globals.scss';
  import 'swiper/css';

  export let data: Data;
</script>

<ScrollContainer>
  <Nav links={data.navRoutes} currentId={data.currentId} />
  <slot />
</ScrollContainer>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<WindowHeight />
