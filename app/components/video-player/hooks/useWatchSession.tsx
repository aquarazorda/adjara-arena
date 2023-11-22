import { add } from 'date-fns';

export enum WatchState {
  start = 'START',
  end = 'END',
}

const useWatchSession = () => {
  const sendEvent = (event_id: number, type: WatchState, session_id: string) => {
    // @ts-ignore
    const _token = document.querySelector('#scrfToken') ? document.querySelector('#scrfToken')?.value : '';

    fetch(`/track/${event_id}`, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _token, session_id, type, date: add(new Date(), { hours: 4 }).toISOString() }),
      method: 'POST',
    });
  };

  return [sendEvent];
};

export default useWatchSession;
