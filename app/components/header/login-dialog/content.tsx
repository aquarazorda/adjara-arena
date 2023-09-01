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
    <DialogContent className="fill-foreground">
      <DialogHeader>
        <DialogTitle>
          <span className="text-2xl uppercase">{t("login")}</span>
        </DialogTitle>
        <DialogDescription asChild>
          <div className="mt-6 flex flex-col gap-6">
            <Button
              variant="ghost"
              className="flex h-[52px] w-full items-center rounded-sm bg-brand-fb text-base text-foreground hover:bg-brand-fb/80"
            >
              {t("login_facebook")}
            </Button>
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-border" />
              <span className="text-base text-border-hover">{t("or")}</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <LoginForm />
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
