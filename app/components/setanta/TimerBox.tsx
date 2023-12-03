import React, { useState, useEffect } from 'react';

function TimerBox({ date, classes = '' }: any) {
  const [timer, setTimer] = useState({ D: 0, H: 0, M: 0, S: 0 });

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
      className={`flex text-white gap-4 drop-shadow-lg shadow-black ${classes}`}
      id={`timer_${Date.now()}`}
      data-end-date={date}
    >
      <div className={`flex flex-col items-center ${timer.D === 0 ? 'hidden' : ''}`}>
        <p className="text-[28px] md:text-[40px]">{timer.D}</p>
        <p className="text-[12px] md:text-[20px]">დღე</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-[28px] md:text-[40px]">{timer.H}</p>
        <p className="text-[12px] md:text-[20px]">საათი</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-[28px] md:text-[40px]">{timer.M}</p>
        <p className="text-[12px] md:text-[20px]">წუთი</p>
      </div>
      <div className={`flex flex-col items-center ${timer.D > 0 ? 'hidden' : ''}`}>
        <p className="text-[28px] md:text-[40px]">{timer.S}</p>
        <p className="text-[12px] md:text-[20px]">წამი</p>
      </div>
    </div>
  );
}

export default TimerBox;
