<script lang="ts">
  import { useStoreon } from '@storeon/svelte';

  import type { IState, IEvents } from '../store/types';
  import Button from './Button.svelte';
  import { sendReqMessage } from '../../chrome';
  import { ReqEvents } from '../../transport';

  const { isEnable } = useStoreon<IState, IEvents>('isEnable');

  const downloadHandler: EventListener = () => {
    void sendReqMessage(ReqEvents.download);
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
