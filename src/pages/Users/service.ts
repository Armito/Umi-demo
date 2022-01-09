/*
 * @Author: Armito
 * @Date: 2022-01-09 15:21:54
 * @LastEditTime: 2022-01-09 15:33:00
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \umi-demo\src\pages\Users\service.ts
 */
import { request } from 'umi'

export const queryUsers = () => {
  return request('/armito/users', {
    method: 'GET'
  })
}