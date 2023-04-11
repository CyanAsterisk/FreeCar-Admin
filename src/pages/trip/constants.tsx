import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, Typography, Badge, Popconfirm, Message } from '@arco-design/web-react';
import IconText from './icons/text.svg';
import IconHorizontalVideo from './icons/horizontal.svg';
import IconVerticalVideo from './icons/vertical.svg';
import deleteCar from '@/services/car/deleteCar';
const { Text } = Typography;

export const Status = ['未提交','审核中','审核成功','认证失败' ];


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
      title: 'AccountID',
      dataIndex: 'account_id',
      render: (value) => <Text key={`${value}`} copyable>{value}</Text>,
    },
    {
      title: 'Photo',
      dataIndex: 'photo_blob_id',
    },
    {
      title: 'LicNumber',
      dataIndex: 'profile.identity.lic_number',
    },
    {
      title: 'Name',
      dataIndex: 'profile.identity.name',
    },
    {
      title: 'Gender',
      dataIndex: 'profile.identity.gender',
    },
    {
      title: 'Birth',
      dataIndex: 'profile.identity.birth_date_millis',
    },
    {
      title: 'IdentityStatus',
      dataIndex: 'profile.identity_status',
      render: (x) => {
        
        if (x === 3) {
          return <Badge status="error" text={Status[x]}></Badge>;
        } else if(x===2){
          return <Badge status="success" text={Status[x]}></Badge>;
        } else if(x===1){
          return <Badge status="warning" text={Status[x]}></Badge>;

        } 
        return <Badge status="default" text={Status[x]}></Badge>;

      },
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
