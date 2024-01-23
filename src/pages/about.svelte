<script>
    import { metatags } from '@roxi/routify';
    import Intro from './_components/Intro.svelte';
    import Person from './_components/about/Person.svelte';

    const blurb = 'offering data-driven perspectives on current events, academics, politics, and beyond.';

    metatags.title = 'About Us | CDJ';
    metatags.description = blurb;

    const team = [
      { name: 'Ahmed Sultan', year: 24, role: 'President', desc: 'Ahmed is an <i>Information Science</i> major, minoring in <i>Business</i>.' },
      { name: 'Elena Joseph', year: 24, role: 'Executive Vice President', desc: 'Elena is an <i>Information Science</i> major, minoring in <i>Law & Society</i>. Since 2002, she has eaten shellfish <b>twice</b> and was hospitalized <b>100%</b> of the times.' },
      { name: 'Tasnimul Taher', year: 24, role: 'VP of Internal Affairs', desc: 'Tas is an <i>Information Science</i> major, minoring in <i>Business</i>. He has consumed <b>0</b> sandwiches in his life.' },
      { name: 'Carly Hu', year: 24, role: 'VP of External Affairs', desc: 'Carly is an <i>Information Science</i> and <i>Sociology</i> double major. She has a baking Instagram account and <b>39%</b> of the posts are cookies or cupcakes.' },
      { name: 'Neema Kudva', role: 'Faculty Mentor', desc: 'Professor Kudva is a <i>senior associate dean for academic affairs</i> and the <i>house professor and dean at Becker house</i>.' },
      { name: 'Erdis Brahimi', role: 'Project Lead', desc: '' },
      { name: 'Sana Chawla', role: 'Project Lead', desc: 'Sana is a <i>Computer Science</i> major and <i>ECE minor</i>. She has travelled to <b>20/29 states</b> in India.'},
      { name: 'Matthew DeSousa', role: 'Project Lead', desc: 'Matt is a double major in <i>Computer Science and Statistical Science</i>. He burns <b>40% of the food he cooks</b>.'},
      { name: 'Abdulla Elkhadrawy', role: 'Project Lead', desc: '' },
      { name: 'Julius Enestrom', role: 'Project Lead', desc: 'Julius is an <i>Information Science</i> and <i>Government</i> double major. In his free time, he enjoys playing <b>board and card games with friends</b> and <b>listening to jazz</b>.' },
      { name: 'Jenny Jin', role: 'Project Lead', desc: 'Jenny is majoring in <i>Computer Science</i> and minoring in <i>Business</i>. She has experienced a <b>130 ºF</b> change in temperature in a day.' },
      { name: 'Afm Khan', role: 'Project Lead', desc: '' },
      { name: 'Jocelyn Park', role: 'Project Lead', desc: 'Jocelyn is a junior studying <i>Information Science</i> with a minor in <i>Computer Science</i>. She has tried <b>8/19</b> of the Chobani Flip flavors.' },
      { name: 'Caitlin Tavas', role: 'Project Lead', desc: 'Caitlin is a Junior <i>Information Science major</i> with a <i>East Asian Studies</i> minor. She thinks sushi is <b>10 times better</b> than other foods.' },
      { name: 'Sydney Wan', role: 'Project Lead', desc: 'Sydney is an <i>Information Science major</i> and <i>Business minor</i>. She has swam competitively for <b>60% of her life</b>.' },
      { name: 'Karla Wang', role: 'Project Lead', desc: 'Karla is majoring in <i>Applied Economics & Management</i> and <i>Information Science</i>. She has cooked her favorite Korean tofu recipe <b>100+ times</b> and counting.' },
      { name: 'Sami Wolf', role: 'Project Lead', desc: 'Sami is a <i>CS and Math major</i> and <i>Philosophy minor</i>. He has a <b>30% chance</b> of going climbing on any given day.' },
      { name: 'Evan Xin', role: 'Project Lead', desc: 'Evan is a freshman studying <i>Computer Science</i>. He enjoy learning about theories surrounding the potential for <b>extraterrestrial life</b>.' },
      { name: 'Dora Xu', role: 'Project Lead', desc: 'Dora is an <i>Information Science major</i> and <i>Business minor</i>. She is <b>40% obsessed</b> with raccoons and weasels and <b>60% obsessed</b> with watching sad kdramas.' },
      { name: 'Catherine Zhang', role: 'Project Lead', desc: 'Catherine is a <i>Biometry and Statistics</i> major. Since 2003, she has entered <b>12 raffles</b> and has had a success rate of <b>25%</b>.' },
    ];

    const colors = ['#A4BCD5', '#2C358B', '#F8C82D', '#642D89'];
</script>

<style>
  #main {
    max-width: max-width;
    margin: 0 auto;
    padding: 0 1rem;
  }
  b {
    font-family: font-secondary;
    font-weight: 100;
  }
  h2 {
    color: blue;
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
    color: blue;
    margin: 1em 0;
  }
</style>

<Intro {blurb} />

<div id="main">
  <h2>What is Cornell Data Journal?</h2>
  <p>Founded in Fall 2020, <b>Cornell Data Journal</b> is an online investigative journalism publication featuring data visualization, data communication, and interdisciplinary research pieces.</p>
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
