<script>
    import { metatags } from '@roxi/routify';
    import Intro from './_components/Intro.svelte';

    const blurb = 'learn how to get involved with our club and what that entails.';

    metatags.title = 'Get Involved | CDJ';
    metatags.description = blurb;
</script>
<style>
    div {
    max-width: $max-width;
    margin: 0 auto;
    padding: 0 1rem;
  }

  iframe {
      width: 100%;
      border: 0;
    }

  #org {
    color: grey;
    text-align: center;
    padding: 0 1rem;
  }
</style>

<Intro {blurb} />

<div>
  <h2> Join Cornell Data Journal!</h2>
  <p>We welcome students of all backgrounds and disciplines to come create with us. Whether you've worked with data before or not, anyone is welcome to contribute and publish with us.</p>
  <p><b> We are currently recruiting members for the Fall 2023 semester! <a href="https://docs.google.com/forms/d/e/1FAIpQLSfQ-GuPvBhnKtV6qDO3yczS3Hz5voAW0s9A2KP5Hik0qWEqCA/viewform">Apply now!</a></b></p>
  <p>Check out our event schedule below for upcoming information session dates and locations. If you have any questions, feel free to shoot us an <a href="mailto:cornelldatajournal@gmail.com">email</a>.</p>
  <h2>Events</h2>
  <iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=2&amp;bgcolor=%23ffffff&amp;ctz=America%2FNew_York&amp;src=Y29ybmVsbGRhdGFqb3VybmFsQGdtYWlsLmNvbQ&amp;color=%237CB342&amp;showTz=0&amp;showCalendars=0&amp;showTabs=0&amp;showPrint=0&amp;showDate=1&amp;showNav=1&amp;showTitle=0" height="600" scrolling="no" title="CDJ Event Calendar"></iframe>
</div>

<div id="org">
  <h3>This organization is a registered student organization of Cornell University.</h3>
</div>
