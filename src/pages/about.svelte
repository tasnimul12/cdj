<script>
    import { metatags } from '@roxi/routify';
    import Intro from './_components/Intro.svelte';
    import Person from './_components/about/Person.svelte';

    const blurb = 'offering data-driven perspectives on current events, academics, politics, and beyond.';

    metatags.title = 'About Us | CDJ';
    metatags.description = blurb;

    const team = [
      { name: 'Ahmed Sultan', year: 24, role: 'President', desc: 'Ahmed is an <i>Information Science</i> major, minoring in <i>Business</i>.' },
      { name: 'Elena Joseph', year: 24, role: 'Executive Vice President', desc: 'Elena is an <i>Information Science</i> major, minoring in <i>Law & Society</i>. Since 2002, she has ate <b>shellfish twice</b> and went to the hospital <b>100%</b> of these times.' },
      { name: 'Tasnimul Taher', year: 24, role: 'Vice President of Internal Affairs', desc: 'Tas is an <i>Information Science</i> major, minoring in <i>Business</i>. He has consumed <b>0</b> sandwiches in his life.' },
      { name: 'Carly Hu', year: 24, role: 'Vice President of External Affairs', desc: 'Carly is an <i>Information Science</i> and <i>Sociology</i> double major. She has a baking Instagram account and <b>39%</b> of the posts are cookies or cupcakes.' },
      { name: 'Neema Kudva', role: 'Faculty Mentor', desc: 'Professor Kudva is a <i>senior associate dean for academic affairs</i> and the <i>house professor and dean at Becker house</i>.' },
    ];

    const colors = ['#A4BCD5', '#2C358B', '#F8C82D', '#642D89'];
</script>

<style>
  #main {
    max-width: $max-width;
    margin: 0 auto;
    padding: 0 1rem;
  }
  b {
    font-family: $font-secondary;
    font-weight: 100;
  }
  h2 {
    color: $blue;
  }
  #team {
    display: grid;
    margin-top: 3rem;
    place-items: center;
    grid-template-columns: repeat(auto-fill, minmax(16.15rem, 1fr));
    grid-column-gap: 2rem;
  }
  li {
    margin-left: 1rem;
    font-size: 20px;
  }
  h2 {
    color: $blue;
    margin: 1em 0;
  }
</style>

<Intro {blurb} />

<div id="main">
  <h2>What is Cornell Data Journal?</h2>
  <p>Founded in Fall 2020, and revived in Spring 2023, <b>Cornell Data Journal</b> is an online investigative journalism publication featuring data visualization, data communication, and interdisciplinary research pieces.</p>
  <ul>
    <li> Individuals or teams collaborating on articles</li>
     <li>Published on a rolling basis</li>
     <li>Skillbuilding workshops & seminars </li>
     <li>Building data journalism presence on campus</li>
   </ul>
  <p>We're a group of Cornell students seeking to foster a data journalism community on campus. Coders, designers, writers, or students interested in data journalism are welcome to join our community.</p>
  <h2>What is data journalism?</h2>
  <p><b>Data journalism</b> is an emerging subfield of journalism, and often combines data, visual, and narrative reporting into digital stories. Examples include <a href="/articles/elegant-geometry" target="_blank">isometric illustrations</a>, <a href="/articles/familiar-strangers" target="_blank">statistical explorations</a>, and <a href="/articles/wings-of-change" target="_blank">interactive essays</a>. Think <a href="https://www.propublica.org/newsapps" target="_blank">Propublica Data</a>, <a href="https://www.nytimes.com/interactive/2020/12/30/us/2020-year-in-graphics.html" target="_blank">New York Times Interactive, </a> or <a href="https://pudding.cool/" target="_blank">The Pudding</a>.</p>
  <p>If you're interested in learning more, see how you can <a href="/get_involved">get involved</a> with us!</p>
  <h2>Meet the Team!</h2>
  <div id="team">
    {#each team as { name, year, role, minor, major, desc }, i}
      <Person {name} {year} {role} {minor} {major} {desc} color={colors[i % colors.length]}/>
    {/each}
  </div>
</div>
