import { useContext, useMemo } from 'react';
import { clsx } from 'clsx';
import { match } from 'ts-pattern';
import { vis } from './utils';
import { VideoContext } from './player-provider';

export const PlayPause = () => {
  const { isPlaying, controlsVisible, isPictureInPicture, togglePlay } = useContext(VideoContext);

  const visible = useMemo(
    () =>
      match({ isPlaying, controlsVisible, isPictureInPicture })
        .with({ isPictureInPicture: true }, () => false)
        .with({ isPlaying: true, controlsVisible: false }, () => false)
        .with({ isPlaying: false }, () => true)
        .otherwise(() => true),
    [isPlaying, controlsVisible, isPictureInPicture]
  );

  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  return (
    <a
      id="pause"
      className={clsx('btn-play', !isPlaying && 'paused', vis(visible))}
      title="ჩართვა (k)"
      onClick={togglePlay}
    >
      <span className="play-icon keep-overlay-on-hover"></span>
    </a>
  );
};
