import { vis } from './utils';
import { clsx } from 'clsx';
import { useCallback, useContext } from 'react';
import { VideoContext } from './player-provider';

interface Input {
  title: string;
}

export const Header = ({ title }: Input) => {
  const { controlsVisible } = useContext(VideoContext);

  const moveBack = useCallback(() => {
    window.location.href = '/setantasports';
    return;
  }, []);

  return (
    <div style={{ position: 'absolute' }} className={clsx('dice-player-topbar', vis(controlsVisible))}>
      <div className="left-section">
        <span className="tooltip">
          <span className="tooltip__message tooltip-bottom">უკან</span>
          <span>
            <a href="/" onClick={moveBack}>
              <div className="icon-arrow-left-wrapper">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="icon-arrow-left keep-overlay-on-hover"
                  width="18"
                  height="18"
                >
                  <path d="M25.875 3.75l-3.75-3.75-16 16 16 16 3.75-3.813-12.188-12.188z"></path>
                </svg>
              </div>
              <span className="player-title">{title}</span>
            </a>
          </span>
        </span>
      </div>
      <a href="/" onClick={moveBack}>
        <img
          alt="Link to homepage"
          src="https://static.diceplatform.com/prod/AUTOx110/dce.adjara/settings/Landscape_Logo.miEgJ.png?ts=1641424332"
        />
      </a>
      <div className="right-section">
        <div id="topbar-items">
          <div className="sidebar--tabs hidden-xs"></div>
        </div>
      </div>
    </div>
  );
};
