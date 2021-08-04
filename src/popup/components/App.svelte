<script lang="ts">
  import DashboardPage from './DashboardPage.svelte';
</script>

<main>
  <DashboardPage />
</main>

<style>
  :global(*),
  :global(*::before),
  :global(*::after) {
    box-sizing: border-box;
  }

  :global(html),
  :global(body) {
    margin: 0;
    padding: 0;
  }

  :global(body) {
    color: #162d3d;
    background-color: #f0f4f7;
  }

  main {
    padding: 15px;
  }
</style>
