<script lang="ts">
  export let title: string;
  export let category: string;
  export let description: string;
  export let link: string;
  export let name: string;
</script>

<div class="card">
  <div class="card-content">
    <div class="tags">
      <span class="tag is-primary is-light">{category}</span>
    </div>
    <p class="title is-4">{title}</p>
    <div class="content">
        <p class="subtitle is-6">{name}</p>
    <p>  {description}</p>
    </div>
  </div>
  <footer class="card-footer">
    <a href={link} class="card-footer-item" target="_blank">View Resource</a>
  </footer>
</div>

<style>
  /* You can delete most of your old CSS! 
     We only need a little tweak to keep cards the same height */
  .card {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .card-content {
    flex-grow: 1;
  }
</style>