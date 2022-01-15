/*
 * @Author: Armito
 * @Date: 2022-01-15 16:20:12
 * @LastEditTime: 2022-01-15 17:29:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \umi-demo\src\pages\Users\components\AddUser.tsx
 */
import { useEffect, useState, ChangeEvent } from 'react'
import { Modal, ModalProps, Input, Button } from 'antd'
import UserInfo, { UserInfoProps } from './UserInfo'

export type AddUserProps = ModalProps & UserInfoProps

const AddUser = ({ currentUser, ...modalProps }: AddUserProps) => {
  useEffect(() => {
    console.log(111)
  }, [])

  const [count, setCount] = useState('0')
  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCount(e.target.value)
  }
  const increment = () => {
    setCount(count + '1')
  }

  return (
    <Modal {...modalProps}>
      <UserInfo currentUser={currentUser} />
      <Input value={count} onChange={onValueChange}></Input>
      <Button type="primary" onClick={increment}>+1</Button>
    </Modal>
  )
}

export default AddUser