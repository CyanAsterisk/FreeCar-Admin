import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, Typography, Badge, Popconfirm, Message } from '@arco-design/web-react';
import IconText from './icons/text.svg';
import IconHorizontalVideo from './icons/horizontal.svg';
import IconVerticalVideo from './icons/vertical.svg';
import deleteCar from '@/services/car/deleteCar';
const { Text } = Typography;

export const ContentType = ['图文', '横版短视频', '竖版短视频'];
export const FilterType = ['规则筛选', '人工'];
export const Status = ['未上线', '已上线'];


/**
* @编辑用户
*/

export function getColumns(
  t: unknown,
  fetchAllData: () => void,
  //setData: Dispatch<SetStateAction<any[]>>
) {
  /**
 * @删除用户
 */
  const handleDelete = async (record) => {
    const res = await deleteCar({ data: { id: record.id } })
    console.log(res);

    //刷新页面
    await fetchAllData();
    return null
  };
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      ellipsis:true,
      render: (value) => <Text key={`${value}`} copyable>{value}</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'car.status',
    },
    {
      title: 'DriverID',
      dataIndex: 'car.driver.id',
    },
    {
      title: 'DriverAvatar',
      dataIndex: 'car.driver.avatar_url',
    },
    {
      title: 'Latitude',
      dataIndex: 'car.position.latitude',
    },
    {
      title: 'Longitude',
      dataIndex: 'car.position.longitude',
    },
    {
      title: 'TripID',
      dataIndex: 'car.trip_id',
    },
    {
      title: 'Power',
      dataIndex: 'car.power',
    },
    {
      title: 'PlateNumer',
      dataIndex: 'car.plate_num',
    },
    {
      title: t['searchTable.columns.operations'],
      dataIndex: 'operations',
      //headerCellStyle: { paddingLeft: '2vw' },
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
              handleDelete(record);

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
