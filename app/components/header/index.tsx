import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { ThemeToggle } from '../theme-toggle';
import { Link, useNavigate } from '@remix-run/react';
import LoginDialog from './login-dialog';
import Search from '../icons/Search.svg?react';

export default function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <header className="flex h-[80px] w-full items-center bg-grey-600">
      <Link to={'/'}>
        <img src="/assets/logo-sm.svg" alt="Logo" className="px-4 py-3" />
      </Link>
      <aside className="ml-auto flex gap-4 px-4 py-1">
        <Button variant="ghost" className="p-0">
          <div className="flex flex-col items-center gap-[2px]">
            <Search className="h-6 w-6" />
          </div>
        </Button>
        {true ? (
          <div className="flex gap-3">
            <LoginDialog />
            <Button variant="success" className="px-5" onClick={() => navigate("/register")}>
              <p>{t('რეგისტრაცია')}</p>
            </Button>
          </div>
        ) : (
          <Button variant="ghost" className="p-0">
            <div className="bg-silver-ground-lower flex h-8 w-8 cursor-pointer items-center justify-center rounded-full">
              <p className="font-ABMontProUpperCase">A</p>
            </div>
          </Button>
        )}
        <ThemeToggle />
      </aside>
    </header>
  );
}
