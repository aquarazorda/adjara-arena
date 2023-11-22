import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Header } from './header';
import { Loader } from './loader';
import { PlayPause } from './play-pause';
import { clsx } from 'clsx';
// @ts-ignore
import shaka, { Player } from 'shaka-player/dist/shaka-player.ui';
import { AudioTrack, useVideoContext, BrowserTypes } from './player-provider';
import { Controls } from './controls';
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
import { match } from 'ts-pattern';
import { kbEventListener, videoEventListeners } from './utils';
import usePlayerError from './hooks/usePlayerError';
import useWatchSession, { WatchState } from './hooks/useWatchSession';
import { differenceInSeconds, intervalToDuration, subSeconds } from 'date-fns';

type Match = {
  id: number;
  title: string;
  tournament: string;
  status: string;
  match_id: string;
  poster: string;
  cover: string;
  stream: string;
  without_auth: boolean;
  start_at: Date;
  has_dvr: boolean;
};

export const ShakaPlayer = ({ stream, cover, title, id, start_at, has_dvr }: Match) => {
  const playerRef = useRef(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [ply, setPlayer] = useState<Player>();
  const [loading, setLoading] = useState<boolean>(false);
  const [sendError] = usePlayerError();
  const [sendEvent] = useWatchSession();

  const {
    player,
    controlsVisible,
    isPictureInPicture,
    isPlaying,
    isSeeking,
    isLoaded,
    browser,
    togglePIP,
    setState,
    isFullScreen,
  } = useVideoContext();

  useEffect(() => {
    if (isFullScreen) {
      document.querySelector('#root')?.classList.add('is-full-screen');
    } else {
      document.querySelector('#root')?.classList.remove('is-full-screen');
    }
  }, [isFullScreen]);

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

  // Watch for double click
  useEffect(() => {
    let touchtime = 0;
    const doubleClick = (event: any) => {
      event.preventDefault();
      if (touchtime === 0) {
        touchtime = new Date().getTime();
      } else {
        if (new Date().getTime() - touchtime < 400) {
          toggleFullScreen();
          touchtime = 0;
        } else {
          touchtime = new Date().getTime();
        }
      }
    };

    wrapperRef.current?.addEventListener('click', doubleClick);

    return () => {
      wrapperRef.current?.removeEventListener('click', doubleClick);
    };
  }, [toggleFullScreen]);

  const keyListener = useMemo(() => kbEventListener(player), [player]);

  const eventListeners = useMemo(
    () => playerRef.current && videoEventListeners(setState, playerRef.current),
    [setState]
  );

  useEffect(() => {
    // @ts-ignore
    eventListeners?.forEach(({ event, listener }) => player?.addEventListener(event, listener));

    return () =>
      // @ts-ignore
      eventListeners?.forEach(({ event, listener }) => player?.removeEventListener(event, listener));
  }, [eventListeners, player]);

  // @ts-ignore
  window.dataLayer = window.dataLayer || [];

  useEffect(() => {
    window.addEventListener('unload', () => {
      const startDate = localStorage.getItem(`${id}:start_stream`);

      if (!startDate) {
        return;
      }

      const duration = intervalToDuration({ start: new Date(startDate), end: new Date() });

      sendEvent(id, WatchState.end, String(sessionStorage.getItem('watch:session_id')));

      // @ts-ignore
      window?.dataLayer.push({
        event: 'stream_complete',
        stream_duration: duration.seconds,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sessionId = (): string => (Math.random() + 1).toString(36).substring(2);

  useEffect(() => {
    async function loadPlayer() {
      if (playerRef.current) {
        shaka.polyfill.installAll();
        if (!shaka.Player.isBrowserSupported()) {
          console.error('Browser not supported!');
          return;
        }

        let format = browser === BrowserTypes.Safari ? '.m3u8' : '.mpd';

        const now = new Date();
        const start = new Date(start_at);
        const diff = Math.abs(differenceInSeconds(start, now));
        const streamLink = has_dvr ? stream.replace('/index', `/rewind-${diff}`) + format : stream + format;

        const ply = new Player(playerRef.current);
        setPlayer(ply);

        const assetIds: any = {
          livestream_17: 'A16AE369-CE8E-745B-DC2C-C4A5CC92626C',
          livestream_18: '712EDEAC-5F4A-BCA0-5829-D5D149A298DF',
          livestream_19: 'B3BC35AC-263E-0870-782A-1D02703D1413',
          livestream_20: 'BCCB7082-5912-10AA-8D06-641B329AE5DE',
          livestream_21: '7716BA15-40EB-CF9A-1341-17622B218654',
          livestream_22: '89CFC4A5-269C-73C4-7AB5-635D2CB13CCB',
          livestream_23: '60366BAF-B594-31B2-05D9-F95AE5082402',
          livestream_24: '20C686AF-2E25-A598-E535-81FA58AFB34A',
          livestream_25: '87880033-95A7-5453-26B0-6B88583E3F8F',
          livestream_26: '39258109-5664-B143-3C01-3FF396AE13FD',
          livestream_27: '16DE97C3-CA2C-C56D-9CC1-08635094F501',
          livestream_28: '90483759-0F0C-7ED9-16C2-3F5F7CB6B8E3',
          livestream_29: '3D479943-F4D8-CB9B-FCFE-3217C09DB178',
          livestream_30: 'D4225E81-A7FC-74F8-5396-CDC091E37A71',
          livestream_31: '6E6F8836-0B93-0F2E-086B-DE6EF2C20325',
          livestream_32: '8072D60D-2A9F-6D14-BB9A-87A2AC6D5753',
        };

        let config = {
          drm: {
            servers: {
              'com.widevine.alpha': 'https://widevine-dash.ezdrm.com/proxy?pX=E2E939',
              'com.microsoft.playready': 'https://playready.ezdrm.com/cency/preauth.aspx?pX=17A199',
              'com.apple.fps.1_0': 'https://fps.ezdrm.com/api/licenses/eccf68ad-3005-3930-945c-a191862ac926',
            },
          },
        };

        if (browser === BrowserTypes.Safari) {
          const req = await fetch('https://adjarabetarena.com/fairplay.cer');
          const cert = await req.arrayBuffer();
          ply.configure('drm.advanced.com\\.apple\\.fps\\.1_0.serverCertificate', new Uint8Array(cert));

          const list = streamLink.split('/');
          const streamId = list[list.length - 2];
          const assetId = assetIds[streamId];

          config.drm.servers = {
            ...config.drm.servers,
            'com.apple.fps.1_0': `https://fps.ezdrm.com/api/licenses/${assetId}`,
          };
        }

        ply.configure(config);
        ply.src = streamLink;

        try {
          await ply.load(streamLink);

          localStorage.setItem(`${id}:start_stream`, new Date().toISOString());
          const watchSessionId = sessionId();
          sessionStorage.setItem('watch:session_id', watchSessionId);

          sendEvent(id, WatchState.start, watchSessionId);

          // @ts-ignore
          window?.dataLayer.push({
            event: 'stream_start',
            stream_duration: new Date().toISOString(),
          });
        } catch (error: any) {
          sendError(error, error.code);
        }

        ply.addEventListener('error', (error: any) => {
          sendError(error, error.code);
        });

        ply.addEventListener('loaded', () => {
          player?.play();
          setLoading(false);
        });

        ply.addEventListener('variantchanged', (value: any) => {
          if (browser !== BrowserTypes.Safari) {
            setLoading(true);
          }
        });
      }
    }

    loadPlayer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSeeking]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changeControlsVisibleDebounced = useCallback(
    debounce(() => {
      setState({ controlsVisible: false });
    }, 3000),
    [setState]
  );

  const onPlayerHover = useCallback(
    (hovered: boolean, isPlaying: boolean) =>
      match({ hovered, isPlaying })
        .with({ isPlaying: false }, () => setState({ controlsVisible: true }))
        .otherwise(({ isPlaying }) => {
          setState({ controlsVisible: hovered });
          hovered && isPlaying && changeControlsVisibleDebounced();
          changeControlsVisibleDebounced();
        }),
    [setState, changeControlsVisibleDebounced]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledOnPlayerHover = useCallback(throttle(onPlayerHover, 100), [onPlayerHover]);

  const onPlay = () => {
    if (playerRef.current && !isPlaying) setState({ isPlaying: true });
  };

  useEffect(() => {
    if (wrapperRef.current) wrapperRef.current.focus();
  }, [wrapperRef]);

  useEffect(() => setState({ player: playerRef.current }), [playerRef, setState]);

  useEffect(() => {
    if (isPlaying) {
      if (browser !== BrowserTypes.Safari) {
        setInterval(() => {
          const stats = ply.getStats();
          const estimatedBandwidth = stats.estimatedBandwidth;

          let variants = ply.getVariantTracks();

          if (variants.length <= 1) {
            return;
          }

          const current = variants.find((item: AudioTrack) => item.active);

          variants = variants.filter((item: AudioTrack) => item.language === current.language);

          const defaultVariant = variants[variants.length - 1];

          variants = variants
            .sort((t1: AudioTrack, t2: AudioTrack) => {
              return t2.bandwidth - t1.bandwidth;
            })
            .filter((item: AudioTrack) => item.bandwidth < estimatedBandwidth);

          ply.selectVariantTrack(variants[0] || defaultVariant);
        }, 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  const onLoad = useCallback(() => {
    setState({ isLoaded: true });
    setLoading(false);

    const tracks = ply.getVariantTracks().sort((t1: any, t2: any) => {
      return t2.bandwidth - t1.bandwidth;
    });

    const audioTracks = tracks.reduce((acc: any, curr: any) => {
      let newEntry = [];

      if (acc[curr.language]) {
        newEntry = acc[curr.language];
      }

      acc[curr.language] = [...newEntry, curr];

      return acc;
    }, {});

    const currentTracks = Object.keys(audioTracks).map((lang: string) => {
      const track = audioTracks[lang][0];
      track.active = false;

      return track;
    });

    setState({ tracks: currentTracks, playerInstance: ply });
  }, [setState, ply]);

  const onProgressChange = useCallback(() => {
    setLoading(false);

    if (player) {
      setState({
        progress: player?.currentTime || 0,
        duration: {
          startTime: has_dvr ? new Date(start_at) : subSeconds(new Date(), 8),
          currentDuration: ply.seekRange().end,
        },
        seekRange: ply.seekRange(),
      });
    }
  }, [player, setState, has_dvr, start_at, ply]);

  return (
    <>
      {/* {!isLoaded && (
        <div className="page-placeholder">
          <div className="loader-container loader--fixed page-placeholder-leave page-placeholder-leave-active">
            <div className="loader-dice">
              <svg width="100px" height="100px">
                <defs>
                  <linearGradient id="gradient">
                    <stop offset="0%" stopColor="#fdce09"></stop>
                    <stop offset="100%" stopColor="transparent"></stop>
                  </linearGradient>
                </defs>
                <circle
                  cx="50"
                  cy="50"
                  r="41"
                  strokeWidth="3"
                  stroke="url(#gradient)"
                ></circle>
              </svg>
            </div>
          </div>
        </div>
      )} */}
      <div
        className={clsx(
          'video-wrapper view',
          !controlsVisible && 'controls-invisible',
          isFullScreen && 'is-full-screen'
        )}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      >
        <div
          ref={wrapperRef}
          style={{ position: 'absolute' }}
          className={clsx(
            'dice-player-wrapper',
            isLoaded && 'ready',
            isPictureInPicture && 'dice-player-wrapper--picture',
            isFullScreen && 'is-full-screen'
          )}
          onMouseEnter={() => onPlayerHover(true, isPlaying)}
          onMouseMove={() => throttledOnPlayerHover(true, isPlaying)}
          onClick={() => throttledOnPlayerHover(true, isPlaying)}
          onMouseLeave={() => onPlayerHover(false, isPlaying)}
          onKeyDown={(event) => keyListener(event)}
          tabIndex={0}
        >
          <div className="dice-player-background">
            <div className="ds-replay-wrapper">
              <div className="ds-replay-live-label">LIVE</div>
              <div id="dice-player">
                <video
                  ref={playerRef}
                  autoPlay={true}
                  preload="auto"
                  onPlay={onPlay}
                  onPause={() => isPlaying && setState({ isPlaying: false })}
                  onTimeUpdate={onProgressChange}
                  onRateChange={() => setState({ speed: player?.playbackRate })}
                  onLoadedData={onLoad}
                  playsInline
                />
              </div>
            </div>
            <div className="dice-player-replay-title">
              <div className="replay-progress">
                <div className="replay-half replay-half-one"></div>
                <div className="replay-half replay-half-two"></div>
                <span>0</span>
              </div>
            </div>
            <div className="ds-replay-player"></div>
            <div className="dice-player-overlay ds-ad-ui hover" style={{ position: 'absolute' }}>
              <div
                style={{ position: 'absolute' }}
                className={clsx('dice-player-wrapper', isPictureInPicture && 'picture-in-picture')}
              >
                {isPictureInPicture && (
                  <div className="pip-container">
                    <h1>ეს ვიდეო ჩართულია ამონათებულ ფლეიერში</h1>
                    <button className="btn btn-remove-default btn-pip" type="button" onClick={togglePIP}>
                      ფლეიერის დახურვა
                    </button>
                  </div>
                )}
                <div
                  className={clsx('placeholder', isLoaded && 'ready')}
                  style={{ backgroundImage: `url("${cover}")`, zIndex: -1 }}
                ></div>
              </div>
              {(!isLoaded || loading) && <Loader />}
              <Header title={title} />
              <div className="dice-player-sidebar hidden-xs overlay-item--hidden dice-player-sidebar--medium"></div>
              <div className="dice-player-hotkey-feedback btn-play">
                <span className="dice-player-hotkey-feedback__wrapper"></span>
              </div>
              {isLoaded && !loading && <PlayPause />}
              <div className="ds-ad__info">
                <span className="ds-ad__info-label">Learn More</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="ds-icon ds-icon--share">
                  <path
                    fill="currentColor"
                    d="M564.907 196.35L388.91 12.366C364.216-13.45 320 3.746 320 40.016v88.154C154.548 130.155 0 160.103 0 331.19c0 94.98 55.84 150.231 89.13 174.571 24.233 17.722 58.021-4.992 49.68-34.51C100.937 336.887 165.575 321.972 320 320.16V408c0 36.239 44.19 53.494 68.91 27.65l175.998-184c14.79-15.47 14.79-39.83-.001-55.3zm-23.127 33.18l-176 184c-4.933 5.16-13.78 1.73-13.78-5.53V288c-171.396 0-295.313 9.707-243.98 191.7C72 453.36 32 405.59 32 331.19 32 171.18 194.886 160 352 160V40c0-7.262 8.851-10.69 13.78-5.53l176 184a7.978 7.978 0 0 1 0 11.06z"
                  ></path>
                </svg>
              </div>
              <div className="ds-break-status-container"></div>
              <Controls />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
