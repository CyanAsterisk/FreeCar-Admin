import React from 'react';
import { Button, Typography, Badge } from '@arco-design/web-react';
import styles from './style/index.module.less';
import IconText from './icons/text.svg';
import IconHorizontalVideo from './icons/horizontal.svg';
import IconVerticalVideo from './icons/vertical.svg';

const { Text } = Typography;

export const ContentType = ['图文', '横版短视频', '竖版短视频'];
export const FilterType = ['规则筛选', '人工'];
export const Status = ['未上线', '已上线'];

const ContentIcon = [
  <IconText key={0} />,
  <IconHorizontalVideo key={1} />,
  <IconVerticalVideo key={2} />,
];

export function getColumns(
  t: unknown,
  callback: (record: Record<string, unknown>, type: string) => Promise<void>
) {
  return [
    {
      title: t['user.id'],
      dataIndex: 'id',
      render: (value) => <Text copyable>{value}</Text>,
    },
    {
      title: t['user.name'],
      dataIndex: 'name',
    },
    {
      title: t['user.phone.number'],
      dataIndex: 'phone',
    },
    {
      title: t['searchTable.columns.operations'],
      dataIndex: 'operations',
      headerCellStyle: { paddingLeft: '2vw' },
      render: (_, record) => (
        <>
          <Button
            type="text"
            size="small"
            onClick={() => callback(record, 'update')}
          >
            {t['searchTable.columns.operations.update']}
          </Button>
          <Button
            type="text"
            size="small"
            onClick={() => callback(record, 'delete')}
          >
            {t['searchTable.columns.operations.delete']}
          </Button>
        </>
      ),
    },
  ];
}


export default () => ContentIcon;