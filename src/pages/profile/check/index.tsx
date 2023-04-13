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
import { getPendingProfileInfo} from '@/services/profile/profile';

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
  const fetchPendingData = async () => {
    setLoading(true)
    const res = await getPendingProfileInfo()
    
    const newArr = []
    res.data.profile.map((item) => {
      
      newArr.push(
        Object.assign({}, item, { 'key': `{${item.account_id}+${item.profile.identity.name}}` })
      )
    })

    setData(newArr)
    setprimaryData(newArr)
    setLoading(false)
  }

  const fetchData = async () => {
    await fetchPendingData();
  }

  const columns = useMemo(() => getColumns(t, fetchData), [t]);

  useEffect(() => {
    fetchData()
  }, [ JSON.stringify(formParams)]);


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
        columns={columns}
        data={data}
        pagination={false}
      />
    </Card>
  );
}

export default SearchTable;
