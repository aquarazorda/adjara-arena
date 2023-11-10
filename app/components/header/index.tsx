import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { ThemeToggle } from '../theme-toggle';
import { Link } from '@remix-run/react';
import LoginDialog from './login-dialog';
import Search from '../icons/Search';

export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="flex h-[80px] w-full items-center bg-dark-grey">
      <Link to={'/'}>
        <img src="/assets/logo-sm.svg" alt="Logo" className="px-4 py-3" />
      </Link>
      <aside className="ml-auto flex gap-4 px-4 py-1">
        <Button variant="ghost" className="p-0">
          <div className="flex flex-col items-center gap-[2px]">
            <Search className="w-6 h-6" />
          </div>
        </Button>
        {true ? (
          <div className="flex gap-3">
            <LoginDialog />
            <Button variant="success" className="px-5">
              <p>{t('რეგისტრაცია')}</p>
            </Button>
          </div>
        ) : (
          <Button variant="ghost" className="p-0">
            <div className="w-8 h-8 bg-silver-ground-lower rounded-full flex items-center justify-center cursor-pointer">
              <p className="font-ABMontProUpperCase">A</p>
            </div>
          </Button>
        )}
        <ThemeToggle />
      </aside>
    </header>
  );
}
