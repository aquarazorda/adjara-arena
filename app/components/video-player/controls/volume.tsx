import { useCallback, useContext, useMemo } from 'react';
import { VideoContext } from '../player-provider';

const IconFull = () => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    height="20"
    width="20"
    className="icon-volume-full keep-overlay-on-hover"
  >
    <path d="M19.063 3.813c5.938 1.125 10.063 5.938 10.063 11.938s-4 10.688-10.063 12v2.063c6.813-1 12.063-6.875 12.063-14.063 0-7.125-5.25-13-12.063-14zM7 8.438v14.688l7.063 4.688c1.125 0 2-0.875 2-2v-20.063c0-1.125-0.875-2-2-2zM19.063 8.875v2c2.313 0.438 4.063 2.5 4.063 4.875 0 2.438-1.75 4.5-4.063 4.938v2c3.438-0.5 6.063-3.375 6.063-6.938 0-3.5-2.625-6.438-6.063-6.875zM0 19.813c0 1.063 0.875 2 2 2h3v-12.063h-3c-1.125 0-2 0.875-2 2z"></path>
  </svg>
);

const IconOn = () => (
  <span>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      height="20"
      width="19"
      className="icon-volume-on keep-overlay-on-hover"
    >
      <path d="M24.313 6.813v2.625c2.938 0.625 5.125 3.313 5.125 6.563s-2.188 5.938-5.125 6.563v2.625c4.375-0.625 7.688-4.5 7.688-9.188s-3.313-8.563-7.688-9.188zM0 10.688v10.625c0 1.5 1.125 2.688 2.563 2.688h3.813v-16h-3.813c-1.438 0-2.563 1.188-2.563 2.688zM17.938 0l-9 6.25v19.5l9 6.25c1.375 0 2.563-1.188 2.563-2.688v-26.625c0-1.5-1.188-2.688-2.563-2.688z"></path>
    </svg>
  </span>
);

const IconOff = () => (
  <span>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      height="20"
      width="20"
      className="icon-volume-muted keep-overlay-on-hover"
    >
      <path d="M27.125 16l4.438-4.438c0.5-0.5 0.563-1.25 0.125-1.625-0.438-0.438-1.125-0.438-1.625 0.063l-4.438 4.438-4.5-4.438c-0.438-0.5-1.188-0.5-1.625-0.063-0.438 0.375-0.375 1.125 0.125 1.625l4.438 4.438-4.438 4.438c-0.5 0.5-0.563 1.25-0.125 1.625 0.438 0.438 1.188 0.438 1.625-0.063l4.5-4.438 4.438 4.438c0.5 0.5 1.188 0.5 1.625 0.063 0.438-0.375 0.375-1.125-0.125-1.625zM14.938 3.188l-7.5 5v15.625l7.5 5c1.188 0 2.125-0.938 2.125-2.125v-21.375c0-1.188-0.938-2.125-2.125-2.125zM0 11.75v8.5c0 1.188 0.938 2.125 2.125 2.125h3.188v-12.75h-3.188c-1.188 0-2.125 0.938-2.125 2.125z"></path>
    </svg>
  </span>
);

export const Volume = () => {
  const { muted, player, volume, setState } = useContext(VideoContext);
  const toggleMute = useCallback(() => {
    if (player) player.muted = !muted;
    const currVolume = JSON.parse(localStorage.getItem('currentVolume')!) || 1;

    setState({ muted: !muted, volume: muted ? currVolume : 0 });
  }, [muted, player, setState]);

  const onChange = useCallback(
    ({ target: { value } }: { target: { value: string } }) => {
      const volume = parseFloat(value);
      localStorage.setItem('currentVolume', JSON.stringify(volume));

      if (player) {
        player.volume = volume;
        player.muted = volume === 0;
        setState({ muted: volume === 0, volume: Number(value) });
      }
    },
    [player, setState]
  );

  return (
    <span className="tooltip">
      <span className="tooltip__message tooltip-right">ხმის გამორთვა (m)</span>
      <span>
        <div className="btn-player dice-play-volume">
          <span onClick={toggleMute}>
            {!muted && !!volume && (volume > 0.5 ? <IconFull /> : <IconOn />)}
            {(muted || !volume) && <IconOff />}
          </span>
          <div className="hidden lg:block volume-control keep-overlay-on-hover" style={{ width: '34px' }}>
            <input
              id="volume"
              type="range"
              max="1"
              min="0"
              step="0.01"
              onChange={onChange}
              className="volume-slider-st"
            />
            <div className="volume-control-rail keep-overlay-on-hover">
              <div
                className="volume-buffer resident-primary-color-bg keep-overlay-on-hover"
                style={{ transform: `scale3d(1, ${volume}, 1)` }}
              ></div>
              <div
                className="volume-control-dot-wrapper keep-overlay-on-hover"
                style={{
                  transform: `translate3d(0px, ${-(volume * 100)}%, 0px)`,
                }}
              >
                <span className="volume-control-dot resident-primary-color-bg keep-overlay-on-hover"></span>
              </div>
            </div>
          </div>
        </div>
      </span>
    </span>
  );
};
