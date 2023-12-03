import { useTranslation } from 'react-i18next';
import SectionWrapper from '~/components/section-wrapper';
import SetantaBox from '~/components/setanta/SetantaBox';
import SetantaHero from '~/components/setanta/SetantaHero';

const setantasports = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-black overflow-x-hidden pb-[128px] md:pb-[140px]">
      <SectionWrapper className="relative font-ABMontPro mb-24 z-[1]">
        <SetantaHero img="https://adjarabetarena.com/s3-static/Luton---Arsenal.png" title="Test 1" />
      </SectionWrapper>
      <div className="relative z-[2] max-w-[calc(1300px+2rem)] 2xl:max-w-[calc(1744px+2rem)] mx-auto px-4 text-white">
        <SectionWrapper title={t('live')}>
          <SetantaBox date="2023-11-30 02:45:00" clock url="/register" />
        </SectionWrapper>
        <SectionWrapper title={t('upcoming_games')}>
          <SetantaBox date="2023-11-30 02:45:00" clock url="/register" />
        </SectionWrapper>
        <SectionWrapper title={t('review')}>
          <SetantaBox date="2023-11-30 02:45:00" clock url="/register" />
        </SectionWrapper>
        <SectionWrapper title={t('ended')}>
          <SetantaBox date="2023-11-30 02:45:00" clock url="/register" />
        </SectionWrapper>
      </div>
    </div>
  );
};

export default setantasports;
