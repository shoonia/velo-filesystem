/// <reference types="wicg-file-system-access"/>
import { CUSTOM_EVENT, PostEvents } from '../transport';
import { downloadFiles } from './downloadFiles';

window.addEventListener(CUSTOM_EVENT, (event) => {
  if (!(event instanceof CustomEvent)) {
    return;
  }

  switch (event.detail?.type) {
    case PostEvents.download: {
      return void downloadFiles();
    }
  }
});
