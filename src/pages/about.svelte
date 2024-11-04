<script>
    import { metatags } from '@roxi/routify';
    import Intro from './_components/Intro.svelte';
    import Person from './_components/about/Person.svelte';

    const blurb = 'offering data-driven perspectives on current events, academics, politics, and beyond.';

    metatags.title = 'About Us | CDJ';
    metatags.description = blurb;

    const team = [
      { name: 'Catherine Zhang', year: 25, role: 'President', desc: 'Catherine is a <i>Biometry and Statistics</i> major.' },
      { name: 'Steven Zhou', year: 26, role: 'Executive Vice President', desc: 'Steven is an <i>Environment & Sustainability</i> and <i>Information Science</i> double major. In 2023, he visited <b>15</b> different countries and spent <b>130</b> hours in the air.' },
      { name: 'William Rosenthal', year: 27, role: 'Vice President of Internal Affairs', desc: 'Will is a <i>Computer Science</i> major interested in cybersecurity and policy. At Panera Bread, he orders Mac & Cheese <b>100%</b> of the time.' },
      { name: 'Rishi Gurjar', year: 27, role: 'Vice President of External Affairs', desc: 'Rishi is an <i>Environment & Sustainability</i> and <i>Computer Science</i> double major. When he is home, he spends around <b>25%</b> of his waking hours gardening.' },
      { name: 'Bradley Lasker', year: 26, role: 'Social Coordinator', desc: 'Bradley is a <i>Biometry & Statistics</i> major.' },
      { name: 'Amy Chitnumsab', year: 26, role: 'Project Lead Coordinator', desc: 'Amy is a <i>Statistics</i>.' },
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
  
  #org {
    color: grey;
    text-align: center;
    padding: 0 1rem;
    margin-bottom: 0em;
    padding-bottom: 0em;
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

<div id="org">
  <h3>This organization is a registered student organization of Cornell University.</h3>
</div>
