import { useState, useEffect } from 'react';
import TimerBox from './TimerBox';

function SetantaHero({ img, title, date, link, liveLink, dataId }: any) {
  const [live, setLive] = useState(false);

  useEffect(() => {
    // const now = new Date();
    // const parsedDate = new Date(date);
    // setLive();
  }, [date]);

  return (
    <div>
      <img
        className="absolute z-1 left-0 w-full h-[140%] md:h-auto object-cover -top-[20%] md:top-0 object-[65%]"
        src={img}
        alt={title}
        style={{ filter: 'brightness(.5)' }}
      />
      <div className="relative z-2 flex flex-col items-center">
        <div className="flex flex-col items-center mt-[100px] mb-[50px] md:mb-0 md:mt-[14vw] font-regular_uppercase">
          <h1 className="text-[52px] md:text-[64px] text-white drop-shadow-lg shadow-black/70 font-bold text-center">
            {title}
          </h1>

          {!live ? (
            <>
              <TimerBox classes="mt-[24px]" date="2024-01-01T00:00:00" />
              <a
                href={link}
                data-id={dataId || undefined}
                className="text-[16px] mt-10 flex justify-center items-center h-[55px] w-[180px] bg-setanta-yellow rounded-base font-semibold text-black"
              >
                გაიგე მეტი
              </a>
            </>
          ) : (
            <a
              href={liveLink}
              data-id={dataId || undefined}
              className="text-[16px] mt-10 flex justify-center items-center h-[55px] w-[180px] bg-setanta-yellow rounded-base font-semibold text-black"
            >
              ლაივი
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default SetantaHero;
