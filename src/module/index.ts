import {
  RequestEvents,
  ResponseEvents,
  addRequestListener,
  dispatchResponce,
} from '../transport';
import { downloadFiles } from './downloadFiles';

addRequestListener((req) => {
  switch (req?.type) {
    case RequestEvents.onmout: {
      return dispatchResponce({
        type: ResponseEvents.content_loaded,
      });
    }

    case RequestEvents.download: {
      return downloadFiles(req.state);
    }
  }
});
