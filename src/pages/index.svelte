<script>
    import { metatags, layout, ready } from '@roxi/routify';
    import { setContext } from 'svelte';
    import Intro from './_components/Intro.svelte';
    import ArticleBig from './_components/index/ArticleBig.svelte';
    import ArticleSmall from './_components/index/ArticleSmall.svelte';

    const blurb = 'offering data-driven perspectives on current events, academics, politics, and beyond.';

    metatags.title = 'Cornell Data Journal';
    metatags.description = `A semesterly magazine ${blurb}`;

    const articles = $layout.children
      .find(entry => entry.path === '/articles').children
      .map(post => ({
        slug: post.path,
        component: post.children.find(child => child.title === 'Preview_').component,
        ...post.__file.children.find(child => child.isIndex).meta.frontmatter,
      }));

    let componentsReady = 0;
    setContext('ready', () => {
      componentsReady++;
      return '';
    });
    $: if (componentsReady === articles.length) $ready();
</script>

<style>
  #articles {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-gap: 2rem;
    max-width: $max-width;
    margin: 0 auto;
    padding: 0 1rem;
  }
  #org {
    color: grey;
    text-align: center;
    padding: 0 1rem;
  }
  @media only screen and (max-width: $mobile-cutoff-xs) {
    #articles {
      padding: 0 0.5rem;
      grid-template-columns: auto;
    }
  }
</style>

<Intro {blurb}/>

{#each articles.filter(article => article.featured) as article}
  <ArticleBig {article} />
{/each}

<div id="articles">
  {#each articles.filter(article => !article.featured) as article}
    <ArticleSmall {article} />
  {/each}
</div>

<div id="org">
  <h3>This organization is a registered student organization of Cornell University.</h3>
</div>
