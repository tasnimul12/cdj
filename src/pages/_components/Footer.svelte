<style>
  footer {
    margin-top: 5rem;
    height: 7rem;
    background-color: yellow;
  }

  #socials {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    height: 100%;
    a {
      width: 1cm;
      padding: 1.5rem;
      transition: filter 100ms;
      &:hover {
        filter: brightness(130%);
      }
      img {
        border-radius: 1px;
        filter: invert(15%) sepia(48%) saturate(4286%) hue-rotate(231deg) brightness(91%) contrast(90%);
      }
    }
  }

  @media only screen and (max-width: $mobile-cutoff) {
    #socials {
      a {
        width: 2.5rem;
        padding: 1rem;
      }
    }
  }
</style>

<footer>
  <div><h1>This organization is a registered student organization of Cornell University.</h1></div>
  <div id="socials">
    <a href="https://www.instagram.com/cornelldatajournal/" target="_blank">
      <img src="/socials/instagram.svg" alt="Instagram">
    </a>
    <a href="https://www.facebook.com/cornelldatajournal/" target="_blank">
      <img src="/socials/facebook.svg" alt="Facebook">
    </a>
    <a href="https://join.slack.com/t/cornell-data-journal/shared_invite/zt-p9ehqeea-AmiyvTmpXq~oxXYughkm1A" target="_blank">
      <img src="/socials/slack.svg" alt="Slack">
    </a>
    <a href="https://www.linkedin.com/company/cornell-data-journal/" target="_blank">
      <img src="/socials/linkedin.svg" alt="LinkedIn">
    </a>
    <a href="https://twitter.com/cu_datajournal" target="_blank">
      <img src="/socials/twitter.svg" alt="Twitter">
    </a>
  </div>
</footer>
