import { isCancel } from 'axios';

// Handle cleanup in useEffect whith axios requests.
// Returns a signal to pass to axios, a cleanup function for the effect hook and
// an error handler for the cancelled response

export default function useCleanupController() {
  const controller = new AbortController();
  const cleanup = () => {
    controller.abort();
  };
  const defaultHandler = () => {
    // eslint-disable-next-line no-console
    console.log('request cancelled');
  };
  const handleError = (err, cb = defaultHandler) => {
    if (isCancel(err)) {
      cb();
      return true;
    }
    return false;
  };
  return [controller.signal, cleanup, handleError];
}
