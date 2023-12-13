import { useTranslation } from 'react-i18next';
import Container from '~/components/container';
import SportIcon from '~/components/icons/SportIcon';
import { Button } from '~/components/ui/button';

import ArrowDown from '~/components/icons/arrow-down.svg';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Close, DialogClose } from '@radix-ui/react-dialog';
import X from '~/components/icons/X';

const subCategories = [
  { name: 'all' },
  { name: 'football' },
  { name: 'basketball' },
  { name: 'tennis' },
  { name: 'ufc' },
  { name: 'rugby' },
  { name: 'other' },
];

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
          <div className="flex items-center py-2 px-4 gap-8 border-b-[1px] border-solid border-grey-400 overflow-x-scroll">
            {categories.map((category, index) => (
              // !! todo : aria-selected attribute when active button
              <Button
                key={index}
                aria-selected={index === 0}
                variant="secondary"
                className="min-w-fit flex flex-col max-md:h-auto md:flex-row gap-1 md:gap-[10px] max-md:px-2 max-md:py-1 md:p-2"
              >
                <SportIcon name={category.icon} />
                <p className="text-grey-100 font-regular_uppercase text-xs md:text-sm">{t(category.name)}</p>
              </Button>
            ))}
          </div>
          <div className="flex items-center py-3 md:py-4 px-4 gap-3 relative overflow-hidden md:overflow-x-scroll">
            {
              // !! todo : aria-selected attribute when active button
              subCategories.map((subCategory, index) => (
                <SubCategoryButton key={index} index={index} name={t(subCategory.name)} />
              ))
            }
            <div
              className="md:hidden absolute right-0 h-full w-28 flex items-center justify-end pr-4"
              style={{
                background: 'linear-gradient(270deg, #161C21 0%, #161C21 57.37%, rgba(22, 28, 33, 0.00) 100%)',
              }}
            >
              <MoreFiltersDialog />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

const MoreFiltersDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { t } = useTranslation();

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>
        <Button variant="default" className="w-8 h-8 !rounded-base p-0 bg-grey-400 border-none hover:bg-grey-300">
          <img src={ArrowDown} alt="More" />
        </Button>
      </DialogTrigger>
      <DialogContent className="mx-0 top-full -translate-y-full rounded-b-none">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>{t('categories')}</DialogTitle>
          <Close onClick={() => setDialogOpen(false)}>
            <X className="w-5 h-5 !mt-0 fill-white cursor-pointer" />
          </Close>
        </DialogHeader>
        <div className="min-h-[300px]">
          <div className="flex gap-2 flex-wrap">
            {
              // !! todo : aria-selected attribute when active button
              subCategories.map((subCategory, index) => (
                <SubCategoryButton key={index} index={index} name={t(subCategory.name)} />
              ))
            }
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const SubCategoryButton = ({ index, name }: { index: number; name: string }) => {
  return (
    <Button aria-selected={index === 0} variant="ghost_secondary" className="max-md:h-8 px-3 py-[7px]">
      <p className="text-xs">{name}</p>
    </Button>
  );
};

export default Filters;
