'use strict'

import store from '../store'
import axiosRaw from 'axios'

export const axios = axiosRaw.create({
  unpack: true,                 // 请求成功时是否解开请求数据
  baseURL: '/eloquent-javascript/translator/api',
  validateStatus: () => true    // 不管返回什么 http 状态码都不 reject
})

export const AxiosPlugin = {
  install (Vue) {
    Vue.prototype.$http = axios
  }
}

axios.interceptors.request.use(request => {
  if (!request.headers.Authorization && store.state.authToken) {
    request.headers.Authorization = store.state.authToken
  }

  return request
})

axios.interceptors.response.use(response => {
  // 解开一层请求的数据
  if (response.config.unpack && response.data.code === 0) {
    response.data = response.data.data
  }

  // 确保错误数据有统一的格式
  if ((response.status < 200 || response.status >= 400) && !response.data.code) {
    response.data = {
      code: -1,
      data: response.data,
      message: '未知错误'
    }
  }

  return response
})
