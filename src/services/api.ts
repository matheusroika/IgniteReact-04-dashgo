import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { signOut } from '../contexts/AuthContext'

let isRefreshing = false
let failedRequestsQueue = []

export const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})

export function setupAuthClient(ctx = undefined) {
  let cookies = parseCookies(ctx)

  const authApi = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['dashgo.token']}`
    }
  })
  
  authApi.interceptors.response.use(success => success, (error: AxiosError) => {
    if (error.response.status === 401) {
      if (error.response.data?.code === 'token.expired') {
        cookies = parseCookies(ctx)
        const { 'dashgo.refreshToken': refreshToken } = cookies
  
        const originalConfig = error.config
  
        if (!isRefreshing) {
          isRefreshing = true
  
          authApi.post('/refresh', {refreshToken})
            .then(({ data }) => {
              const { token, refreshToken: newRefreshToken } = data
  
              setCookie(ctx, 'dashgo.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
              })
              setCookie(ctx, 'dashgo.refreshToken', newRefreshToken, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
              })
  
              api.defaults.headers['Authorization'] = `Bearer ${token}`
  
              failedRequestsQueue.forEach(request => request.onSuccess(token))
              failedRequestsQueue = []
            })
            .catch(err => {
              failedRequestsQueue.forEach(request => request.onFailure(err))
              failedRequestsQueue = []
              
              signOut()
            })
            .finally(() => {
              isRefreshing = false
            })
        }
  
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers['Authorization'] = `Bearer ${token}`
  
              resolve(api(originalConfig))
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            }
          })
        })  
      } else {
        signOut()
      }
    }
  
    return Promise.reject(error)
  })

  return authApi
}

export const authApi = setupAuthClient()