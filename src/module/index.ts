/// <reference types="wicg-file-system-access"/>
import { PostEvents, CUSTOM_EVENT_REQUEST } from '../transport';
import { downloadFiles } from './downloadFiles';
import { dispatchEvent } from './util';

window.addEventListener(CUSTOM_EVENT_REQUEST, (event) => {
  switch (event.detail?.type) {
    case PostEvents.onmout: {
      return dispatchEvent(PostEvents.content_loaded);
    }

    case PostEvents.download: {
      return void downloadFiles();
    }
  }
});
