import { useTranslation } from 'react-i18next';
import { Button } from '~/components/ui/button';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import LoginForm from './login-form';

export default function LoginDialogContent() {
  const { t } = useTranslation();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          <span className="font-medium text-2xl uppercase">{t('login')}</span>
        </DialogTitle>
        <DialogDescription asChild>
          <div className="pt-5 flex flex-col gap-5">
            <Button
              variant="ghost"
              className="flex h-[52px] w-full items-center bg-blue text-base text-white hover:bg-blue/80"
            >
              {t('login_facebook')}
            </Button>
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-silver-lower dark:text-silver-ground-lower" />
              <span className="text-base text-silver-ground dark:text-silver">{t('or')}</span>
              <div className="h-px flex-1 bg-silver-lower dark:text-silver-ground-lower" />
            </div>
            <LoginForm />
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
