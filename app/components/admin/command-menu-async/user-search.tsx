import { useQuery } from 'react-query';
import { AsyncCommandMenuCompProps } from '../command-menu/menu-items';
import { trpc } from '~/lib/api';
import { RenderItem } from '../command-menu/menu-item';
import { CommandItem } from 'cmdk';

export default function CommandMenuUserSearch({ search }: AsyncCommandMenuCompProps )  {
  const { data } = useQuery({
    queryFn: () => trpc.admin.findUser.query(search!),
    queryKey: ['admin.findUser', search],
    enabled: !!search,
    retry: false
  });

  return data?.map((user) => <CommandItem key={user.id}>
    {user.full_name} - {user.email} - {user.phone_number}
  </CommandItem>)
}