<script context="module" lang="ts">
  export type HistoryItem = { i: number; x: number; y: number };
</script>

<script lang="ts">
  /**
   * Stage
   *
   * This is the main experience for the
   * desktop version of the site. It is a
   * rotating sequence of images that are
   * plotted behind the user's cursor.
   */

  import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
  import StageNav from './StageNav.svelte';
  import { incIndex, initState, state } from './stores/state';
  import { gsap, Power3 } from 'gsap';
  import { urlFor } from './sanity/client';

  export let images: SanityImageSource[];

  let imgs: HTMLElement[] = [];

  let last = { x: 0, y: 0 };
  let cordHist: HistoryItem[] = [];
  let isOpen = false;
  let isAnimating = false;

  let windowHeight: number;
  let windowWidth: number;

  $: elTrail = cordHist.map((item) => imgs[item.i]);
  $: elTrailCurrent = elTrail.slice(-$state.trailLength);
  $: elTrailInactive = elTrailCurrent.slice(0, elTrailCurrent.length - 1);
  $: elCurrent = elTrail[elTrail.length - 1];

  $: hires = isOpen !== isAnimating;

  /**
   * Checks for mouse moving and increments
   * when threshold is met. This is accomplished
   * by adding an entry to the cordHist which
   * a record of which images have been plotted.
   */

  function onMouse(e: MouseEvent) {
    if (isOpen || isAnimating) return;
    const cords = { x: e.clientX, y: e.clientY };
    const travelDist = Math.hypot(cords.x - last.x, cords.y - last.y);

    if (travelDist > $state.threshold) {
      last = cords;
      incIndex();

      const newHist = { i: $state.index, ...cords };
      cordHist = [...cordHist, newHist].slice(-$state.length);
    }
  }

  /**
   * Runs on each increment of index history
   * changing. Uses GSAP to instantly set
   * images in place.
   */

  function setPositions() {
    if (!elTrail.length) return;

    gsap.set(elTrail, {
      x: (i) => cordHist[i].x - windowWidth / 2,
      y: (i) => cordHist[i].y - windowHeight / 2,
      opacity: (i) => (i + 1 + $state.trailLength <= cordHist.length ? 0 : 1),
      zIndex: (i) => i,
      scale: 0.6
    });

    if (isOpen) {
      gsap.set(imgs, { opacity: 0 });
      gsap.set(elCurrent, { scale: 1, x: 0, y: 0, opacity: 1 });
    }
  }

  /**
   * Opens image into navigation. Starts by fading
   * out and down the inactive image trails and
   * sliding main image to the center, followed
   * finally by it scaling up.
   */

  function expandImage() {
    if (isAnimating) return;

    isOpen = true;
    isAnimating = true;

    const tl = gsap.timeline();
    tl.to(elTrailInactive, {
      y: '+=20',
      ease: Power3.easeIn,
      stagger: 0.075,
      duration: 0.3,
      delay: 0.1,
      opacity: 0
    });
    tl.to(elCurrent, {
      x: 0,
      y: 0,
      ease: Power3.easeInOut,
      duration: 0.7,
      delay: 0.3
    });
    tl.to(elCurrent, {
      delay: 0.1,
      scale: 1,
      ease: Power3.easeInOut
    });
    tl.then(() => (isAnimating = false));
  }

  /**
   * Closes navigation and goes back to stage.
   * Starts by scaling image down, moving it
   * into the center and reverse sliding and
   * fading in trail images.
   */

  function minimizeImage() {
    if (isAnimating) return;

    isOpen = false;
    isAnimating = true;

    const tl = gsap.timeline();
    tl.to(elCurrent, {
      scale: 0.6,
      duration: 0.6,
      ease: Power3.easeInOut
    });
    tl.to(elCurrent, {
      delay: 0.3,
      duration: 0.7,
      ease: Power3.easeInOut,
      x: cordHist[cordHist.length - 1].x - windowWidth / 2,
      y: cordHist[cordHist.length - 1].y - windowHeight / 2
    });
    tl.to(elTrailInactive, {
      y: '-=20',
      ease: Power3.easeOut,
      stagger: -0.1,
      duration: 0.3,
      opacity: 1
    });
    tl.then(() => (isAnimating = false));
  }

  /**
   * - initialize state to keep add trail length.
   * - Keep element positions synced with cord history
   */

  initState(images.length);
  $: cordHist, setPositions();
</script>

<div class="stage" on:click={expandImage} on:keydown={expandImage}>
  {#each images as src, i}
    <img
      src={urlFor(src)
        .height(hires ? 1600 : 900)
        .quality(hires ? 80 : 70)
        .auto('format')
        .url()}
      alt="Bridget Baker"
      bind:this={imgs[i]}
    />
  {/each}
</div>

<StageNav {isOpen} {isAnimating} {minimizeImage} bind:cordHist />

<svelte:window
  on:mousemove={onMouse}
  bind:innerHeight={windowHeight}
  bind:innerWidth={windowWidth}
/>

<style>
  .stage {
    position: relative;
    overflow: hidden;
    width: 100vw;
    height: calc(var(--window-height) - var(--nav-height));

    cursor: pointer;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;

    width: 100vw;
    height: var(--window-height);
    object-fit: contain;

    transform: scale(0.6);
    opacity: 0;
    pointer-events: none;
  }
</style>
