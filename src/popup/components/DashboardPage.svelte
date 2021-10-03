<script lang="ts">
  import { useStoreon } from '@storeon/svelte';

  import type { IState, IEvents } from '../store/types';
  import Button from './Button.svelte';
  import DownloadIcon from './icons/Download.svelte';
  import { sendReqMessage } from '../../chrome';
  import { ReqEvents } from '../../transport';

  const { isEnable } = useStoreon<IState, IEvents>('isEnable');

  const generateReport: EventListener = () => {
    // TODO:
  };

  const downloadHandler: EventListener = () => {
    void sendReqMessage(ReqEvents.download);
  };
</script>

<ul>
  <li>
    <Button
      onClick={generateReport}
      disabled={!$isEnable}
    >
      Generate Report
    </Button>
  </li>
  <li>
    <Button
      onClick={downloadHandler}
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
