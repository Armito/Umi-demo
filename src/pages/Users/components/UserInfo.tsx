/*
 * @Author: Armito
 * @Date: 2022-01-15 16:44:53
 * @LastEditTime: 2022-01-15 16:48:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \umi-demo\src\pages\Users\components\UserInfo.tsx
 */
import { useEffect } from 'react'
import { User } from '../data'

export interface UserInfoProps {
  currentUser: User | null
}

const UserInfo = (userInfoProps: UserInfoProps) => {
  const { currentUser } = userInfoProps

  useEffect(() => {
    console.log(222)
  }, [])

  return (
    <>
      <p>{currentUser?.create_time}</p>
      <p>{currentUser?.email}</p>
      <p>{currentUser?.name}</p>
    </>
  )
}

export default UserInfo