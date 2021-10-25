<script lang="ts">
  import { useStoreon } from '@storeon/svelte';

  import type { IState, IEvents } from '../store/types';
  import Button from './Button.svelte';
  import DownloadIcon from './icons/Download.svelte';
  import { sendReqMessage } from '../../chrome';
  import { ReqEvents } from '../../transport';

  const { isEnable } = useStoreon<IState, IEvents>('isEnable');

  const downloadFiles: EventListener = () => {
    void sendReqMessage(ReqEvents.download);
  };
</script>

<ul>
  <li>
    <Button
      onClick={downloadFiles}
      disabled={!$isEnable}
    >
      <DownloadIcon />
      &nbsp;Download Files
    </Button>
  </li>
</ul>

<style>
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  li {
    padding-bottom: 5px;
  }
</style>
