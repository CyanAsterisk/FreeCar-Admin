import React, { useState, useEffect, useMemo, useRef, ReactChild } from 'react';
import {
  Table,
  Card,
  Button,
  Space,
  Typography,
} from '@arco-design/web-react';
import { IconDownload, IconPlus, IconUserAdd } from '@arco-design/web-react/icon';
import useLocale from '@/utils/useLocale';
import SearchForm from './form';
import locale from './locale';
import { getColumns } from './constants';
import './style/index.less'
const { Title } = Typography;
import { getSomeProfileInfo, getAllProfileInfo } from '@/services/profile/profile';

interface searchItem {
  accountId: unknown | undefined
}
/**
 * 
 * @搜索栏
 */
function SearchTable() {
  const t = useLocale(locale);



  const [primaryData, setprimaryData] = useState([]);
  const [data, setData] = useState(null)

  const [loading, setLoading] = useState(true);

  const [formParams, setFormParams] = useState({});
  const [showIntialization, setShowstate] = useState('none');
  const fetchSomeData = async () => {
    setLoading(true)
    const res = await getSomeProfileInfo()
    
    const newArr = []
    res.data.profile.map((item) => {
      
      newArr.push(
        Object.assign({}, item, { 'key': `${item.account_id}` })
      )
    })

    setData(newArr)
    setprimaryData(newArr)
    setLoading(false)
  }

  const fetchRestData = async () => {
    const res = await getAllProfileInfo();
    const restArr = []
    res.data.profile.map((item) => {
      restArr.push(
        Object.assign({}, item, { 'key': `${item.account_id}` })
      )
    })

    setData(restArr)
    setprimaryData(Array.from(new Set(primaryData.concat(restArr))));

  }
  const fetchAllData = async () => {
    await fetchSomeData();
    await fetchRestData()

  }

  const columns = useMemo(() => getColumns(t, fetchAllData), [t]);

  useEffect(() => {
    fetchAllData()
  }, [showIntialization, JSON.stringify(formParams)]);

  const searchData = (target: searchItem) => {
    const { accountId } = target;
    if (accountId === undefined) {
      return false
    }
    const find = accountId;
    primaryData.map((item) => {

      if (item.account_id === find ) {
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
