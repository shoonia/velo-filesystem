<script lang="ts">
  import Button from './Button.svelte';
  import { sendTabMessage } from '../../chrome';
  import { Events } from '../../transport';

  const downloadHandler = () => {
    void sendTabMessage({ type: Events.download });
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
