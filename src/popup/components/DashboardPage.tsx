import type { FC } from 'jsx-dom-runtime';

import './DashboardPage.css';
import { Download } from './icons/Download';
import { sendReqMessage } from '../../../src/chrome';
import { ReqEvents } from '../../../src/transport';
import { connect } from '../store';

export const DashboardPage: FC = () => {
  const downloadFiles: EventListener = () => {
    sendReqMessage(ReqEvents.download);
  };

  const ready = (node: HTMLButtonElement) => {
    connect('isEnable', (state) => {
      node.disabled = !state.isEnable;
    });

    sendReqMessage(ReqEvents.onmout);
  };

  return (
    <button
      ref={ready}
      type="button"
      class="btn"
      onclick={downloadFiles}
      disabled
    >
      <Download />
      {' Download Files'}
    </button>
  );
};
