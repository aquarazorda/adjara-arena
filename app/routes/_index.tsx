import { type MetaFunction } from '@remix-run/react';
import Container from '~/components/container';
import SetantaBox from '~/components/setanta/SetantaBox';
import { mainPageLoader } from '~/lib/loaders/mainPage';
import SetantaLogoSilver from '~/components/icons/setantalogo-silver.svg';

export const meta: MetaFunction = ({ data: { langs } }: any) => {
  return [{ title: langs.title }];
};

export const loader = mainPageLoader;

export default function Index() {
  return (
    <Container className="text-[#FFFFFFCC]">
      <div>
        <a
          href="{!! route('key', ['key' => 'setantasports']) !!}"
          className="text-[15px] md:text-[22px] font-regular_uppercase font-normal mb-[12px] flex gap-[12px] items-center"
        >
          <img className="w-[174px] md:w-[200px]" src={SetantaLogoSilver} alt="setanta" />
          <p className="mt-[3px] leading-[22px] text-">უყურე უფასოდ</p>
        </a>
        <div>
          <SetantaBox date="2023-11-30 02:45:00" clock url="/register" />
        </div>
      </div>
    </Container>
  );
}
