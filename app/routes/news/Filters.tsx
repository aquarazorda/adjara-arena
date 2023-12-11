import { useTranslation } from 'react-i18next';
import Container from '~/components/container';
import SportIcon from '~/components/icons/SportIcon';
import { Button } from '~/components/ui/button';

const Filters = ({
  categories,
}: {
  categories: {
    name: string;
    icon: string;
  }[];
}) => {
  const { t } = useTranslation();

  return (
    <Container className="px-0">
      <div className="px-0 lg:px-4">
        <div className="bg-grey-600 mb-5">
          <div className="flex items-center py-2 px-4 gap-8 border-b-[1px] border-solid border-grey-400">
            {categories.map((category) => (
              // !! todo : aria-selected attribute when active button
              <Button
                aria-selected={category.name === 'sport'}
                variant="secondary"
                className="text-grey-100 font-regular_uppercase gap-[10px]"
              >
                <SportIcon name={category.icon} />
                {t(category.name)}
              </Button>
            ))}
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
  );
};

export default Filters;
