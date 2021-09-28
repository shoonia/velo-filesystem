/// <reference types="wicg-file-system-access"/>
import { CUSTOM_EVENT_REQUEST, ReqEvents, ResEvents } from '../transport';
import { downloadFiles } from './downloadFiles';
import { dispatchEvent } from '../util';

window.addEventListener(CUSTOM_EVENT_REQUEST, (event) => {
  switch (event.detail?.type) {
    case ReqEvents.onmout: {
      return dispatchEvent(ResEvents.content_loaded);
    }

    case ReqEvents.download: {
      return void downloadFiles();
    }
  }
});
