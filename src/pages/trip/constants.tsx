import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, Typography, Tag, Badge, Popconfirm, Message, Collapse } from '@arco-design/web-react';
import IconText from './icons/text.svg';
import IconHorizontalVideo from './icons/horizontal.svg';
import IconVerticalVideo from './icons/vertical.svg';
import deleteTrip from '@/services/trip/deleteTrip';
const { Text } = Typography;
const CollapseItem = Collapse.Item
export const Status = [
  {
    color: 'green',
    status: '未指定'
  },
  {
    color: 'orange',
    status: '过程中'
  },
  {
    color: 'red',
    status: '已结束'
  },
];


/**
* @编辑用户
*/

export function getColumns(
  t: unknown,
  fetchAllData: () => void,
  //setData: Dispatch<SetStateAction<any[]>>
):any {
  /**
 * @删除用户
 */
  const handleDelete = async (record) => {
    const res = await deleteTrip({ data: { id: record.id } })
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
      render: (value) => <Text key={`${value}`} ellipsis={true} copyable>{value}</Text>,
    },
    {
      title: 'AccountId',
      dataIndex: 'trip.account_id',
      ellipsis:true,

      render: (value) => <Text key={`${value}`} ellipsis={true} >{value}</Text>,
    },
    {
      title: 'CarId',
      dataIndex: 'trip.car_id',
      render: (value) => <Text key={`${value}`} ellipsis={true} >{value}</Text>,
    },
    {
      title: 'Trip',
      dataIndex: 'trip',
      render: (trip) => (
        <Collapse
          /*  defaultActiveKey={['1', '2', '3']} */
          style={{ minWidth: '11vw' }}
        >
          <CollapseItem header='Start' name='1'>
            <Collapse defaultActiveKey={'1.4'}>
              <CollapseItem header={'Location'} name='1.1'>
                <strong>Latitude: </strong> {trip.start.location.latitude}<br />
                <strong> Longitude:</strong>{trip.start.location.longitude}
              </CollapseItem>
              <CollapseItem header='FeeCent' name='1.2'>
                {trip.start.fee_cent}
              </CollapseItem>
              <CollapseItem header='KmDriven' name='1.3'>
                {trip.start.km_driven}
              </CollapseItem>
              <CollapseItem header='PoiName' name='1.4'>
                {trip.start.poi_name}
              </CollapseItem>
              <CollapseItem header='Timestamp_sec' name='1.5'>
                {trip.start.timestamp_sec}
              </CollapseItem>
            </Collapse>
          </CollapseItem>
          <CollapseItem header='Current' name='2'>
            <Collapse defaultActiveKey={'2.1'}>
              <CollapseItem header={'Location'} name='2.1'>
                <strong>Latitude: </strong> {trip.current.location.latitude}<br />
                <strong> Longitude:</strong>{trip.current.location.longitude}
              </CollapseItem>
              <CollapseItem header='FeeCent' name='2.2'>
                {trip.current.fee_cent}
              </CollapseItem>
              <CollapseItem header='KmDriven' name='2.3'>
                {trip.current.km_driven}
              </CollapseItem>
              <CollapseItem header='PoiName' name='2.4'>
                {trip.current.poi_name}
              </CollapseItem>
              <CollapseItem header='Timestamp_sec' name='2.5'>
                {trip.current.timestamp_sec}
              </CollapseItem>
            </Collapse>
          </CollapseItem>
          <CollapseItem header='End' name='3'>
            <Collapse defaultActiveKey={'3.1'}>
              <CollapseItem header={'Location'} name='3.1'>
                <strong>Latitude: </strong> {trip.end.location.latitude}<br />
                <strong> Longitude:</strong>{trip.end.location.longitude}
              </CollapseItem>
              <CollapseItem header='FeeCent' name='3.2'>
                {trip.end.fee_cent}
              </CollapseItem>
              <CollapseItem header='KmDriven' name='3.3'>
                {trip.end.km_driven}
              </CollapseItem>
              <CollapseItem header='PoiName' name='3.4'>
                {trip.end.poi_name}
              </CollapseItem>
              <CollapseItem header='Timestamp_sec' name='3.5'>
                {trip.end.timestamp_sec}
              </CollapseItem>
            </Collapse>
          </CollapseItem>
        </Collapse>
      )
    },
    {
      title: 'Status',
      dataIndex: 'trip.status',
      align: 'center',
      render: (x) => {
        return <Tag bordered color={Status[x].color}>{Status[x].status}</Tag>
      }
    },
    {
      title: 'IdentityID',
      dataIndex: 'trip.identity_id',
      ellipsis:true,
      render: (value) => <Text key={`${value}`} ellipsis={true} >{value}</Text>,
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
