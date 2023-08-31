import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { ThemeToggle } from "../theme-toggle";
import { Link } from "@remix-run/react";
import LoginDialog from './login-dialog';

export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="bg-primary text-primary-foreground flex items-center h-[70px] w-full">
      <Link to={"/"}>
        <img src="/assets/logo-sm.svg" alt="Logo" className="px-4 py-3" />
      </Link>
      <aside className="flex px-4 py-1 ml-auto gap-4">
        <Button variant="ghost" className="p-0">
          <div className="flex flex-col gap-[2px] items-center">
            <img
              src="/assets/icons/search.svg"
              alt="Search"
              className="w-6 h-6"
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
