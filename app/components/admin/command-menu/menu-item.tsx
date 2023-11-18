import { useCommandState } from 'cmdk';
import { CommandItem } from '~/components/ui/command';
import menuItems, { MenuItem } from './menu-items';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@remix-run/react';

const SubItem = (props: Parameters<typeof CommandItem>[0]) => {
  const search = useCommandState((state) => state.search);
  if (!search) return null;
  return <CommandItem {...props} />;
};

export const RenderItem = ({
  item,
  rootItem,
  setPages,
  setOpen,
}: {
  item: MenuItem;
  rootItem?: boolean;
  setPages: Dispatch<SetStateAction<MenuItem[][]>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const Component = rootItem ? CommandItem : SubItem;

  const onSelect = () => {
    if (!item.route) {
      setPages((pages) => [...pages, [item]]);
      return;
    }

    if (item.route) {
      navigate(item.route);
      setPages([menuItems]);
      setOpen(false);
    }
  };

  return (
    <>
      <Component onSelect={onSelect} key={item.title} value={t(item.title)}>
        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
        <span>{t(item.title)}</span>
      </Component>
      {item?.items?.map((it) => (
        <RenderItem key={it.title + '-sub'} item={it} setPages={setPages} setOpen={setOpen} />
      ))}
    </>
  );
};
