import { InputWithVisible } from '../utils';
import { clsx } from 'clsx';
import { AudioTrack, VideoContext } from '../player-provider';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

interface Input extends InputWithVisible, React.HTMLAttributes<HTMLDivElement> {}

const speeds = [0.25, 0.5, 1];

const playerLang: any = {
  ka: 'Georgia',
  en: 'English',
  uk: 'Ukrainian',
  ru: 'Russian',
};

export const Preferences = ({ visible, ...rest }: Input) => {
  const ref = useRef<HTMLDivElement>(null);
  const { speed, player, tracks, playerInstance } = useContext(VideoContext);
  const isSelected = useCallback(
    (spd: number) => (speed === spd ? 'preferences-panel__option--selected' : ''),
    [speed]
  );
  const changeSpeed = useCallback(
    (spd: number) => {
      if (player) player.playbackRate = spd;
    },
    [player]
  );
  const [audioTracks, setAudioTracks] = useState<AudioTrack[]>([]);

  const changeAudio = (lang: string) => {
    // Disable abr manager before changing tracks.
    const config = { ...playerInstance.getConfiguration(), abr: { enabled: false } };
    playerInstance.configure(config);
    playerInstance.selectAudioLanguage(lang);

    setAudioTracks((curr) => curr.map((item: any) => ({ ...item, active: lang === item.language })));
  };

  useEffect(() => {
    setAudioTracks(tracks);

    if (tracks.length) {
      const newTracks = Array.from(tracks);
      const occupantCountryIndex = newTracks.findIndex((i) => i.language === 'ru');
      delete newTracks[occupantCountryIndex];

      setAudioTracks([...newTracks, tracks[occupantCountryIndex]].filter((it) => it));
    }
  }, [tracks]);

  const audioPanel = useMemo(() => {
    if (audioTracks.length === 0) return [];

    const items = [];
    let audioTrack = -1;

    for (let i = 0; i < audioTracks.length; i++) {
      const track = audioTracks[i] as any;
      const trackNum = Number(track.id);
      if (track.active) audioTrack = trackNum;

      const active = trackNum === audioTrack;
      const lang = track.lang || track.language;

      if (lang)
        items.push(
          <li
            key={trackNum}
            className={clsx('preferences-panel__option', active && 'preferences-panel__option--selected')}
            onClick={() => changeAudio(track.language)}
          >
            <span className="preferences-panel__option__label">{playerLang[lang]}</span>
            {active && (
              <span className="preferences-panel__selected-mark">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="14" width="14">
                  <path d="M29.813 10.125c0 0.438-0.125 0.875-0.5 1.188l-15.313 15.375c-0.375 0.313-0.75 0.5-1.25 0.5-0.438 0-0.875-0.188-1.188-0.5l-8.875-8.875c-0.375-0.375-0.5-0.75-0.5-1.25 0-0.438 0.125-0.875 0.5-1.188l2.375-2.438c0.375-0.313 0.75-0.5 1.25-0.5 0.438 0 0.875 0.188 1.188 0.5l5.25 5.25 11.75-11.75c0.313-0.313 0.75-0.5 1.188-0.5 0.5 0 0.875 0.188 1.25 0.5l2.375 2.438c0.375 0.375 0.5 0.75 0.5 1.25z"></path>
                </svg>
              </span>
            )}
          </li>
        );
    }

    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioTracks]);

  useEffect(() => {
    visible && ref.current?.focus();
  }, [visible]);

  return (
    <div
      {...rest}
      ref={ref}
      className={clsx('dice-preferences__container', visible && 'dice-preferences__container--active')}
    >
      <div className="preferences-panel">
        <div className={clsx('preferences-panel__content', visible && 'preferences-panel__content--active')}>
          {!!audioTracks.length && (
            <div className="preferences-panel__entry">
              <span className="preferences-panel__title">ენა</span>
              <ul className="preferences-panel__options">{audioPanel}</ul>
            </div>
          )}
          <div className="preferences-panel__entry">
            <span className="preferences-panel__title">სიჩქარე</span>
            <ul className="preferences-panel__options">
              {speeds.map((val, i) => (
                <li key={i} className="preferences-panel__option">
                  <span className={clsx('preferences-panel__option', isSelected(val))} onClick={() => changeSpeed(val)}>
                    {val}x
                  </span>
                  {isSelected(val) && (
                    <span className="preferences-panel__selected-mark">
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="14" width="14">
                        <path d="M29.813 10.125c0 0.438-0.125 0.875-0.5 1.188l-15.313 15.375c-0.375 0.313-0.75 0.5-1.25 0.5-0.438 0-0.875-0.188-1.188-0.5l-8.875-8.875c-0.375-0.375-0.5-0.75-0.5-1.25 0-0.438 0.125-0.875 0.5-1.188l2.375-2.438c0.375-0.313 0.75-0.5 1.25-0.5 0.438 0 0.875 0.188 1.188 0.5l5.25 5.25 11.75-11.75c0.313-0.313 0.75-0.5 1.188-0.5 0.5 0 0.875 0.188 1.25 0.5l2.375 2.438c0.375 0.375 0.5 0.75 0.5 1.25z"></path>
                      </svg>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
