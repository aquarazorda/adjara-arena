import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import LoginForm from './login-form';

export default function LoginDialogContent() {
  const { t } = useTranslation();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          <span className="font-medium text-2xl uppercase">{t("login")}</span>
        </DialogTitle>
        <DialogDescription asChild>
          <div className="mt-6 flex flex-col gap-6">
            <Button
              variant="ghost"
              className="flex h-[52px] w-full items-center bg-blue text-base text-white hover:bg-blue/80"
            >
              {t("login_facebook")}
            </Button>
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-silver-lower" />
              <span className="text-base text-black-lower">{t("or")}</span>
              <div className="h-px flex-1 bg-silver-lower" />
            </div>
            <LoginForm />
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
