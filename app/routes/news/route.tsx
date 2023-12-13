import Container from '~/components/container';
import { Button } from '~/components/ui/button';
import ArrowDown from '~/components/icons/arrow-down.svg';
import NewsFeedGrid from './NewsFeedGrid';
import { useTranslation } from 'react-i18next';
import Filters from './Filters';

const newsArray = [
  ...Array(44).fill({
    title: 'საქართველოს ოვნული ლიგა',
    description: `ჩემპიონთა ლიგის 1/8 ფინალურ ეტაპზე მიუნხენის ბაიერნი ზალცბურგს დაუპირისპირდა და ორი მატჩის ჯამში ავსტრიულ გუნდს 8:2 მოუგო
    ავსტრიაში გამართული შეხვედრა ფრედ, 1:1 დასრულდა რაც ყველასთვის მოულოდნელი იყო და ბუნდესლიგაში ბაიერნის ბოლო დროინდელმა ფორმიდან ამოვარდნამ გულშემატკივრების ნაწილს იმედი გაუჩინა, რომ რეკორდმაისტერი შეიძლებოდა ტურნირს 1/8 ფინალიდან გამოთიშვოდა, მაგრამ ეს იმედები რობერტ ლევანდოვსკიმ 11 წუთში შესრულებული ჰეთ-თრიკით მაშინვე გააქრო ბავარიელებმა მეტოქე 7:1 დაამარცხეს და ორი მატჩის ჯამში გამანადგურებელი ანგარიში, 8:2 დააფიქსირეს`,
    img: 'https://adjarabetarena.com/s3-static/kimmichbarca.jpg',
    tags: ['football'],
  }),
];

const mainCategories = [
  { name: 'sport', icon: 'sport' },
  { name: 'football', icon: 'football' },
  { name: 'basketball', icon: 'basketball' },
  { name: 'tennis', icon: 'tennis' },
  { name: 'ufc', icon: 'ufc' },
  { name: 'rugby', icon: 'rugby' },
  { name: 'other', icon: 'other' },
];

const NewsPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Container className="pt-5 md:pt-10">
        <h1 className="font-regular_uppercase text-sm md:text-[22px] mb-4 md:mb-6">{t('sport_news')}</h1>
      </Container>

      <Filters categories={mainCategories} />

      <Container className="pb-5 md:pb-10">
        <NewsFeedGrid newsArray={newsArray} />
        <div className="flex justify-center pt-5">
          <Button className="bg-grey-500 border-grey-500 flex gap-1 font-regular_uppercase">
            {t('show_more')}
            <img src={ArrowDown} />
          </Button>
        </div>
      </Container>
    </>
  );
};

export default NewsPage;
