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
  id: unknown | undefined
  plate_num: string | undefined,
}


/**
 * 
 * @搜索栏
 */
function SearchTable() {
  const t = useLocale(locale);


  //console.log(columns);

  const [primaryData, setprimaryData] = useState([]);
  const [data, setData] = useState(null)

  const [loading, setLoading] = useState(true);

  const [formParams, setFormParams] = useState({});
  const fetchPendingData = async () => {
    setLoading(true)
    const res = await getPendingProfileInfo()
    console.log(res);
    
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
    console.log(target);
    const { id, plate_num } = target;
    if (id === undefined && plate_num === undefined) {
      return false
    }
    const find = (id === undefined) ? plate_num : id;
    primaryData.map((item) => {

      if (item.id === find || item.car.plate_num === find) {
        setData([item])
        console.log(item);

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
