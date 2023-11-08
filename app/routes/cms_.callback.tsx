import type { ActionFunction } from '@remix-run/node';
import { sp, getIdp } from 'server/saml.server';
import { redirect } from '@remix-run/node';
import { createUser, getUserByEmail } from 'server/services/cms_user.service';
import { createUserSession } from 'server/services/session.service';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  if (request.method == 'POST') {
    const body = Object.fromEntries(formData);
    const idp = await getIdp();
    const { extract } = await sp.parseLoginResponse(idp, 'post', {
      body: body,
    });

    if (extract.nameID) {
      const email = extract.nameID;

      const expiration = extract.conditions?.notOnOrAfter;

      let user: any = await getUserByEmail(email);

      if (!user)
        user = await createUser({
          email,
          full_name: extract.attributes.first_name + ' ' + extract.attributes.last_name,
        });

      return createUserSession({
        request: request,
        userId: user.id,
        expiration: expiration,
        redirectTo: '/cms',
      });
    }

    return redirect('/cms/login');
  } else {
    return redirect('/');
  }
};
