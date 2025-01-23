<script>
  export let authors;

  const colors = ['#A5BDDA', '#2D2D94', '#EAC428', '#672893'];
</script>

<style>
  .authors {
    margin-top: 1.5rem;
    .author {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      margin-right: 1rem;
      position: relative;
      .tooltiptext {
        visibility: hidden;
        width: 120px;
        background-color: white;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        z-index: 1;
        bottom: 125%;
        left: 50%;
        margin-left: -60px;
        opacity: 0;
        transition: opacity 200ms;
        box-shadow: 0px 0px 5px -2px rgba(0,0,0,0.75);
      }
      .tooltiptext::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: white transparent transparent transparent;
      }
      &:hover .tooltiptext, &:active .tooltiptext  {
        visibility: visible;
        opacity: 1;
      }
      img {
        max-height: 100%;
      }
    }
  }
</style>

<div class="authors">
  {#each authors as author, i}
    <span class="author" style="background-color:{colors[i % colors.length]};">
      <img src="/authors/low/{author.replace(/ /g, '_')}.png" on:error={e => e.target.src = '/authors/backup.svg'} alt={author}>
      <span class="tooltiptext">{author}</span>
    </span>
  {/each}
</div>

