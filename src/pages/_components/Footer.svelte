<style>
  footer {
    margin-top: 5rem;
    min-height: 7rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color:#ffce00;
    padding: 1rem;
    flex-wrap: wrap;
  }

  #org {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding-left: 2rem;
    flex: 1;
    min-width: 200px;
  }

  #org h3 {
    font-size: 1rem;
  }

  #socials {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap;
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

  @media only screen and (max-width: 768px) {
    footer {
      flex-direction: column;
      text-align: center;
      padding: 1rem 0;
    }

    #org {
      padding: 1rem;
      justify-content: center;
      order: 2;
    }

    #socials {
      justify-content: center;
      order: 1;
      a {
        width: 2rem;
        padding: 0.75rem;
      }
    }
  }
</style>

<footer>
  <div id="org">
    <h3>This organization is a registered student organization of <a href="https://www.cornell.edu" target="_blank">Cornell University</a>.</h3>
  </div>

  <div id="socials">
    <a href="https://www.instagram.com/cornelldatajournal/" target="_blank">
      <img src="/socials/instagram.svg" alt="Instagram">
    </a>
    <a href="https://www.linkedin.com/company/cornell-data-journal/" target="_blank">
      <img src="/socials/linkedin.svg" alt="LinkedIn">
    </a>
    <a href="mailto:cornelldatajournal@gmail.com" target="_blank">
      <img src="/socials/email-icon.svg" alt="Email">
    </a>


        <!--
    <a href="https://www.facebook.com/cornelldatajournal/" target="_blank">
      <img src="/socials/facebook.svg" alt="Facebook">
    </a>
    <a href="https://www.linkedin.com/company/cornell-data-journal/" target="_blank">
      <img src="/socials/linkedin.svg" alt="LinkedIn">
    </a>
    <a href="https://twitter.com/cu_datajournal" target="_blank">
      <img src="/socials/twitter.svg" alt="Twitter">
    </a> -->
  </div>
</footer>
