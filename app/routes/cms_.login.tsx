import { useLoaderData } from "@remix-run/react";
import { serverEnv } from "server/env";
import { Button } from "~/components/ui/button";

export async function loader() {
  return serverEnv.SAML_LOGIN_URL;
}

export default function CMSLoginPage() {
  const loginUrl = useLoaderData<typeof loader>()

  const redirectToOkta = () => {
    window.location.href = loginUrl;
  }

  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <Button onClick={redirectToOkta} type="submit">
        <svg width="24px" height="24px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"><path fill="#007DC1" d="M8 1C4.143 1 1 4.12 1 8s3.121 7 7 7 7-3.121 7-7-3.143-7-7-7zm0 10.5c-1.94 0-3.5-1.56-3.5-3.5S6.06 4.5 8 4.5s3.5 1.56 3.5 3.5-1.56 3.5-3.5 3.5z"/></svg>
        <span className="ml-2">Login with Okta</span>
      </Button>
    </div>
  );
}
