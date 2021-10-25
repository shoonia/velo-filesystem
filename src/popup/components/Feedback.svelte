<script lang="ts">
  import { to } from '../../chrome';
  import { discussions as link } from '../../manifest';

  const handleClick: EventListener = (event) => {
    event.preventDefault();
    to(link);
  };
</script>

<a
  href={link}
  on:click={handleClick}
>
  Feedback
</a>

<style>
  a {
    color: var(--b10);
  }
</style>
