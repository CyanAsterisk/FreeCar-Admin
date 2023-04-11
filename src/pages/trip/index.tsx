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
  const [showIntialization, setShowstate] = useState('none');
  const fetchSomeData = async () => {
    setLoading(true)
    const res = await getSomeProfileInfo()
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

  const fetchRestData = async () => {
    const res = await getAllProfileInfo();
    console.log(res);
    const restArr = []
    res.data.profile.map((item) => {
      restArr.push(
        Object.assign({}, item, { 'key': `{${item.account_id}+${item.profile.identity.name}}` })
      )
    })

    setData(Array.from(new Set(data.concat(restArr))))
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

  const addUser = () => { //添加用户
    setShowstate('block')
  }



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
