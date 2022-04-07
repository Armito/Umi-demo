// import { Button, DatePicker, Space, Table } from 'antd';
// import type { ProColumns } from '@ant-design/pro-table';
// import ProTable from '@ant-design/pro-table';

// const { RangePicker } = DatePicker;

// const valueEnum = {
//   0: 'close',
//   1: 'running',
//   2: 'online',
//   3: 'error',
// };

// const ProcessMap = {
//   close: 'normal',
//   running: 'active',
//   online: 'success',
//   error: 'exception',
// };

// export type TableListItem = {
//   key: number;
//   name: string;
//   progress: number;
//   containers: number;
//   callNumber: number;
//   creator: string;
//   status: string;
//   createdAt: number;
//   memo: string;
// };
// const tableListDataSource: TableListItem[] = [];

// const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

// for (let i = 0; i < 25; i += 1) {
//   tableListDataSource.push({
//     key: i,
//     name: 'AppName',
//     containers: Math.floor(Math.random() * 20),
//     callNumber: Math.floor(Math.random() * 2000),
//     progress: Math.ceil(Math.random() * 100) + 1,
//     creator: creators[Math.floor(Math.random() * creators.length)],
//     status: valueEnum[Math.floor(Math.random() * 10) % 4],
//     createdAt: Date.now() - Math.floor(Math.random() * 100000),
//     memo: i % 2 === 1 ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴' : '简短备注文案',
//   });
// }

// const columns: ProColumns<TableListItem>[] = [
//   {
//     title: '应用名称',
//     width: 120,
//     dataIndex: 'name',
//     fixed: 'left',
//     render: (_) => <a>{_}</a>,
//   },
//   {
//     title: '容器数量',
//     width: 120,
//     dataIndex: 'containers',
//     align: 'right',
//     search: false,
//     sorter: (a, b) => a.containers - b.containers,
//   },
//   {
//     title: '调用次数',
//     width: 120,
//     align: 'right',
//     dataIndex: 'callNumber',
//   },
//   {
//     title: '执行进度',
//     dataIndex: 'progress',
//     valueType: (item) => ({
//       type: 'progress',
//       status: ProcessMap[item.status],
//     }),
//   },
//   {
//     title: '创建者',
//     width: 120,
//     dataIndex: 'creator',
//     valueType: 'select',
//     valueEnum: {
//       all: { text: '全部' },
//       付小小: { text: '付小小' },
//       曲丽丽: { text: '曲丽丽' },
//       林东东: { text: '林东东' },
//       陈帅帅: { text: '陈帅帅' },
//       兼某某: { text: '兼某某' },
//     },
//   },
//   {
//     title: '创建时间',
//     width: 140,
//     key: 'since',
//     dataIndex: 'createdAt',
//     valueType: 'date',
//     sorter: (a, b) => a.createdAt - b.createdAt,
//     renderFormItem: () => {
//       return <RangePicker />;
//     },
//   },
//   {
//     title: '备注',
//     dataIndex: 'memo',
//     ellipsis: true,
//     copyable: true,
//     search: false,
//   },
//   {
//     title: '操作',
//     width: 80,
//     key: 'option',
//     valueType: 'option',
//     fixed: 'right',
//     render: () => [<a key="link">链路</a>],
//   },
// ];

// export default () => {
//   return (
//     <ProTable<TableListItem>
//       columns={columns}
//       rowSelection={{
//         // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
//         // 注释该行则默认不显示下拉选项
//         selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
//         defaultSelectedRowKeys: [1],
//       }}
//       tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
//         <Space size={24}>
//           <span>
//             已选 {selectedRowKeys.length} 项
//             <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
//               取消选择
//             </a>
//           </span>
//           <span>{`容器数量: ${selectedRows.reduce(
//             (pre, item) => pre + item.containers,
//             0,
//           )} 个`}</span>
//           <span>{`调用量: ${selectedRows.reduce(
//             (pre, item) => pre + item.callNumber,
//             0,
//           )} 次`}</span>
//         </Space>
//       )}
//       tableAlertOptionRender={() => {
//         return (
//           <Space size={16}>
//             <a>批量删除</a>
//             <a>导出数据</a>
//           </Space>
//         );
//       }}
//       dataSource={tableListDataSource}
//       scroll={{ x: 1300 }}
//       options={false}
//       search={false}
//       rowKey="key"
//       headerTitle="批量操作"
//       toolBarRender={() => [<Button key="show">查看日志</Button>]}
//     />
//   )
// }

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import {
  Button,
  Tag,
  Space,
  Menu,
  Dropdown,
  message,
  Progress,
  Modal,
} from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';
import { useGetState } from 'ahooks';
import './index.less';

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
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
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
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
];

