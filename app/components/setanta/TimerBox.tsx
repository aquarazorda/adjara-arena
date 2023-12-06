import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '~/lib/utils';

function TimerBox({ date, className, size = 2 }: any) {
  const { t } = useTranslation();

  const [timer, setTimer] = useState({ D: 0, H: 0, M: 0, S: 0 });

  const [fontSize, setFontSize] = useState(`text-[20px]`);

  useEffect(() => {
    setFontSize(() => {
      return `text-[${size * 10}px]`;
    });
  }, [size]);

  useEffect(() => {
    const endDate = new Date(date);
    const timerId = setInterval(() => {
      const now = new Date();
      const endDateTimestamp = endDate.getTime();
      const nowTimestamp = now.getTime();
      const diffInSeconds = Math.floor((endDateTimestamp - nowTimestamp) / 1000);

      const D = Math.floor(diffInSeconds / 86400);
      const H = Math.floor((diffInSeconds % 86400) / 3600);
      const M = Math.floor((diffInSeconds % 3600) / 60);
      const S = diffInSeconds % 60;

      setTimer({ D, H, M, S });

      if (diffInSeconds <= 0) {
        clearInterval(timerId);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [date]);

  return (
    <div
      className={cn('flex justify-center text-white gap-4 drop-shadow-lg shadow-black', fontSize, className)}
      id={`timer_${Date.now()}`}
      data-end-date={date}
    >
      <div className={`flex flex-col items-center ${timer.D === 0 ? 'hidden' : ''}`}>
        <p className="text-[1.4em] md:text-[2em]">{timer.D}</p>
        <p className="text-[0.6em] md:text-[1em]">{t('day')}</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-[1.4em] md:text-[2em]">{timer.H}</p>
        <p className="text-[0.6em] md:text-[1em]">{t('hour')}</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-[1.4em] md:text-[2em]">{timer.M}</p>
        <p className="text-[0.6em] md:text-[1em]">{t('minute')}</p>
      </div>
      <div className={`flex flex-col items-center ${timer.D > 0 ? 'hidden' : ''}`}>
        <p className="text-[1.4em] md:text-[2em]">{timer.S}</p>
        <p className="text-[0.6em] md:text-[1em]">{t('second')}</p>
      </div>
    </div>
  );
}

export default TimerBox;
