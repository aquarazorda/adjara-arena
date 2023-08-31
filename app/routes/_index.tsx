import type { V2_MetaFunction } from "@remix-run/node";
import { loader$ } from './api/root';
import Header from '~/components/header';
import { getLoaderLangs } from 'server/utils/request';

export const meta: V2_MetaFunction = ({ data: { langs } }) => {
  return [
    { title: langs.title },
  ];
};

export const loader = loader$(async (caller, request) => {
  const langs = await getLoaderLangs(request, ['title']);
  const data = await caller.user.get();
  
  return { data, langs };
})

export default function Index() {
   return (
    <div className="flex gap-1">
      <Header/>
    </div>
  );
}
