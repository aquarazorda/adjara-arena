import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../../ui/button';
import { useTranslation } from 'react-i18next';
import LoginDialogContent from './content';

export default function LoginDialog() {
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="px-5">
          <p>{t('შესვლა')}</p>
        </Button>
      </DialogTrigger>
      <LoginDialogContent />
    </Dialog>
  );
}
