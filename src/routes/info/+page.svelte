<script>
  import { initState } from '$lib/stores/state';
  initState(0);
</script>

<article class="info">
  <div class="section">
    Bridget Baker is a photographer and artist based in Seattle, WA exploring
    shape and form by camera. For collaborations and inquiries, feel free to
    make direct contact below.
  </div>
  <div class="section">
    <div>
      <a href="mailto:bridgetelizabethbaker@gmail.com"> Email ↗ </a>
    </div>
    <div>
      <a href="https://instagram.com/pictures.bridget" target="_blank">
        Instagram ↗
      </a>
    </div>
  </div>
  <div class="section">
    Site design &amp; development by
    <a class="underline" href="https://tylermcrobert.com" target="_blank">
      Tyler McRobert</a
    >.
  </div>
  <div class="section">
    &copy; {new Date().getFullYear()} Bridget Baker. All rights reserved.
  </div>
</article>

<style lang="scss">
  .info {
    padding: var(--space-standard);
    max-width: 25em;

    .section {
      margin-bottom: 1em;
    }

    .underline {
      text-decoration: underline;
    }
  }
</style>
