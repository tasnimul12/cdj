<script>
  import Footer from './_components/Footer.svelte';
  import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';

  inject({ mode: dev ? 'development' : 'production' });
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

