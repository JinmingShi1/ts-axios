import { AxiosRequestConfig, AxiosPromise,AxiosResponse } from '../types'
import xhr from './xhr'
import {buildURL} from '../helpers/url'
import {transformRequest, transformResponse} from '../helpers/data'
import { flattenHeaders, processHeaders } from '../helpers/headers'

export default function dispatchRequest(config:AxiosRequestConfig):AxiosPromise {
  processConfig(config)

  return xhr(config).then((res) => {
    return transformResponseData(res)
  })
}

function processConfig(config:AxiosRequestConfig):void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
  config.headers = flattenHeaders(config.headers, config.method!)
}

// 转化请求地址
function transformURL(config:AxiosRequestConfig):string {
  const {url,params} = config
  return buildURL(url!, params) // 断言不为空
}

// 转化请求数据
function transformRequestData(config:AxiosRequestConfig):any {
  return transformRequest(config.data)
}

// 转化请求headers
function transformHeaders(config: AxiosRequestConfig):any {
  const {headers = {}, data} = config
  return processHeaders(headers, data)
}

function transformResponseData(res: AxiosResponse):AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}

