import { useTranslation } from 'react-i18next';
import { Button } from '~/components/ui/button';
import Separator from '~/components/ui/separator';
import RegistrationForm from './registrationForm';
import type { ActionFunction } from '@remix-run/node';
import { acceptedTerms } from 'server/db/schema/accepted_terms';
import { db } from 'server/db';
import RegistrationLayout from '~/components/registration-layout';

type NewAcceptedTerms = typeof acceptedTerms.$inferInsert;

const newTerms = (data: NewAcceptedTerms) => {
  return db.insert(acceptedTerms).values(data).returning();
};

export const action: ActionFunction = async ({ request }) => {
  const ip = request.headers.get('X-Client-IP') || '';
  const formData = await request.formData();
  const value = formData.get('value');
  const user_agent = formData.get('user_agent');

  return newTerms({ value: value === 'true', event_type: 'onChange', user_agent: String(user_agent), ip });
};

export default function RegistrationPage() {
  const { t } = useTranslation();

  return (
    <RegistrationLayout className="gap-6 p-4">
      <p className="font-medium text-lg">{t('registration')}</p>
      <Button
        variant="ghost"
        size="lg"
        className="flex w-full items-center bg-blue text-base text-white hover:bg-blue/80 lowercase"
      >
        {t('register_facebook')}
      </Button>
      <Separator />
      <RegistrationForm />
    </RegistrationLayout>
  );
}
