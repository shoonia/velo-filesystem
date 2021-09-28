<script lang="ts">
  import { useStoreon } from '@storeon/svelte';

  import type { IState, IEvents } from '../store/types';
  import Button from './Button.svelte';
  import { sendTabMessage } from '../../chrome';
  import { PostEvents } from '../../transport';

  const { isEnable } = useStoreon<IState, IEvents>('isEnable');

  const downloadHandler: EventListener = () => {
    void sendTabMessage(PostEvents.download);
  };
</script>

<ul>
  <li>
    <Button
      onClick={downloadHandler}
      disabled={!$isEnable}
    >
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
