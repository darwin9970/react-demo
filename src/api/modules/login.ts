import { Login } from '@/api/interface'
// import qs from 'qs';
import http from '../service'

/**
 * @name loginApi
 * @description 用户登录接口
 */
export const loginApi = (params: Login.ReqLoginForm) => {
  try {
    return http.get<Login.ResLogin>(`/rec`, params)
    // return http.post<Login.ResLogin>(`/login`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
    // return http.post<Login.ResLogin>(`/login`, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
    // return http.post<Login.ResLogin>(`/login`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
  } catch (err) {
    console.log(err)
  }
}
export const testApi = () => {
  try {
    return http.get('/test')
  } catch (e) {
    console.log(e)
  }
}
