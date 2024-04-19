import {
  REQUEST,
  RESPONSE,
  addRequestListener,
  dispatchResponce,
} from '../transport';
import { downloadFiles } from './downloadFiles';

addRequestListener((req) => {
  switch (req?.type) {
    case REQUEST.READY: {
      return dispatchResponce({
        type: RESPONSE.LOADED,
      });
    }

    case REQUEST.DOWNLOAD: {
      return downloadFiles(req.state);
    }
  }
});
