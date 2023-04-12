import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, Typography, Badge, Popconfirm, Message } from '@arco-design/web-react';
import checkProfile from '@/services/profile/checkProfile';
const { Text } = Typography;

export const ContentType = ['图文', '横版短视频', '竖版短视频'];
export const FilterType = ['规则筛选', '人工'];
export const Status = ['未提交','审核中','审核成功','认证失败' ];


/**
* @编辑用户
*/

export function getColumns(
  t: unknown,
  fetchData: () => void,
  //setData: Dispatch<SetStateAction<any[]>>
) {
  /**
 * @删除用户
 */
  const handleCheck = async (choice,record) => {
    //const res = await checkProfile()
    console.log(choice,record);
    const body = {
      account_id:record.account_id,
      accept:choice === 1 ? true :false
    }
    if(choice){ //通过
      const res = await checkProfile(body);
      console.log(res);
      
    } else {
        const res = await checkProfile(body);
        console.log(res);
    }

    //刷新页面
    await fetchData();
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
      render: (value) => <Text key={`${value}`} ellipsis={true} >{value}</Text>,
    },
    {
      title: 'LicNumber',
      dataIndex: 'profile.identity.lic_number',
      render: (value) => <Text key={`${value}`} ellipsis={true} >{value}</Text>,
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
              handleCheck(1,record);

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

              style={{color:'#00B42A'}}            >
              {t['searchTable.columns.operations.accept']}
            </Button>
          </Popconfirm>
          <Popconfirm
            focusLock
            title='Confirm'
            content='Are you sure you want to delete?'
            onOk={() => {
              Message.info({
                content: 'ok',
              });
              handleCheck(0,record);

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
              style={{color:'red'}}
            //onClick={handleDelete}
            >
              {t['searchTable.columns.operations.reject']}
            </Button>
          </Popconfirm>

        </>
      ),
    },
  ];
}
