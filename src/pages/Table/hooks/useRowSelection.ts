import { useState, useEffect } from 'react';
import { GithubIssueItem } from '../types';

interface UseRowSelectionProps {
  list: GithubIssueItem[];
}

export const useRowSelection = (props: UseRowSelectionProps) => {
  const { list } = props;

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

  const rowSelection = {
    selectedRowKeys: selectedList.map((d) => d.id),
    onSelect: (
      record: GithubIssueItem,
      selected: boolean,
      selectedRows: GithubIssueItem[],
    ) => {
      if (selected) {
        setSelectedList([...selectedList, record]);
      } else {
        setSelectedList(selectedList.filter((s) => s.id !== record.id));
      }
    },
    onSelectAll: (
      selected: boolean,
      selectedRows: GithubIssueItem[],
      changeRows: GithubIssueItem[],
    ) => {
      if (selected) {
        setSelectedList([...selectedList, ...changeRows]);
      } else {
        setSelectedList(
          selectedList.filter((s) => !changeRows.some((c) => c.id === s.id)),
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
  };

  return {
    rowSelection,
    isSectectedAll,
    setSelectedRowKeys,
    setIsSectectedAll,
  };
};
