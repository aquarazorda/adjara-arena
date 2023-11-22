import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useVideoContext } from '../player-provider';
import { differenceInSeconds, format, subSeconds } from 'date-fns';

const mouseEnterEvent = new MouseEvent('mouseenter', {
  bubbles: true,
  cancelable: true,
  view: window,
});

const mouseLeaveEvent = new MouseEvent('mouseleave', {
  bubbles: true,
  cancelable: true,
  view: window,
});

export const ProgressBar = () => {
  const { progress, duration, player, progressPercentage, seekRange, isLoaded, setState } = useVideoContext();
  const [hoverPerc, setHoverPerc] = useState(0);
  const [timer, setTimer] = useState({ pos: 0, time: '' });
  const [rangeValue, setRangeValue] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const emulateHover = (entered: boolean) => {
    const slider = sliderRef.current;
    entered ? slider?.dispatchEvent(mouseEnterEvent) : slider?.dispatchEvent(mouseLeaveEvent);
  };

  const progressChange = useMemo(
    () =>
      throttle((duration, progress, seekRange) => {
        if (seekRange) {
          const max = seekRange.end;
          const min = seekRange.start;

          const percentage = 100 - ((max - progress - 8) / (max - min)) * 100;

          setState({ progressPercentage: percentage > 100 ? 100 : percentage });
        }
      }, 1000),
    [setState]
  );

  useEffect(() => {
    progressChange(duration, progress, seekRange);
    if (rangeValue === 0) {
      setRangeValue(progress);
    }
  }, [progress, duration, progressChange, seekRange, rangeValue]);

  const onChange = (event: any) => {
    const { value } = event.target;

    setRangeValue(value);

    setState({ isSeeking: true });
    player?.pause();

    if (seekRange) {
      const max = seekRange.end;
      const min = seekRange.start;

      const percentage = 100 - ((max - value) / (max - min)) * 100;

      setState({ progressPercentage: percentage > 100 ? 100 : percentage });
    }

    setHoverPerc(0);
    if (player) {
      player.currentTime = value;
      player?.play();
      setState({ isSeeking: false });
    }
  };

  const scrubberPos = useMemo(() => {
    const width = sliderRef.current?.offsetWidth || 0;
    return (width * progressPercentage) / 100;
  }, [sliderRef, progressPercentage]);

  useEffect(() => {
    return () => {
      progressChange.cancel();
    };
  }, [progressChange]);

  const mouseMove = useMemo(
    () =>
      debounce(({ offsetX }) => {
        const width = sliderRef.current?.offsetWidth || 0;
        const relativeProgress = (offsetX * 100) / width;

        const durr = differenceInSeconds(new Date(), duration.startTime || new Date());
        const diffSeconds = (durr * (100 - relativeProgress)) / 100;
        const seekTime = subSeconds(new Date(), diffSeconds);

        let diff = format(new Date(differenceInSeconds(new Date(), seekTime) * 1000), 'H:mm:ss');

        if (!isLoaded) {
          diff = '00:00';
        }

        setHoverPerc(relativeProgress);
        setTimer({
          pos: offsetX,
          time: `-${diff}`,
        });
      }, 5),
    [duration.startTime, isLoaded]
  );

  const eventListeners = useMemo(
    () => [
      { type: 'mousemove', listener: mouseMove },
      { type: 'mouseleave', listener: () => setHoverPerc(0) },
    ],
    [mouseMove]
  );

  useEffect(() => {
    const input = inputRef.current;

    if (input)
      eventListeners.forEach(({ type, listener }) => {
        input.addEventListener(type, listener);
      });

    return () => {
      eventListeners.map(({ type, listener }) => input?.removeEventListener(type, listener));
    };
  }, [eventListeners]);

  return (
    <div className="ds-seek-bar">
      <div className="ds-seek-bar__progress-container">
        <div className="ds-slider__root ds-slider__horizontal ds-slider__draggable" ref={sliderRef}>
          <input
            ref={inputRef}
            type="range"
            min={seekRange ? seekRange.start : 0}
            max={seekRange ? seekRange.end : 0}
            // onChange={onChange}
            onInput={onChange}
            className="player-main-slider"
            value={rangeValue}
            onMouseEnter={() => emulateHover(true)}
            onMouseLeave={() => emulateHover(false)}
          />
          <div className="ds-slider__slider-background"></div>
          <div className="ds-slider__slider-hover" style={{ transform: `scaleX(${hoverPerc / 100})` }}></div>
          <div
            className="ds-slider__slider"
            style={{
              transform: `scaleX(${progressPercentage / 100})`,
            }}
          ></div>
          <div className="ds-slider__tooltip-container" style={{ transform: `translateX(${timer.pos}px)` }}>
            <div className="ds-slider__tooltip-label">
              <span>{timer.time}</span>
            </div>
          </div>
          <div
            className="ds-slider__scrubber-container"
            style={{
              transform: `translateX(${scrubberPos}px)`,
              bottom: '18px',
            }}
          >
            <div className="ds-slider__shy-scrubber" style={{ height: '12px' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
