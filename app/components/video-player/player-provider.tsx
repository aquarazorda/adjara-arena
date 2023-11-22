import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ss } from './utils';

export type AudioTrack = { language: string; active: boolean; bandwidth: number };

export type PlayerWithAudioTracks = HTMLVideoElement &
  HTMLMediaElement & {
    audioTracks: AudioTrack[];
  };

export enum BrowserTypes {
  Safari = 'Apple Safari',
  Chrome = 'Google Chrome',
  IE = 'Internet Explorer',
  Mozila = 'Mozilla Firefox',
  Edge = 'Microsoft Edge',
  Unknown = '',
}

export type VideoContextType = {
  isPlaying: boolean;
  isLoaded: boolean;
  isSeeking: boolean;
  controlsVisible: boolean;
  muted: boolean;
  volume: number;
  speed: number;
  progress: number;
  progressPercentage: number;
  tracks: AudioTrack[];
  duration: {
    startTime: Date | null;
    currentDuration: number;
  };
  seekRange: { start: 0; end: 0 } | null;
  isFullScreen: boolean;
  isPictureInPicture: boolean;
  player: PlayerWithAudioTracks | null;
  playerInstance: any;
  setState: (value: Partial<VideoContextType>) => void;
  togglePlay: () => void;
  togglePIP: () => void;
  browser: BrowserTypes;
};

const defaultState = {
  isPlaying: false,
  isLoaded: false,
  isSeeking: false,
  controlsVisible: true,
  muted: false,
  volume: 1,
  speed: 1,
  isFullScreen: false,
  isPictureInPicture: false,
  player: null,
  progress: 0,
  progressPercentage: 100,
  tracks: [],
  duration: {
    currentDuration: 0,
    startTime: null,
  },
  seekRange: null,
  playerInstance: null,
  browser: BrowserTypes.Chrome,
  setState: () => {},
  togglePlay: () => {},
  togglePIP: () => {},
};

export const VideoContext = createContext<VideoContextType>(defaultState);
export const useVideoContext = () => useContext(VideoContext);

export const VideoProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<VideoContextType>({ ...defaultState, browser: detectBrowser() });

  const togglePlay = useCallback(() => {
    state.isPlaying ? state.player?.pause() : state.player?.play();
    setState((prev) => ({ ...prev, isPlaying: !state.isPlaying }));
  }, [state.player, state.isPlaying]);

  const togglePIP = useCallback(() => {
    setState((prev) => ({ ...prev, isPictureInPicture: !state.isPictureInPicture }));
    state.isPictureInPicture ? document.exitPictureInPicture() : state.player?.requestPictureInPicture();
  }, [state.isPictureInPicture, state.player]);

  useEffect(
    () =>
      setState((prev) => ({
        ...prev,
        togglePlay,
        togglePIP,
      })),
    [togglePlay, togglePIP]
  );

  useEffect(() => setState((prev) => ({ ...prev, setState: ss(setState) })), [setState]);

  return <VideoContext.Provider value={state}>{children}</VideoContext.Provider>;
};

const detectBrowser = (): BrowserTypes => {
  let browser = BrowserTypes.Unknown;
  const userAgent = window.navigator.userAgent;

  if (userAgent.includes('MSIE') || userAgent.includes('Trident/7')) {
    browser = BrowserTypes.IE;
  } else if (userAgent.includes('Firefox')) {
    browser = BrowserTypes.Mozila;
  } else if (userAgent.includes('Edg')) {
    browser = BrowserTypes.Edge;
  } else if (userAgent.includes('Chrome')) {
    browser = BrowserTypes.Chrome;
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    browser = BrowserTypes.Safari;
  }

  return browser;
};
