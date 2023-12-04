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
          href="/setantasports"
          className="inline-flex text-[15px] md:text-[22px] font-regular_uppercase font-normal mb-[12px] gap-[12px] items-center"
        >
          <img className="w-[174px] md:w-[200px]" src={SetantaLogoSilver} alt="setanta" />
          <p className="mt-[3px] leading-[22px] text-">უყურე უფასოდ</p>
        </a>
        <div className="flex">
          <SetantaBox
            // date="2023-11-04 02:00:00"
            live
            url="/register"
            img="https://adjarabetarena.com/s3-static/Luton---Arsenal.png"
          />
          <SetantaBox
            date={
              new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate(),
                new Date().getHours() + 1,
                0,
                0
              )
            }
            url="/register"
            img="https://adjarabetarena.com/s3-static/Luton---Arsenal.png"
          />
          <SetantaBox
            date={
              new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate() + 1,
                new Date().getHours(),
                0,
                0
              )
            }
            url="/register"
            img="https://adjarabetarena.com/s3-static/Luton---Arsenal.png"
          />
          <SetantaBox
            date={
              new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate() + 2,
                new Date().getHours(),
                0,
                0
              )
            }
            url="/register"
            img="https://adjarabetarena.com/s3-static/Luton---Arsenal.png"
          />
          <SetantaBox
            date="Mon Dec 04 2024 03:10:00 GMT+0400 (Georgia Standard Time)"
            url="/register"
            img="https://adjarabetarena.com/s3-static/Luton---Arsenal.png"
          />
          <SetantaBox ended url="/register" img="https://adjarabetarena.com/s3-static/Luton---Arsenal.png" />
        </div>
      </div>
    </Container>
  );
}
