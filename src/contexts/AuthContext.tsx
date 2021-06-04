import { useRouter }from "next/router";
import { createContext, ReactNode, useState } from "react";
import { authApi } from "../services/api";

export interface User {
  email: string;
  permissions: string[];
  roles: string[];
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
  user: User;
}

export const AuthContext = createContext({} as AuthContextData)

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthProviderProps) {
  const router = useRouter()
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const { data } = await authApi.post('sessions', {
        email,
        password
      })

      const { permissions, roles } = data

      setUser({
        email,
        permissions,
        roles,
      })
  
      router.push('/dashboard')
    } catch (e) {
      console.log(e)
    } 
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}