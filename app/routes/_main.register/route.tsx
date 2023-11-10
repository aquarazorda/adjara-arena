import { useTranslation } from 'react-i18next';
import { Button } from '~/components/ui/button';
import Separator from '~/components/ui/separator';
import RegistrationForm from './registrationForm';
import type { ActionFunction } from '@remix-run/node';
import { acceptedTerms } from 'server/db/schema/accepted_terms';
import { db } from 'server/db'

type NewAcceptedTerms = typeof acceptedTerms.$inferInsert;

const newTerms = (data: NewAcceptedTerms) => {
  return db.insert(acceptedTerms).values(data).returning();
}

export const action: ActionFunction = async ({ request }) => {
  const ip = request.headers.get('X-Client-IP') || '';
  const formData = await request.formData();
  const value = formData.get('value')
  const user_agent = formData.get('user_agent')

  return newTerms({ value: value === 'true', event_type: 'onChange', user_agent: String(user_agent), ip })
}

export default function RegistrationPage() {
  const { t } = useTranslation();

  return (
    <div className="dark:bg-dark-grey bg-white flex min-h-[calc(100vh-70px)] md:min-h-[calc(100vh-80px)] dark:text-white text-grey">
      <div className="flex-1 hidden md:block">
        <img className="w-full h-full object-cover" src="" alt="adjarabetarena" />
      </div>
      <div className="flex-1 flex justify-center items-center py-[16px]">
        <div className="flex flex-col md:max-w-[460px] w-full gap-6 p-4">
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
        </div>
      </div>
    </div>
  );
}
