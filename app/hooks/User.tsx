import type { User } from 'lucia';
import { createContext, useContext } from 'react';

const UserContext = createContext<User | undefined>(undefined);

export const UserProvider = ({ children, user }: { children: React.ReactNode; user: User }) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);