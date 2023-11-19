import { useQuery } from 'react-query';
import { AsyncCommandMenuCompProps } from '../command-menu/menu-items';
import { trpc } from '~/lib/api';
import { useNavigate } from '@remix-run/react';
import { CommandItem } from '~/components/ui/command';

export default function CommandMenuUserSearch({ search }: AsyncCommandMenuCompProps) {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ['admin', 'findUser', search],
    queryFn: () => trpc.admin.findUser.query(search!),
    enabled: !!search,
    retry: false,
  });

  const onSelect = (userId: string) => {
    navigate(`/admin/users/${userId}`);
  }

  return (
    <>
      {data?.map((user) => (
        <CommandItem key={user.id} value={search} onSelect={() => onSelect(user.id)}>
          <span>{user.username} - {user.full_name} - {user.email || user.phone_number}</span>
        </CommandItem>
      ))}
    </>
  );
}
