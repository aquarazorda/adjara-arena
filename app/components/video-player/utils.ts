import { match } from 'ts-pattern';
import React from 'react';
import type { VideoContextType } from './player-provider';

export type InputWithVisible = {
  visible: boolean;
};

export const ss = (setState: React.Dispatch<React.SetStateAction<any>>) => (value: Record<string, any>) =>
  setState((prev: any) => ({ ...prev, ...value }));

export const vis = (visible: boolean) => `overlay-item--${visible ? 'visible' : 'hidden'}`;

type SetState = (value: Partial<VideoContextType>) => void;
type Listener = (ss: SetState, player: HTMLVideoElement) => () => void;

export const wrapWithState = (ss: SetState, player: HTMLVideoElement, fn: Listener): (() => void) => {
  return fn(ss, player);
};

const pipEnterListener = (ss: SetState, player: HTMLVideoElement) => () => ss({ isPictureInPicture: true });
const pipLeaveListener = (ss: SetState, player: HTMLVideoElement) => () => ss({ isPictureInPicture: false });

const _videoEventListeners: { event: keyof HTMLVideoElementEventMap; listener: Listener }[] = [
  // { event: 'volumechange', listener: volumeChangeListener }
  // { event: 'ratechange', listener: speedChangeListener },
  { event: 'enterpictureinpicture', listener: pipEnterListener },
  { event: 'leavepictureinpicture', listener: pipLeaveListener },
  // { event: 'durationchange', listener: durationChangeListener }
];

export const videoEventListeners = (ss: SetState, player: HTMLVideoElement) =>
  _videoEventListeners.map(({ event, listener }) => ({ event, listener: wrapWithState(ss, player, listener) }));

export const kbEventListener =
  (player: (HTMLVideoElement & HTMLMediaElement) | null) => (ev: React.KeyboardEvent<HTMLDivElement>) =>
    match(ev.code)
      .with('KeyK', 'Space', () => (player?.paused ? player.play() : player?.pause()))
      .otherwise(() => {});
