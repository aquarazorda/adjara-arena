import { useTranslation } from 'react-i18next';
import { Button } from '~/components/ui/button';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import LoginForm from './loginForm';
import Separator from '~/components/ui/separator';

export default function LoginDialogContent() {
  const { t } = useTranslation();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          <span className="font-medium text-2xl uppercase">{t('login')}</span>
        </DialogTitle>
        <DialogDescription asChild>
          <div className="flex flex-col gap-5 pt-5">
            <Button
              variant="ghost"
              className="flex h-[52px] w-full items-center bg-blue text-base text-white hover:bg-blue/80"
            >
              {t('login_facebook')}
            </Button>
            <Separator />
            <LoginForm />
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
