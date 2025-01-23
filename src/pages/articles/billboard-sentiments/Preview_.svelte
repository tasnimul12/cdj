<script>
    import thumb from './_images/thumb.jpg';
  
    export let preview;
  </script>
  
  <style>
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  </style>
  
  {#if preview}
    <img src={thumb} alt="Preview">
  {/if}
  