import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { destroyCookie, parseCookies } from "nookies"
import decode from 'jwt-decode'

import { AuthTokenError } from "../services/errors/AuthTokenError"
import { ValidateUserPermissionsAndRoles } from "./validateUserPermissionsAndRoles"
import { User } from "../contexts/AuthContext"

interface WithSSRAuthOptions {
  permissions?: string[];
  roles?: string[];
}

export function withSSRAuth<P>(fn: GetServerSideProps<P>, options?: WithSSRAuthOptions) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)
    const token = cookies['dashgo.token']

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }

    if (options) {
      const user = decode<{ permissions: string[], roles: string[] }>(token)
      const { permissions, roles } = options
      
      const userHasValidPermissionsAndRoles = ValidateUserPermissionsAndRoles({
        user,
        permissions,
        roles,
      })

      if (!userHasValidPermissionsAndRoles) {
        return {
          redirect: {
            destination: '/dashboard',
            permanent: false,
          }
        }
      }
    }
    
    try {
      return await fn(ctx) 
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, 'dashgo.token')
        destroyCookie(ctx, 'dashgo.refreshToken')

        return {
          redirect: {
            destination: '/',
            permanent: false,
          }
        }
      }
    }   
  }
}