/*
 * @Author: Armito
 * @Date: 2022-01-09 14:16:47
 * @LastEditTime: 2022-01-15 16:54:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \umi-demo\src\pages\Users\index.tsx
 */
import { useState } from 'react'
import { connect } from 'umi'
import { Table, Button } from 'antd'
import AddUser from './components/AddUser'
import styles from './style.module.less'
import { UsersProps, User, UserState } from './data'

const Users = ({ users }: UsersProps) => {
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
    {
      title: 'Operate',
      dataIndex: 'operate',
      key: 'operate',
      render: (text: any, record: User) => (
        <Button type="link" onClick={() => addUser(record)}>Add</Button>
      )
    }
  ];

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [addUserVisible, setAddUserVisible] = useState(false)
  const addUser = (record: User) => {
    setCurrentUser(record)
    setAddUserVisible(true)
  }
  const handleOk = () => {
    handleCancel()
  }
  const handleCancel = () => {
    setCurrentUser(null)
    setAddUserVisible(false)
  }

  return (
    <div className={styles.users}>
      <Table 
        columns={columns} 
        dataSource={users.data} 
        rowKey={(record: User) => record.id}
      />

      <AddUser
        title="Add User" 
        visible={addUserVisible}
        destroyOnClose={true}
        onOk={handleOk} 
        onCancel={handleCancel}
        currentUser={currentUser}
      />
    </div>
  )
}

const mapStateToProp = ({ users }: { users: UserState }) => ({ users })

export default connect(mapStateToProp)(Users)
