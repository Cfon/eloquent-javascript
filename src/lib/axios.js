'use strict'

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

axios.interceptors.response.use(response => {
  // 解开一层请求的数据
  if (response.config.unpack && response.data.code === 0) {
    response.data = response.data.data
  }

  return response
})
