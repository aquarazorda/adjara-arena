import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../ui/command';
import { useTranslation } from 'react-i18next';
import { HelpCircle, LucideIcon, Newspaper, ScrollText, Tv, Tv2, UserCircle } from 'lucide-react';
import { useNavigate } from '@remix-run/react';
import { useCommandState } from 'cmdk';

type MenuItem = {
  icon?: LucideIcon;
  title: string;
  route?: string;
  items?: MenuItem[];
};

const menuItems = [
  {
    title: 'suggestions',
    items: [
      {
        icon: Newspaper,
        title: 'add_news',
        items: [
          { icon: Newspaper, title: 'add_article' },
          { icon: Tv2, title: 'add_video' },
        ],
      },
      { icon: HelpCircle, title: 'add_new_quiz' },
      { icon: Tv, title: 'add_setanta_stream' },
    ],
  },
  {
    title: 'users',
    items: [
      { icon: UserCircle, title: 'user_search' },
      { icon: ScrollText, title: 'user_logs' },
    ],
  },
] satisfies MenuItem[];

const SubItem = (props: Parameters<typeof CommandItem>[0]) => {
  const search = useCommandState((state) => state.search);
  if (!search) return null;
  return <CommandItem {...props} />;
};

const RenderItem = ({
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
      <Component onSelect={onSelect}>
        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
        <span>{t(item.title)}</span>
      </Component>
      {item?.items?.map((it) => (
        <RenderItem key={it.title + '-sub'} item={it} setPages={setPages} setOpen={setOpen} />
      ))}
    </>
  );
};

export default function CommandMenu() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [pages, setPages] = useState<MenuItem[][]>([menuItems]);
  const page = pages[pages.length - 1];

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    if (!open) {
      setSearch('');
      setPages([menuItems]);
    }
  }, [open]);

  return (
    <div
      onBlur={() => setOpen(false)}
      onKeyDown={(e) => {
        // Escape goes to previous page
        // Backspace goes to previous page when search is empty
        if (e.key === 'Escape' || (e.key === 'Backspace' && !search)) {
          e.preventDefault();

          if (search) {
            setSearch('');
            return;
          }

          if (pages.length === 1) {
            setOpen(false);
            return;
          }

          setPages((pages) => pages.slice(0, -1));
        }
      }}
    >
      <CommandDialog open={open}>
        <CommandInput placeholder={t('type_search')} value={search} onValueChange={setSearch} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {page?.map(({ title, items }, idx) => (
            <CommandGroup heading={t(title)} key={title} isLast={idx > page.length - 1}>
              {items?.map((item) => (
                <RenderItem key={item.title} item={item} setPages={setPages} setOpen={setOpen} rootItem />
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </div>
  );
}
