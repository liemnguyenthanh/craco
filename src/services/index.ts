/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMyAccount } from '@/utils/helpers'
import axios from 'axios'
import { URL } from '../constants/api'

export type Method = 'get' | 'post'

export interface BodyRequest {
   method: Method
   url?: string
   data?: any,
   headers: any
}

const userInfo = getMyAccount()

export const axiosRequest = (urlPath?: string, data?: any) => {

   const config: any = {}
   if (userInfo?.access_token) {
      config.headers = { Authorization: `Bearer ${userInfo.access_token}` }
   }

   const body: BodyRequest = {
      method: 'get',
      url: URL + '/api',
      ...config
   }

   if (urlPath) body.url += urlPath

   if (data) {
      body.method = 'post'
      body.data = data
   }

   return axios(body)
      .then((res) => {
         return res.data
      })
      .catch((err) => {
         if (err.response) {
            /* 
              The request was made and the server responded with a status code
              that falls out of the range of 2xx
            */
            throw err.response.data
         } else if (err.request) {
            // Client never received a response, or request never left
            throw err.request
         }
      })
}
