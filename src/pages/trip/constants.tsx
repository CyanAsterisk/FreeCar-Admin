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
      title: 'ID',
      dataIndex: 'id',
      render: (value) => <Text copyable>{value}</Text>,
    },
    {
      title: 'Driver ID',
      dataIndex: 'driverId',
      //render: (value) => <Text copyable>{value}</Text>,
    },
    {
      title: 'Driver Avatar Url',
      dataIndex: 'driverAvatarUrl',
    },
    {
      title: 'Position Latitude',
      dataIndex: 'positionLatitude',
    },
    {
      title: 'Position Longitude',
      dataIndex: 'positionLongitude',
    },
    {
      title: 'Trip ID',
      dataIndex: 'tripId',
    },
    {
      title: 'Power',
      dataIndex: 'power',
    },
    {
      title: 'Plate Number',
      dataIndex: 'plateNumber',
    },
    {
      title: t['searchTable.columns.operations'],
      dataIndex: 'operations',
      headerCellStyle: { paddingLeft: '1vw' },
      render: (_, record) => (
        <>
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