const menu = (
  <Menu>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

export default () => {
  const actionRef = useRef<ActionType>();

  const [list, setList] = useState<GithubIssueItem[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedList, setSelectedList] = useState<GithubIssueItem[]>([]);
  const [isSectectedAll, setIsSectectedAll] = useState<boolean>(false);

  useEffect(() => {
    setSelectedList(list.filter((d) => selectedRowKeys.includes(d.id)));
  }, [selectedRowKeys]);

  useEffect(() => {
    if (isSectectedAll) {
      setSelectedList(list);
    }
  }, [isSectectedAll, list]);

  const [percent, setPercent, getPercent] = useGetState<number>(0);
  const [maskVisibel, setMaskVisibel] = useState(false);

  const key = 'updatable';

  const openMessage = () => {
    setMaskVisibel(true);
    message.open({
      type: 'info',
      key,
      duration: 0,
      icon: <Progress type="circle" percent={percent} width={80} />,
      content: '打标签中...',
      className: 'progress-tips',
    });

    const timer = setInterval(() => {
      if (getPercent() < 100) {
        if (getPercent() + 10 >= 100) {
          message.open({
            type: 'success',
            key,
            duration: 0,
            icon: <Progress type="circle" percent={100} width={80} />,
            content: '处理成功！',
            className: 'progress-tips',
          });
        } else {
          message.open({
            type: 'success',
            key,
            duration: 0,
            icon: (
              <Progress type="circle" percent={getPercent() + 10} width={80} />
            ),
            content: '打标签中...',
            className: 'progress-tips',
          });
        }
        setPercent(getPercent() + 10);
      } else {
        setPercent(0);
        clearInterval(timer);
        message.destroy();
        setMaskVisibel(false);
      }
    }, 800);
  };

  const Mask = () => {
    if (!maskVisibel) return null;
    return createPortal(
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
      ></div>,
      document.body,
    );
  };

  return (
    <>
      <Modal
        className="progress-tips"
        visible={maskVisibel}
        closable={false}
        width={200}
        maskClosable={false}
      >
        <div style={{ textAlign: 'center' }}>
          <Progress type="circle" percent={percent} width={80} />
          处理中...
        </div>
      </Modal>
      <ProTable<GithubIssueItem>
        actionRef={actionRef}
        columns={columns}
        rowSelection={{
          selectedRowKeys: selectedList.map((d) => d.id),
          onSelect: (record, selected, selectedRows) => {
            if (selected) {
              setSelectedList([...selectedList, record]);
            } else {
              setSelectedList(selectedList.filter((s) => s.id !== record.id));
            }
          },
          onSelectAll: (selected, selectedRows, changeRows) => {
            if (selected) {
              setSelectedList([...selectedList, ...changeRows]);
            } else {
              setSelectedList(
                selectedList.filter(
                  (s) => !changeRows.some((c) => c.id === s.id),
                ),
              );
            }
          },
          selections: [
            {
              key: 'CURRENT',
              text: '选择当前页线索',
              onSelect: (changeableRowKeys: React.Key[]) => {
                if (isSectectedAll) return;
                setSelectedRowKeys(changeableRowKeys);
              },
            },
            {
              key: 'ALL',
              text: '选择全部线索',
              onSelect: (changeableRowKeys: React.Key[]) => {
                setIsSectectedAll(true);
              },
            },
            {
              key: 'CLEAR',
              text: '清空所有',
              onSelect: (changeableRowKeys: React.Key[]) => {
                setSelectedRowKeys([]);
                setIsSectectedAll(false);
              },
            },
          ],
          getCheckboxProps: (record: GithubIssueItem) => {
            return {
              disabled: isSectectedAll,
            };
          },
        }}
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
        search={{
          labelWidth: 'auto',
        }}
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
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={openMessage}
          >
            新建
          </Button>,
          <Dropdown key="menu" overlay={menu}>
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
    </>
  );
};
