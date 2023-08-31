import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import { useTranslation } from "react-i18next";
import { lazy } from 'react';

const Content = lazy(() => import('./content'));

export default function LoginDialog() {
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-0">
          <div className="flex flex-col gap-[2px] items-center">
            <img
              src="/assets/icons/profile.svg"
              alt="Profile"
              className="w-6 h-6"
            />
            {t("login")}
          </div>
        </Button>
      </DialogTrigger>
      <Content />
    </Dialog>
  );
}
