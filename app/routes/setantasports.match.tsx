import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TimerBox from '~/components/setanta/TimerBox';
import { cn } from '~/lib/utils';

const SetantasportsMatch = () => {
  const { t } = useTranslation();

  const [copied, setCopied] = useState(false);

  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    // TODO: check for auth and if user is subscribed to this event
    // setSubscribed
  }, []);

  const copyButtonClick = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <div className="min-h-screen font-regular relative overflow-hidden px-[26px]">
      <a
        href=""
        className="absolute top-[calc(30px-3.75px)] z-[3] flex md:hidden justify-center items-center pl-[4px] w-12 h-12 bg-black rotate-180 rounded-full"
      >
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.2115 12.9509L9.06494 21.2063C8.54672 21.7317 7.70652 21.7317 7.18856 21.2063C6.67055 20.6814 6.67055 19.83 7.18856 19.3051L14.397 12.0003L7.18876 4.69571C6.67076 4.17054 6.67076 3.31921 7.18876 2.79426C7.70677 2.2691 8.54693 2.2691 9.06515 2.79426L17.2117 11.0498C17.4707 11.3124 17.6 11.6562 17.6 12.0002C17.6 12.3444 17.4704 12.6884 17.2115 12.9509Z"
            fill="white"
          />
        </svg>
      </a>
      <div
        className="absolute left-[-5%] top-[-5%] z-[-1] w-[110%] h-[110%] object-cover"
        style={{
          background: 'url(https://adjarabetarena.com/s3-static/Sheffield-Utd---Liverpool.png)',
          backgroundPosition: 'center',
          filter: 'blur(5px)',
        }}
      >
        <div
          className="overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        ></div>
      </div>
      <div className="relative flex flex-col items-center text-white pt-[30px] md:pt-[86px] z-[2]">
        <img
          src="https://adjarabetarena.com/assets/images/setanta-logo.svg"
          alt="setanta-logo"
          className="w-[120px] md:w-[200px] mx-auto mb-[136px] md:mb-[96px]"
        />

        <h1 className="text-[28px] md:text-[40px] drop-shadow-lg shadow-black/70 font-bold text-center mb-6 md:mb-8">
          Sheffield - Liverpool
        </h1>

        <p className="text-[16px] md:text-[18px] mb-[48px] md:mb-[64px] text-center">23:30 - ოთხშაბათს, 06 დეკემბერი</p>

        <div className="text-center">
          <p className="text-[12px] md:text-[18px]">{t('event_starts_in')}</p>
          <TimerBox date={'2023-12-30 02:45:00'} />
        </div>

        <input id="eventId" type="hidden" value="{{ $event->id }}" />
        <button
          className={cn(
            'text-[16px] mt-10 mx-auto px-[22px] md:px-[32px] flex justify-center items-center py-4 sm:py-0 sm:h-[55px] bg-setanta-yellow rounded-base font-semibold text-black text-center',
            subscribed ? 'bg-white' : 'bg-setanta-yellow'
          )}
          onClick={() => setSubscribed(!subscribed)}
        >
          <svg
            className={cn('mr-1', subscribed ? '' : 'hidden')}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.7417 5.01401L9.78266 16.5022C9.59285 16.7701 9.30981 16.9456 8.99713 16.9893C8.68446 17.0331 8.36839 16.9413 8.11993 16.7347L2.43641 11.9015C1.93488 11.4746 1.85367 10.6961 2.25503 10.1626C2.65638 9.62917 3.38832 9.54279 3.88985 9.96969L8.62922 14.0027L15.8697 3.55093C16.1071 3.17198 16.5211 2.96246 16.9473 3.00557C17.3735 3.04868 17.743 3.33743 17.909 3.75719C18.075 4.17695 18.0107 4.65979 17.7417 5.01401Z"
              fill="black"
              fillOpacity="0.9"
            />
          </svg>
          <p>{subscribed ? 'SMS-ს მატჩის დაწყებამდე 20 წუთით ადრე მიიღებ' : 'შემახსენე მატჩის დაწყება SMS-ით'}</p>
        </button>
        <div className="flex gap-[8px] max-w-[280px] md:w-[390px] p-[8px] items-center justify-center border-[1px] border-solid border-[#202020] bg-black rounded-lg overflow-hidden mt-[12px]">
          <a
            id="copy-input"
            className="w-full text-[11px] text-ellipsis whitespace-nowrap overflow-hidden cursor-default"
          >
            https://adjarabetarena.com/setanta/123
          </a>
          <a
            className={cn(
              'text-[10px] py-[10px] px-[4px] flex justify-center items-center rounded-base font-semibold text-black cursor-pointer',
              copied ? 'bg-white' : 'bg-setanta-yellow'
            )}
            onClick={() => copyButtonClick('https://adjarabetarena.com/setanta/123')}
          >
            {copied ? 'დაკოპირებულია' : 'დააკოპირე'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default SetantasportsMatch;
