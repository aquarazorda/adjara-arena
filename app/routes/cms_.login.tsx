import { action$ } from "./api/root";
import { authSchema } from "server/routes/user";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { redirect } from '@remix-run/node';

export const action = action$(authSchema, async (formData, caller) => {
  try {
    const res = await caller.user.authenticate(formData);
    
    return res ? redirect('/cms', {
      headers: {
        "Set-Cookie": "auth=1; Path=/; HttpOnly; SameSite=Strict"
      }
    }) : false;
  } catch (e) {
    return false;
  }
});

export default function CMSLoginPage() {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <form
        action="/cms/login"
        method="post"
        className="flex max-w-lg flex-col gap-6"
      >
        <Input name="username" type="text" placeholder='Username' />
        <Input name="password" type="password" placeholder='Password' />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
