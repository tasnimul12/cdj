<script>
  import { inject } from "@vercel/analytics";

  import Footer from "./_components/Footer.svelte";
  // import { dev } from '$app/environment';
  // inject({ mode: false ? 'development' : 'production' }); // false when in prod
  inject({ mode: false ? "development" : "production" }); // true when local
</script>

<main>
  <slot />
</main>
<Footer />

<style>
  main {
    margin: 0 auto;
    overflow: hidden;
  }
</style>
