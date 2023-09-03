import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { ThemeToggle } from "../theme-toggle";
import { Link } from "@remix-run/react";
import LoginDialog from './login-dialog';

export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="flex h-[70px] w-full items-center bg-dark-blue">
      <Link to={"/"}>
        <img src="/assets/logo-sm.svg" alt="Logo" className="px-4 py-3" />
      </Link>
      <aside className="ml-auto flex gap-4 px-4 py-1">
        <Button variant="ghost" className="p-0">
          <div className="flex flex-col items-center gap-[2px]">
            <img
              src="/assets/icons/search.svg"
              alt="Search"
              className="h-6 w-6"
            />
            {t("search")}
          </div>
        </Button>
        <LoginDialog />
        <ThemeToggle />
      </aside>
    </header>
  );
}
