import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, Typography, Badge, Popconfirm, Message } from '@arco-design/web-react';
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

/**
* @编辑用户
*/

export function getColumns(
  t: unknown,
  setUpdateShow: () => void,
  fetchData: () => void,
  //setData: Dispatch<SetStateAction<any[]>>
) {
  const handleUpdate = () => {
    console.log('update');

    setUpdateShow();
    return null
  };
  /**
 * @删除用户
 */
  const handleDelete = () => {
    console.log('delete');
    //发送网络请求删除数据
    //刷新页面
    fetchData();
    return null
  };
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
      title: 'Avatar Blob ID',
      dataIndex: 'avater',
    }, 
    {
      title: 'Open ID',
      dataIndex: 'openId',
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
            onClick={handleUpdate}
          >
            {t['searchTable.columns.operations.update']}
          </Button>
          <Popconfirm
            focusLock
            title='Confirm'
            content='Are you sure you want to delete?'
            onOk={() => {
              Message.info({
                content: 'ok',
              });
              handleDelete();
            }}
            onCancel={() => {
              Message.error({
                content: 'cancel',
              });
            }}

          >
            <Button
              type="text"
              size="small"
            //onClick={handleDelete}
            >
              {t['searchTable.columns.operations.delete']}
            </Button>
          </Popconfirm>

        </>
      ),
    },
  ];
}


export default () => ContentIcon;