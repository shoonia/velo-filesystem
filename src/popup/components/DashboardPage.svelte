<script lang="ts">
  import Button from './Button.svelte';
  import DownloadIcon from './icons/Download.svelte';
  import { useStoreon } from '../store';
  import { sendReqMessage } from '../../chrome';
  import { ReqEvents } from '../../transport';

  const { isEnable } = useStoreon('isEnable');

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
