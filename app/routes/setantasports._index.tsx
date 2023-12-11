import { useTranslation } from 'react-i18next';
import SectionWrapper from '~/components/section-wrapper';
import SetantaBox from '~/components/setanta/SetantaBox';
import SetantaHero from '~/components/setanta/SetantaHero';
import SliderWrapper, { Slide } from '~/components/slider-wrapper';

const setantasports = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-black overflow-x-hidden pb-[128px] md:pb-[140px]">
      <div className="relative font-regular mb-24 z-[1]">
        <SetantaHero img="https://adjarabetarena.com/s3-static/Luton---Arsenal.png" title="Test 1" />
      </div>
      <div className="relative z-[2] max-w-[calc(1300px+2rem)] 2xl:max-w-[calc(1744px+2rem)] mx-auto px-4 text-white">
        <SectionWrapper title={t('live')}>
          <SliderWrapper>
            <Slide>
              <SetantaBox date="2023-11-30 02:45:00" clock url="/register" />
            </Slide>
            <Slide>
              <SetantaBox date="2023-11-30 02:45:00" clock url="/register" />
            </Slide>
            <Slide>
              <SetantaBox date="2023-11-30 02:45:00" clock url="/register" />
            </Slide>
            <Slide>
              <SetantaBox date="2023-11-30 02:45:00" clock url="/register" />
            </Slide>
            <Slide>
              <SetantaBox date="2023-11-30 02:45:00" clock url="/register" />
            </Slide>
            <Slide>
              <SetantaBox date="2023-11-30 02:45:00" clock url="/register" />
            </Slide>
            <Slide>
              <SetantaBox date="2023-11-30 02:45:00" clock url="/register" />
            </Slide>
          </SliderWrapper>
        </SectionWrapper>
        <SectionWrapper title={t('upcoming_games')}>
          <SliderWrapper>
            <Slide>
              <SetantaBox date="2023-11-30 02:45:00" clock url="/register" />
            </Slide>
            <Slide>
              <SetantaBox date="2023-11-30 02:45:00" clock url="/register" />
            </Slide>
            <Slide>
              <SetantaBox date="2023-11-30 02:45:00" clock url="/register" />
            </Slide>
            <Slide>
              <SetantaBox date="2023-11-30 02:45:00" clock url="/register" />
            </Slide>
            <Slide>
              <SetantaBox date="2023-11-30 02:45:00" clock url="/register" />
            </Slide>
            <Slide>
              <SetantaBox date="2023-11-30 02:45:00" clock url="/register" />
            </Slide>
          </SliderWrapper>
        </SectionWrapper>
        <SectionWrapper title={t('review')}>
          <SliderWrapper>
            <Slide>
              <SetantaBox date="2023-11-30 02:45:00" clock url="/register" />
            </Slide>
            <Slide>
              <SetantaBox date="2023-11-30 02:45:00" clock url="/register" />
            </Slide>
            <Slide>
              <SetantaBox date="2023-11-30 02:45:00" clock url="/register" />
            </Slide>
            <Slide>
              <SetantaBox date="2023-11-30 02:45:00" clock url="/register" />
            </Slide>
            <Slide>
              <SetantaBox date="2023-11-30 02:45:00" clock url="/register" />
            </Slide>
          </SliderWrapper>
        </SectionWrapper>
        <SectionWrapper title={t('ended')}>
          <SliderWrapper>
            <Slide>
              <SetantaBox date="2023-11-30 02:45:00" clock url="/register" />
            </Slide>
            <Slide>
              <SetantaBox date="2023-11-30 02:45:00" clock url="/register" />
            </Slide>
            <Slide>
              <SetantaBox date="2023-11-30 02:45:00" clock url="/register" />
            </Slide>
            <Slide>
              <SetantaBox date="2023-11-30 02:45:00" clock url="/register" />
            </Slide>
            <Slide>
              <SetantaBox date="2023-11-30 02:45:00" clock url="/register" />
            </Slide>
          </SliderWrapper>
        </SectionWrapper>
      </div>
    </div>
  );
};

export default setantasports;
