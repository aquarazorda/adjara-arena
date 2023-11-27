import { cn } from '~/lib/utils';
import LiveIcon from './LiveIcon';
import { useEffect, useRef } from 'react';

const formatDateTime = (date: Date) => {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const dateTooltip = (date: Date) => {
  let result = '';
  let lessThan1Hour = false;
  let timeDisplay = '';

  if (date) {
    const currentDate = new Date();
    const eventDate = new Date(date);

    const remainingTimeInMillis = eventDate.getTime() - currentDate.getTime();

    const days = Math.floor(remainingTimeInMillis / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTimeInMillis / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((remainingTimeInMillis / (1000 * 60)) % 60);

    if (days < 1 && hours < 1) {
      result = `${String(minutes - 10)}M`;
      lessThan1Hour = true;
    } else {
      result = formatDateTime(eventDate);
      lessThan1Hour = false;
    }

    timeDisplay = `${String(hours)}:${String(minutes)}`;
  }

  return { result, lessThan1Hour, timeDisplay };
};

const SetantaBox = ({ url, homepage, dataId, img, title, iframe, live, date, ended, clock }: any) => {
  const aTagRef = useRef(null);

  const { result, lessThan1Hour, timeDisplay } = dateTooltip(date);

  useEffect(() => {
    if (aTagRef.current) {
      const aTag = aTagRef.current as any;
      url && aTag.setAttribute('href', url);
      dataId && aTag.setAttribute('data-id', dataId);
      iframe && aTag.setAttribute('data-iframe', iframe);
    }
  }, [url, dataId, iframe]);

  return (
    <a
      ref={aTagRef}
      className={cn(
        'block w-full aspect-[345/195] rounded-lg relative overflow-hidden border-[1px] border-solid border-[#ffffff1a]',
        homepage ? 'h-auto' : 'h-[195px]'
      )}
    >
      <img className="absolute inset-0 w-full h-full object-cover z-[1]" src={img} alt={title} />
      <div className="absolute -bottom-[10px] w-full h-1/2 z-[2] bg-black-to-transparent"></div>

      {/* {{ isset($iframe) ? "data-iframe=$iframe" : '' }} */}
      <div className="event-item relative z-[3] font-ABMontPro inset-0 p-4 h-full flex flex-col justify-between">
        <div className="flex justify-end relative z-[2]">
          {live ? (
            <LiveIcon />
          ) : date && !lessThan1Hour && !clock ? (
            <div className="bg-[#000] px-[8px] py-[5px] rounded-lg flex items-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.2717 3.5H10.9266C10.8591 3.5 10.8043 3.44404 10.8043 3.375V2.5C10.8043 2.22386 10.5854 2 10.3152 2C10.0451 2 9.82609 2.22386 9.82609 2.5V4.875C9.82609 5.08211 9.66184 5.25 9.45924 5.25C9.25663 5.25 9.09239 5.08211 9.09239 4.875V3.75C9.09239 3.61193 8.9829 3.5 8.84783 3.5H5.79076C5.72342 3.5 5.66875 3.44434 5.66848 3.3755V2.5C5.66848 2.22386 5.44949 2 5.17935 2C4.90921 2 4.69022 2.22386 4.69022 2.5V4.875C4.69022 5.08211 4.52597 5.25 4.32337 5.25C4.12076 5.25 3.95652 5.08211 3.95652 4.875V3.75C3.95652 3.61193 3.84703 3.5 3.71196 3.5H2.97826C2.43798 3.5 2 3.94772 2 4.5V13C2 13.5523 2.43798 14 2.97826 14H12.2717C12.812 14 13.25 13.5523 13.25 13V4.5C13.25 3.94772 12.812 3.5 12.2717 3.5ZM12.0272 13H3.22283C3.08776 13 2.97826 12.8881 2.97826 12.75V6.75C2.97826 6.61193 3.08776 6.5 3.22283 6.5H12.0272C12.1622 6.5 12.2717 6.61193 12.2717 6.75V12.75C12.2717 12.8881 12.1622 13 12.0272 13Z"
                  fill="white"
                />
              </svg>
              <p className="text-[12px] font-bold text-white">{result}</p>
            </div>
          ) : date && lessThan1Hour && !clock ? (
            <div className="bg-[#000] px-[8px] py-[5px] rounded-lg flex items-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C13.9964 4.68778 11.3122 2.00358 8 2ZM10.6 10.6105C10.4115 10.81 10.0987 10.8237 9.8935 10.6415L7.414 8.3685C7.31002 8.27414 7.2505 8.14041 7.25 8V5.25C7.25 4.97386 7.47386 4.75 7.75 4.75C8.02614 4.75 8.25 4.97386 8.25 5.25V7.78L10.567 9.904C10.6652 9.99331 10.7239 10.118 10.7301 10.2507C10.7363 10.3833 10.6895 10.5129 10.6 10.611V10.6105Z"
                  fill="white"
                />
              </svg>
              <p className="text-[12px] font-bold text-white">{result}</p>
            </div>
          ) : (
            <div className="bg-[#000] px-[8px] py-[5px] rounded-lg flex items-center">
              <p className="text-[12px] font-bold text-white">{timeDisplay}</p>
            </div>
          )}
        </div>
        {ended ? (
          <div className="bg-black/80 inset-0 w-full h-full absolute z-[1] flex flex-col gap-2 justify-center items-center">
            <p className="text-[16px] font-bold text-setanta_yellow">ტრანსლაცია დასრულებულია</p>
            <p className="text-[16px] font-bold text-white">{title}</p>
          </div>
        ) : (
          <p className="text-[16px] font-bold text-white">{title}</p>
        )}
      </div>
    </a>
  );
};

export default SetantaBox;
