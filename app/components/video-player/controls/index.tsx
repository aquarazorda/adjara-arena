import { useCallback, useContext, useMemo, useState } from 'react';
import { VideoContext } from '../player-provider';
import { vis } from '../utils';
import { Preferences } from './preferences';
import { ProgressBar } from './progress-bar';
import { Volume } from './volume';

export const Controls = () => {
  const { controlsVisible, isPlaying, isFullScreen, progressPercentage, player, setState, togglePlay, togglePIP } =
    useContext(VideoContext);
  const [preferencesActive, setPreferencesActive] = useState(false);

  const toggleFullScreen = useCallback(() => {
    if (document.body.requestFullscreen) {
      isFullScreen ? document.exitFullscreen() : document.body.requestFullscreen();
    } else {
      // @ts-ignore
      if (player?.webkitEnterFullScreen) {
        // @ts-ignore
        isFullScreen ? player.webkitExitFullscreen() : player.webkitEnterFullScreen();
      }
    }

    setState({ isFullScreen: !isFullScreen });
  }, [isFullScreen, setState, player]);

  const moveToLive = useCallback(() => {
    if (player) player.currentTime = new Date().getTime();
  }, [player]);

  return (
    <div className={`dice-player-control ${vis(controlsVisible)}`}>
      <div className="left-group pull-left">
        <span className="tooltip">
          <span className="tooltip__message tooltip-top">ჩართვა (k)</span>
          <span onClick={togglePlay}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a id="pause" className={`btn-play overlay-item--visible ${!isPlaying && 'paused'}`} title="">
              <span className="play-icon keep-overlay-on-hover"></span>
            </a>
          </span>
        </span>
        <Volume />
        {progressPercentage < 99 && (
          <span className="keep-overlay-on-hover badge live resident-primary-color-bg" onClick={moveToLive}>
            პირდაპირ ეთერში გასვლა
          </span>
        )}
        {progressPercentage >= 99 && <span className="keep-overlay-on-hover badge live">LIVE</span>}
      </div>
      <ProgressBar />
      <div className="right-group pull-right" onBlur={() => setPreferencesActive(false)} tabIndex={1}>
        <span className="tooltip">
          <span className="tooltip__message tooltip-top">პარამეტრები</span>
          <span onClick={() => setPreferencesActive(!preferencesActive)}>
            <div className="btn-player dice-preferences">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                height="20"
                width="20"
                className="keep-overlay-on-hover"
              >
                <path d="M29.688 19.063c-1.75-2.875-0.688-6.625 2.313-8.313l-3.25-5.438c-0.938 0.5-2 0.813-3.188 0.813-3.5 0-6.313-2.75-6.313-6.125h-6.5c0 1.063-0.25 2.125-0.875 3.063-1.688 2.938-5.563 3.875-8.625 2.25l-3.25 5.438c0.938 0.5 1.75 1.25 2.313 2.188 1.75 2.938 0.688 6.625-2.313 8.375l3.25 5.438c0.938-0.563 2-0.813 3.188-0.813 3.438 0 6.25 2.688 6.313 6.063h6.5c0-1.063 0.25-2.063 0.813-3.063 1.75-2.875 5.625-3.875 8.625-2.188l3.313-5.438c-0.938-0.5-1.75-1.313-2.313-2.25zM16 22.5c-3.688 0-6.688-2.938-6.688-6.5s3-6.5 6.688-6.5c3.688 0 6.688 2.938 6.688 6.5s-3 6.5-6.688 6.5z"></path>
              </svg>
            </div>
          </span>
        </span>
        <Preferences visible={preferencesActive && controlsVisible} />
        <span className="tooltip hidden lg:visible">
          <span className="tooltip__message tooltip-top">მინი ფლეიერი (i)</span>
          <span onClick={togglePIP}>
            <div className="btn-player btn-picture-in-picture">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="17 17 20 21"
                height="22"
                width="24"
                className="picture-in-picture"
              >
                <path
                  d="M36.5,34.5 L36.5,19.5 L17.5,19.5 L17.5,34.5 L36.5,34.5 Z M38,33.984 C38,34.5280027 37.8002925,34.999998 37.4008715,35.4 C37.0014504,35.800002 36.5301407,36 35.9869281,36 L18.0130719,36 C17.4698593,36 16.9985496,35.800002 16.5991285,35.4 C16.1997075,34.999998 16,34.5280027 16,33.984 L16,19.968 C16,19.4239973 16.1997075,18.9600019 16.5991285,18.576 C16.9985496,18.1919981 17.4698593,18 18.0130719,18 L35.9869281,18 C36.5301407,18 37.0014504,18.1919981 37.4008715,18.576 C37.8002925,18.9600019 38,19.4239973 38,19.968 L38,33.984 Z M34.9738562,27.0043573 L34.9738562,32.9956427 L27.0174292,32.9956427 L27.0174292,27.0043573 L34.9738562,27.0043573 Z"
                  id="path-1"
                ></path>
              </svg>
            </div>
          </span>
        </span>
        {!isFullScreen && (
          <span className="tooltip">
            <span className="tooltip__message tooltip-top">მთელ ეკრანზე (f)</span>
            <span onClick={toggleFullScreen}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="btn-player btn-fullscreen" title="" data-test-id="fullscreen-btn">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  height="20"
                  width="20"
                  className="icon-fullscreen-on keep-overlay-on-hover"
                >
                  <path d="M30 32h2v-12h-4v8h-8v4zM0 30v2h12v-4h-8v-8h-4zM32 2v-2h-12v4h8v8h4zM2 0h-2v12h4v-8h8v-4z"></path>
                </svg>
              </a>
            </span>
          </span>
        )}
        {isFullScreen && (
          <span className="tooltip">
            <span className="tooltip__message tooltip-top tooltip-override-right">მთელი ეკრანიდან გასვლა (f)</span>
            <span onClick={toggleFullScreen}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="btn-player btn-fullscreen" title="" data-test-id="fullscreen-btn">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  height="20"
                  width="20"
                  className="icon-fullscreen-off keep-overlay-on-hover"
                >
                  <path d="M22 20h-2v12h4v-8h8v-4zM12 22v-2h-12v4h8v8h4zM20 10v2h12v-4h-8v-8h-4zM10 12h2v-12h-4v8h-8v4z"></path>
                </svg>
              </a>
            </span>
          </span>
        )}
      </div>
    </div>
  );
};
