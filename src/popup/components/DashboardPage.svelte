<script lang="ts">
  import Button from './Button.svelte';
  import { sendTabMessage } from '../../chrome';
  import { PostEvents } from '../../transport';

  const downloadHandler: EventListener = () => {
    void sendTabMessage({ type: PostEvents.download });
  };
</script>

<ul>
  <li>
    <Button onClick={downloadHandler}>
      Download
    </Button>
  </li>
</ul>

<style>
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
</style>
