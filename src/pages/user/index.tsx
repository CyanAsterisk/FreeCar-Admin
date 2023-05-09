import React, { useState, useEffect, useMemo, useRef, ReactChild } from 'react';
import {
  Table,
  Card,
  PaginationProps,
  Button,
  Space,
  Typography,
} from '@arco-design/web-react';
import PermissionWrapper from '@/components/PermissionWrapper';
import { IconDownload, IconPlus, IconUserAdd } from '@arco-design/web-react/icon';
import axios from '../../utils/request';
import Axios from 'axios'
import useLocale from '@/utils/useLocale';
import SearchForm from './form';
import locale from './locale';
import styles from './style/index.module.less';
import './mock';
import { getColumns } from './constants';
import './style/index.less'
const { Title } = Typography;
import AddUser from './components/addUser/index';
import UpdateUser from './components/updateUser';
import { getSomeUserInfo, getAllUserInfo } from '@/services/user/user';

interface searchItem {
  id: unknown | undefined
  name: string | undefined,
  phone: number | undefined
}
/**
 * 
 * @搜索栏
 */
function SearchTable() {
  const t = useLocale(locale);


  const [showUpdate, setShowUpdate] = useState('none');
  const handleUpdate = () => {
    setShowUpdate('block');
  }
  //console.log(columns);

  const [primaryData, setprimaryData] = useState([]);
  const [record, setRecord] = useState(null)
  const [data, setData] = useState([])

  const [loading, setLoading] = useState(true);
  // const addUserRef = useRef<ReactChild>(null);

  const [formParams, setFormParams] = useState({});
  const [showIntialization, setShowstate] = useState('none');
  const fetchSomeData = async () => {
    setLoading(true)
    const res = await getSomeUserInfo()
    const newArr = []
    res.data.users.map((item) => {
      newArr.push(
        Object.assign({}, item, { 'key': `${item.account_id}+${item.open_id}` })
      )
    })
    setData(newArr)
    setprimaryData(newArr)
    setLoading(false)
  }
  const fetchRestData = async () => {
    const res = await getAllUserInfo();
    const restArr = []
    res.data.users.map((item) => {
      restArr.push(
        Object.assign({}, item, { 'key': `${item.account_id}+${item.open_id}` })
      )
    })

    setData(restArr)
    setprimaryData(Array.from(new Set(primaryData.concat(restArr))));

  }
  const fetchAllData = async () => {
    await fetchSomeData();
    await fetchRestData()
  }

  const columns = useMemo(() => getColumns(t, handleUpdate, fetchAllData, setRecord), [t]);

  useEffect(() => {
    fetchAllData()
  }, [showIntialization, showUpdate, JSON.stringify(formParams)]);

  const addUser = () => { //添加用户
    setShowstate('block')
  }



  const searchData = (target: searchItem) => {
    console.log(target);
    const { id, name, phone } = target;
    if (id === "" && name === undefined && phone === undefined) {
      return false
    }
    let find = (id === "") ? phone : id;
    find = (find === undefined) ? name : find;
    let flag = (id === "") ? 'phone_number' : 'account_id';
    flag = (id === "" && phone === undefined) ? 'username' : flag;
    console.log(find, flag);

    primaryData.map((item) => {
      console.log(item);

      if (item[flag] === find) {
        setData([item])
      }
    })

  }
  const resetData = () => {
    setData(primaryData)

  }

  return (
    <Card>
      <Title heading={6}>{t['menu.list.searchTable']}</Title>
      <SearchForm onSearch={searchData} resetData={resetData} />
      {/* <PermissionWrapper
        requiredPermissions={[
          { resource: 'menu.list.searchTable', actions: ['write'] },
        ]}
      > */}
      <div className={styles['button-group']}>
        <Space>
          {/* <Button type="primary" icon={<IconPlus />}>
              {t['searchTable.operations.add']}
            </Button>
            <Button>{t['searchTable.operations.upload']}</Button> */}
        </Space>
        <Space>
          <Button type="primary" icon={<IconUserAdd />} onClick={addUser}>
            {t['searchTable.operations.add']}
          </Button>
        </Space>
      </div>
      {/* </PermissionWrapper> */}
      <AddUser showIntialization={showIntialization} setShowState={setShowstate} />
      <UpdateUser showUpdate={showUpdate} setShowUpdate={setShowUpdate} record={record} />
      <Table
        rowKey="key"
        loading={loading}
        //onChange={onChangeTable}
        columns={columns}
        // data={someData}
        data={data}
        pagination={false}
      />
    </Card>
  );
}

export default SearchTable;
