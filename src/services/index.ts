/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { URL } from '../constants/api'

export type Method = 'get' | 'post'

export interface BodyRequest {
  method: Method
  url?: string
  data?: any
}

export const axiosRequest = (urlPath?: string, data?: any) => {

  const body: BodyRequest = {
    method: 'get',
    url: URL + '/api'
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
