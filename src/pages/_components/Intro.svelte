<script>
  import { isActive, url } from '@roxi/routify';
  import { slide } from 'svelte/transition';

  export let blurb;

  const links = [
    ['/about', 'about'],
    ['/get_involved', 'get involved'],
    // ['/learn', 'learn'],
  ];

  let windowWidth;

  let opened = false;

  $: if (windowWidth > 950) opened = true;

  function slideIfMobile(node, params) {
    if (windowWidth <= 950) {
      return slide(node, params);
    }
  }
</script>

<style>
  #intro {
    font-family: $font-secondary;
    font-weight: 900;
    display: grid;
    grid-template:
      [row1-start] "title nav" 1fr [row1-end]
      [row2-start] "desc ." auto [row2-end]
      / 2fr 1fr;
    margin: 3rem auto;
    max-width: $max-width;
    padding: 0 1rem;

    #logo {
      max-width: 2.5rem;
      padding: 1.5rem 1rem 1.5rem 0;
      grid-area: title;
    }
    #title {
      color: black;
      grid-area: title;
      align-self: center;
      padding-left: 3rem;
      &:hover {
        text-decoration: none;
      }
      h1 {
        margin: 0;
        font-size: 45px;
        line-height: 0.8;
      }
    }
    #blurb {
      font-size: 22px;
      margin: 0;
      color: $gray;
      grid-area: desc;
      font-family: $font-primary;
    }
    #socials-top {
      justify-self: end;
      display: flex;
      justify-content: space-evenly;
      padding: 0 0.4rem;
      a {
        width: 2.1rem;
        padding: 0 0.6rem;
        transition: filter 100ms;
        &:hover {
          filter: brightness(130%);
        }
      }
      img {
        height: 100%;
        border-radius: 1px;
        filter: invert(15%) sepia(48%) saturate(4286%) hue-rotate(231deg) brightness(91%) contrast(90%);
      }
    }
    nav {
      grid-area: nav;
      align-self: end;
      justify-self: end;
      #links {
        display: grid;
        grid-template-columns: auto auto auto;
        place-items: center;
        a {
          padding: 1.75rem 1rem;
          color: $purple;
          font-family: $font-secondary;
          font-weight: 900;
        }

        .active {
          color: $yellow;
          &:hover {
            text-decoration: none;
            cursor: default;
          }
        }
      }
      #nav-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        #logo-in {
          img {
            width: 2.5rem;
          }
        }

        .menu {
          background-color: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          .line {
            fill: none;
            stroke: black;
            stroke-width: 6;
            transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
              stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
          }
          .line1 {
            stroke-dasharray: 60 207;
            stroke-width: 6;
          }
          .line2 {
            stroke-dasharray: 60 60;
            stroke-width: 6;
          }
          .line3 {
            stroke-dasharray: 60 207;
            stroke-width: 6;
          }
        }
        .opened {
          .line1 {
            stroke-dasharray: 90 207;
            stroke-dashoffset: -134;
            stroke-width: 6;
          }
          .line2 {
            stroke-dasharray: 1 60;
            stroke-dashoffset: -30;
            stroke-width: 6;
          }
          .line3 {
            stroke-dasharray: 90 207;
            stroke-dashoffset: -134;
            stroke-width: 6;
          }
        }
      }
    }
  }

  @media only screen and (max-width: $mobile-cutoff) {
    #intro {
      grid-template:
        [row1-start] "nav nav" 1fr [row1-end]
        [row2-start] "title title" auto [row2-end]
        [row2-start] "desc desc" auto [row2-end]
        / 1fr auto;
      margin-top: 0;
      #title {
        padding: 0;
        h1 {
          font-size: 45px;
          line-height: 1.3;
          margin: 1rem 0;
        }
      }
      nav {
        grid-area: nav;
        place-self: stretch;
        background-color: $lavender;
        margin: 0 -1rem;
        padding: 0 1rem;
        #links {
          display: block;
          margin: 0.5rem 0;
          a {
            display: block;
            padding: 0.5rem 0;
          }
        }
        #socials-top {
          justify-content: flex-start;
          padding: 1rem 0;
          a:first-child {
            padding-left: 0;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 480px) {
    #intro {
      #title {
        h1 {
          word-spacing: 2000%;
        }
      }
    }
  }
  @media only screen and (max-width: $mobile-cutoff-xs) {
    #intro {
      padding: 0 0.5rem;
      nav {
        margin: 0 -0.5rem;
        padding: 0 0.5rem;
      }
    }
  }
</style>

<svelte:window bind:outerWidth={windowWidth} />
<div id="intro">
  {#if windowWidth > 950}
    <a id="logo" href="/"><img src="/favicon.svg" alt="CDJ Logo" /></a>
  {/if}
  <a id="title" href="/"><h1>data journal at cornell</h1></a>
  <h2 id="blurb">{blurb}</h2>
  <nav>
    {#if windowWidth <= 950}
      <div id="nav-top">
        <a id="logo-in" href="/"><img src="/favicon.svg" alt="CDJ Logo" /></a>
        <button
          class="menu"
          name="open-nav"
          on:click={() => (opened = !opened)}
          class:opened>
          <svg width="60" height="60" viewBox="0 0 100 100">
            <path class="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
            <path class="line line2" d="M 20,50 H 80" />
            <path class="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
          </svg>
        </button>
      </div>
    {/if}
    {#if opened}
      <div transition:slideIfMobile|local>
        <div id="links">
          {#each links as [path, name]}
            <a href={$url(path)} class:active={$isActive(path)}> {name} </a>
          {/each}
        </div>
        {#if windowWidth <= 950}
          <div id="socials-top">
            <a href="https://www.instagram.com/cornelldatajournal/" target="_blank">
              <img src="/socials/instagram.svg" alt="Instagram" />
            </a>
            <!-- 
            <a href="https://www.facebook.com/cornelldatajournal/" target="_blank">
              <img src="/socials/facebook.svg" alt="Facebook" />
            </a>
            <a href="https://www.linkedin.com/company/cornell-data-journal/" target="_blank">
              <img src="/socials/linkedin.svg" alt="LinkedIn" />
            </a>
            <a href="https://twitter.com/cu_datajournal" target="_blank">
              <img src="/socials/twitter.svg" alt="Twitter" />
            </a> -->
          </div>
        {/if}
      </div>
    {/if}
  </nav>
  {#if windowWidth > 950}
    <div id="socials-top">
      <a href="https://www.instagram.com/cornelldatajournal/" target="_blank">
        <img src="/socials/instagram.svg" alt="Instagram" />
      </a>
      <a href="https://www.linkedin.com/company/cornell-data-journal/" target="_blank">
        <img src="/socials/linkedin.svg" alt="LinkedIn">
      </a>

      <!-- 
      <a href="https://www.facebook.com/cornelldatajournal/" target="_blank">
        <img src="/socials/facebook.svg" alt="Facebook" />
      </a>

      <a href="mailto:cornelldatajournal@gmail.com" target="_blank">
        <img src="/socials/email-icon.svg" alt="Email">
      </a>
      
      <a href="https://twitter.com/cu_datajournal" target="_blank">
        <img src="/socials/twitter.svg" alt="Twitter" />
      </a>-->
    </div>
  {/if}
</div>
