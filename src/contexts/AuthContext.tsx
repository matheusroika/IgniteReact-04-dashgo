import { createContext, ReactNode, useEffect, useState } from "react";
import { parseCookies, setCookie } from 'nookies'
import { useRouter }from "next/router";
import { api, authApi } from "../services/api";

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

  useEffect(() => {
    const { 'dashgo.token': token } = parseCookies()

    if (token) {
      authApi.get('/me').then(({ data }) => {
        const { email, permissions, roles } = data

        setUser({ email, permissions, roles })
      }) 
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const { data } = await authApi.post('sessions', {
        email,
        password
      })

      const { token, refreshToken, permissions, roles } = data

      setCookie(undefined, 'dashgo.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })
      setCookie(undefined, 'dashgo.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })

      setUser({
        email,
        permissions,
        roles,
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`
  
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