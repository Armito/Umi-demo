/*
 * @Author: Armito
 * @Date: 2022-01-09 15:52:23
 * @LastEditTime: 2022-01-09 16:02:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \umi-demo\src\pages\Users\data.d.ts
 */
export enum UserStatus {
  S0,
  S1,
  S2,
  S3,
}

export interface User {
  create_time: string
  email: string
  id: number | string
  name: string
  status: UserStatus
  update_time: string
}

export interface UserState {
  data: User[]
  meta: {
    page: number
    per_page: number
    total: number
  }
}

export interface UsersProps {
  users: UserState
}