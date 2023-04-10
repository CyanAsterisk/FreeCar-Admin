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
import { IconDownload, IconPlus, } from '@arco-design/web-react/icon';
import axios from 'axios';
import useLocale from '@/utils/useLocale';
import SearchForm from './form';
import locale from './locale';
import styles from './style/index.module.less';
import './mock';
import { getColumns } from './constants';
import './style/index.less'
const { Title } = Typography;
import AddCar from './components/addCar/index.tsx';
import { getSomeUserInfo } from '@/services/user/user';

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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formParams, setFormParams] = useState({});

  const columns = useMemo(() => getColumns(t, handleUpdate, fetchData/* tableCallback */), [t]);

  useEffect(() => {

    fetchData();
    // const data = getSomeUserInfo()
    // console.log(data);

  }, [JSON.stringify(formParams)]);

  function fetchData() {
    //const { current, pageSize } = pagination;

    setLoading(true);
    axios
      .get('/api/list', {
        params: {
          //page: current,
          //pageSize,
        },
      })
      .then((res) => {
        // console.log(res.data.list); //一系列数据
        // console.log(res.data.total);
        console.log(formParams);
        setprimaryData(res.data.list);
        setData(res.data.list);
        setLoading(false);
      });
  }

  const searchData = (target: searchItem) => {
    console.log(target);
    const { id, name, phone } = target;
    if (id === undefined && name === undefined && phone === undefined) {
      return false
    }
    let find = (id === undefined) ? phone : id;
    find = (find === undefined) ? name : find;

    primaryData.map((item) => {
      if (item.id === find || item.name === find /* || item.phone === find */) {
        setData([item])
      }
    })

  }
  const resetData = () => {
    console.log(primaryData);

    setData(primaryData);
  }

  return (
    <Card>
      <Title heading={6}>{t['menu.list.searchTable']}</Title>
      <SearchForm onSearch={searchData} resetData={resetData} />
      <Table
        rowKey="id"
        loading={loading}
        //onChange={onChangeTable}
        columns={columns}
        data={data}
        pagination={false}
      />
      <Table
        className={'allData'}
        rowKey="id"
        loading={loading}
        //onChange={onChangeTable}
        indentSize={15}
        //showHeader={false}
        columns={columns}
        data={data}
        pagination={false}
      />
    </Card>
  );
}

export default SearchTable;
