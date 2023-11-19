import type { User } from 'lucia';
import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

const UserContext = createContext<[User | undefined, Dispatch<SetStateAction<User | undefined>>]>([
  undefined,
  () => {},
]);

export const UserProvider = ({ children, user }: { children: React.ReactNode; user: User }) => {
  const userState = useState<User | undefined>(user);

  return <UserContext.Provider value={userState}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
