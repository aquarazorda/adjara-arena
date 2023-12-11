import Container from '~/components/container';
import NewsBox from './NewsBox';
import { Button } from '~/components/ui/button';
import ArrowDown from '~/components/icons/arrow-down.svg';
import NewsFeed from './NewsFeed';
import { useTranslation } from 'react-i18next';

const newsArray = [
  ...Array(18).fill({
    title: 'საქართველოს ოვნული ლიგა',
    description: `ჩემპიონთა ლიგის 1/8 ფინალურ ეტაპზე მიუნხენის ბაიერნი ზალცბურგს დაუპირისპირდა და ორი მატჩის ჯამში ავსტრიულ გუნდს 8:2 მოუგო
    ავსტრიაში გამართული შეხვედრა ფრედ, 1:1 დასრულდა რაც ყველასთვის მოულოდნელი იყო და ბუნდესლიგაში ბაიერნის ბოლო დროინდელმა ფორმიდან ამოვარდნამ გულშემატკივრების ნაწილს იმედი გაუჩინა, რომ რეკორდმაისტერი შეიძლებოდა ტურნირს 1/8 ფინალიდან გამოთიშვოდა, მაგრამ ეს იმედები რობერტ ლევანდოვსკიმ 11 წუთში შესრულებული ჰეთ-თრიკით მაშინვე გააქრო ბავარიელებმა მეტოქე 7:1 დაამარცხეს და ორი მატჩის ჯამში გამანადგურებელი ანგარიში, 8:2 დააფიქსირეს`,
    img: 'https://adjarabetarena.com/s3-static/kimmichbarca.jpg',
    tags: ['ფეხბურთი', 'კალათბურთი'],
  }),
];

const NewsPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Container className="pt-5 md:pt-10">
        <h1 className="font-regular_uppercase text-[22px] mb-4 md:mb-6">{t('sport_news')}</h1>
      </Container>

      <Container className="px-0">
        <div className="px-0 md:px-4">
          <div className="bg-grey-600 mb-5">
            <div className="flex items-center py-2 px-4 gap-8 border-b-[1px] border-solid border-grey-400">
              <Button aria-selected variant="secondary" className="text-white font-regular_uppercase">
                სპორტი
              </Button>
              <Button variant="secondary" className="text-white font-regular_uppercase">
                სპორტი
              </Button>
            </div>
            <div className="flex items-center py-4 px-4 gap-3">
              <Button aria-selected variant="ghost_secondary">
                ყველა
              </Button>
              <Button variant="ghost_secondary">ქართული</Button>
            </div>
          </div>
        </div>
      </Container>

      <Container className="pb-5 md:pb-10">
        <NewsFeed newsArray={newsArray} />
        <div className="flex justify-center pt-5">
          <Button className="bg-grey-500 border-grey-500 flex gap-1 font-regular_uppercase">
            მაჩვენე მეტი
            <img src={ArrowDown} />
          </Button>
        </div>
      </Container>
    </>
  );
};

export default NewsPage;
