import { Suspense, createContext, useEffect, useState } from 'react';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandList } from '../../ui/command';
import { useTranslation } from 'react-i18next';
import menuItems, { MenuItem } from './menu-items';
import { RenderItem } from './menu-item';
import { useDebounce } from 'use-debounce';

const CommandMenuContext = createContext<MenuItem[][]>([menuItems]);

export default function CommandMenu() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [pages, setPages] = useState<MenuItem[][]>([menuItems]);
  const page = pages[pages.length - 1];

  const [debouncedSearch] = useDebounce(search, 400);

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
    <CommandMenuContext.Provider value={pages}>
      <div
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === 'Escape' || (e.key === 'Backspace' && !search)) {
            e.preventDefault();

            if (search) {
              setSearch('');
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
          <Suspense>
            <CommandList>
              {page?.map(({ title, items, component: Component }, idx) => (
                <CommandGroup key={title} heading={t(title)} isLast={idx > page.length - 1 || !items?.length}>
                  {!Component &&
                    items?.map((item) => (
                      <RenderItem key={item.title} item={item} setPages={setPages} setOpen={setOpen} rootItem />
                    ))}
                  {Component && <Component search={debouncedSearch} />}
                </CommandGroup>
              ))}
            </CommandList>
          </Suspense>
          <CommandEmpty>{t('result_not_found')}</CommandEmpty>
        </CommandDialog>
      </div>
    </CommandMenuContext.Provider>
  );
}
