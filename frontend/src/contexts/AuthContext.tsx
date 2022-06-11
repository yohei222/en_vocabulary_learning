import { getCurrentUser } from "lib/api/auth";
import { createContext, useCallback, useState } from 'react';
import { User } from 'type';

type ContextType = {
  isLoading: boolean,
  setIsLoading: (isLoading: boolean) => void;
  isSignedIn: boolean
  setIsSignedIn: (isSignedIn: boolean) => void;
  currentUser: User | undefined
  setCurrentUser: (currentUser: User | undefined) => void;
}

const defaultContext: ContextType = {
  isLoading: false,
  setIsLoading: () => null,
  isSignedIn: false,
  setIsSignedIn: () => null,
  currentUser: undefined,
  setCurrentUser: () => null,
};

export const AuthContext = createContext<ContextType>(defaultContext);

export const useAuthContext = (): ContextType => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  return {
    isLoading,
    setIsLoading,
    isSignedIn,
    setIsSignedIn,
    currentUser,
    setCurrentUser,
  };
}
