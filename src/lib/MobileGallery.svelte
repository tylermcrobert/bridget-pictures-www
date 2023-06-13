<script lang="ts">
  /**
   * Mobile Gallery
   *
   * The mobile gallery is the modal window
   * that slides up when a user clicks on
   * an image from the stage. This is powerd
   * by a Swiperjs gallery instance.
   */

  import { onMount } from 'svelte';
  import Swiper from 'swiper';
  import Mono from './util/svelte/Monospace.svelte';
  import { state, setIndex } from './stores/state';
  import { gsap, Power3 } from 'gsap';
  import { disableScroll, enableScroll } from './stores/scroll';

  export let imageUrls: { lores: string; hires: string }[];
  export let imgEls: HTMLElement[];

  let swiperNode: HTMLElement;
  let gallery: HTMLElement;
  let curtain: HTMLElement;
  let swiper: Swiper | null;

  let isAnimating = false;
  let isHires = false;

  /**
   * Set up swiper instance and sync
   * global state with swiper state
   */

  onMount(() => {
    enableScroll();
    swiper = new Swiper(swiperNode, { spaceBetween: 20 });
    swiper.on('slideChange', ({ realIndex }) => {
      setIndex(realIndex);
    });
  });

  function changeSlide(slide: number) {
    swiper?.slideTo(slide, 0);
  }

  function scrollToActive() {
    imgEls[$state.index].scrollIntoView({
      block: 'center',
      behavior: 'auto'
    });
  }

  /**
   * Slide functions
   *
   * GSAP animations that handle the
   * sliding up and sliding down of
   * the gallery. Slide up is exported
   * to be called from the parent.
   */

  /**
   * Slide gallery up
   */

  export function slideUp() {
    if (isAnimating) return;
    isAnimating = true;

    gsap.to(curtain, {
      opacity: 1,
      duration: 1
    });

    gsap.to(gallery, {
      y: 0,
      ease: Power3.easeInOut,
      duration: 1,
      delay: 0.4
    });

    setTimeout(() => {
      disableScroll();
      isAnimating = false;
      isHires = true;
    }, 1200);
  }

  /**
   * Slide back down
   */

  function slideDown() {
    enableScroll();
    scrollToActive();

    gsap.to(gallery, {
      y: '100%',
      ease: Power3.easeInOut,
      duration: 1
    });

    gsap.to(curtain, {
      opacity: 0,
      delay: 0.4,
      duration: 1.2
    });
  }

  /**
   * Set swiper slide when global
   * state changes
   */

  $: changeSlide($state.index);
</script>

<div class="gallery" bind:this={gallery}>
  <div bind:this={swiperNode} class="galleryInner">
    <div class="swiper-wrapper">
      {#each imageUrls as { lores, hires }}
        <div class="swiper-slide">
          <img src={isHires ? hires : lores} alt="Bridget Baker" />
        </div>
      {/each}
    </div>
  </div>

  <div class="nav">
    <div>
      <Mono value={$state.index + 1} /> / <Mono value={$state.length} />
    </div>
    <div on:click={slideDown} on:keydown={slideDown}>Close</div>
  </div>
</div>

<div class="curtain" bind:this={curtain} />

<style>
  .gallery {
    pointer-events: all;

    position: fixed;
    top: var(--nav-height);
    z-index: var(--z-nav-gallery);

    display: flex;
    flex-direction: column;

    width: 100vw;
    height: calc(var(--window-height) - var(--nav-height));
    background: white;
    transform: translate3d(0, 100%, 0);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .galleryInner {
    flex: 1;
    height: 0;
  }

  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav {
    height: var(--nav-height);
    padding: var(--space-standard);

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .curtain {
    position: fixed;
    top: 0;
    left: 0;
    z-index: var(--z-curtain);

    width: 100vw;
    height: var(--window-height);

    background: rgba(0, 0, 0, 0.5);
    opacity: 0;

    pointer-events: none;
  }
</style>
