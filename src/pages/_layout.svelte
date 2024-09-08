<script>
  import Footer from './_components/Footer.svelte';
  // import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';

  // inject({ mode: false ? 'development' : 'production' }); // false when in prod
  inject({ mode: false ? 'development' : 'production' }); // true when local

</script>

<style>
  main {
    margin: 0 auto;
    overflow: hidden;
  }
</style>

<main>
  <slot />
</main>
<Footer />

