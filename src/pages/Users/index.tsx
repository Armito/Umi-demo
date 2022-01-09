/*
 * @Author: Armito
 * @Date: 2022-01-09 14:16:47
 * @LastEditTime: 2022-01-09 16:02:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \umi-demo\src\pages\Users\index.tsx
 */
import React, { FC } from 'react'
import { connect } from 'umi'
import { Table } from 'antd'
import styles from './style.module.less'
import { UsersProps, User, UserState } from './data'

const Users: FC<UsersProps> = ({ users }) => {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Update Time',
      dataIndex: 'update_time',
      key: 'update_time',
    },
  ];

  return (
    <div className={styles.users}>
      <Table 
        columns={columns} 
        dataSource={users.data} 
        rowKey={(record: User) => record.id}
      />
    </div>
  )
}

const mapStateToProp = ({ users }: { users: UserState }) => ({ users })

export default connect(mapStateToProp)(Users)
