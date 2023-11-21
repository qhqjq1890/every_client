import React from 'react';
import {createContext, useState} from 'react';

type userIdContextType = {
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
};

const UserIdContext = createContext<userIdContextType>({
  userId: '',
  setUserId: () => {},
});

export function UserIdContextProvider({children}: React.PropsWithChildren) {
  const [userId, setUserId] = useState<string | null>(null);
  return (
    <UserIdContext.Provider value={{userId, setUserId}}>
      {children}
    </UserIdContext.Provider>
  );
}

export default UserIdContext;
