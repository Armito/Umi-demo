import React, { useRef, useState } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Menu, Dropdown, Select } from 'antd';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type { ActionType } from '@ant-design/pro-table';
import request from 'umi-request';
import './index.less';
import { GithubIssueItem } from './types';
import { useRowSelection } from './hooks/useRowSelection';

export default () => {
  const actionRef = useRef<ActionType>();

  const [list, setList] = useState<GithubIssueItem[]>([]);

  const {
    rowSelection,
    isSectectedAll,
    setSelectedRowKeys,
    setIsSectectedAll,
  } = useRowSelection({ list });

  return (
    <ProTable<GithubIssueItem>
      actionRef={actionRef}
      columns={[
        {
          dataIndex: 'index',
          valueType: 'indexBorder',
          width: 20,
        },
        {
          title: '标题',
          dataIndex: 'title',
          copyable: true,
          ellipsis: true,
          tip: '标题过长会自动收缩',
          formItemProps: {
            rules: [
              {
                required: true,
                message: '此项为必填项',
              },
            ],
          },
        },
        {
          title: '状态',
          dataIndex: 'state',
          filters: true,
          onFilter: true,
          valueType: 'select',
          valueEnum: {
            all: { text: '全部', status: 'Default' },
            open: {
              text: '未解决',
              status: 'Error',
            },
            closed: {
              text: '已解决',
              status: 'Success',
              disabled: true,
            },
            processing: {
              text: '解决中',
              status: 'Processing',
            },
          },
        },
        {
          title: '标签',
          dataIndex: 'labels',
          search: false,
          renderFormItem: (_, { defaultRender }) => {
            return defaultRender(_);
          },
          render: (_, record) => (
            <Space>
              {record.labels.map(({ name, color }) => (
                <Tag color={color} key={name}>
                  {name}
                </Tag>
              ))}
            </Space>
          ),
        },
        {
          title: '创建时间',
          key: 'showTime',
          dataIndex: 'created_at',
          valueType: 'dateTime',
          sorter: true,
          hideInSearch: true,
        },
        {
          title: '创建时间',
          dataIndex: 'created_at',
          valueType: 'dateRange',
          hideInTable: true,
          search: {
            transform: (value) => {
              return {
                startTime: value[0],
                endTime: value[1],
              };
            },
          },
        },
        {
          title: '操作',
          valueType: 'option',
          render: (text, record, _, action) => [
            <a
              key="editable"
              onClick={() => {
                action?.startEditable?.(record.id);
              }}
            >
              编辑
            </a>,
            <a
              href={record.url}
              target="_blank"
              rel="noopener noreferrer"
              key="view"
            >
              查看
            </a>,
            <TableDropdown
              key="actionGroup"
              onSelect={() => action?.reload()}
              menus={[
                { key: 'copy', name: '复制' },
                { key: 'delete', name: '删除' },
              ]}
            />,
          ],
        },
      ]}
      rowSelection={rowSelection}
      tableAlertRender={({
        selectedRowKeys,
        selectedRows,
        onCleanSelected,
      }) => (
        <Space size={24}>
          <span>
            已选 {isSectectedAll ? '全部' : selectedRowKeys.length} 项
            <a
              style={{ marginLeft: 8 }}
              onClick={() => {
                setSelectedRowKeys([]);
                setIsSectectedAll(false);
              }}
            >
              取消选择
            </a>
          </span>
        </Space>
      )}
      tableAlertOptionRender={false}
      request={async (params = {}, sort, filter) => {
        const res = await request<{
          data: GithubIssueItem[];
        }>('https://proapi.azurewebsites.net/github/issues', {
          params,
        });

        setList(res.data || []);

        return Promise.resolve(res);
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
      }}
      rowKey="id"
      // search={{
      //   labelWidth: 'auto',
      // }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolbar={{
        search: (
          <Select>
            <Select.Option key={1}>123</Select.Option>
            <Select.Option key={2}>234</Select.Option>
          </Select>
        ),
      }}
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => {}}
        >
          新建
        </Button>,
        <Dropdown
          key="menu"
          overlay={
            <Menu>
              <Menu.Item key="1">1st item</Menu.Item>
              <Menu.Item key="2">2nd item</Menu.Item>
              <Menu.Item key="3">3rd item</Menu.Item>
            </Menu>
          }
        >
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
  );
};
