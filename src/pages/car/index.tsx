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
import styles from './style/index.module.less';
import './mock';
import { getColumns } from './constants';
import './style/index.less'
const { Title } = Typography;
import AddUser from './components/addCar/index.tsx';
import { getSomeCarInfo, getAllCarInfo } from '@/services/car/car';

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
  const [data, setData] = useState([])

  const [loading, setLoading] = useState(true);

  const [formParams, setFormParams] = useState({});
  const [showIntialization, setShowstate] = useState('none');
  const fetchSomeData = async () => {
    setLoading(true)
    const res = await getSomeCarInfo()
    const newArr = []
    res.data.cars.map((item) => {
      newArr.push(
        Object.assign({}, item, { 'key': `${item.id}` })
      )
    })

    setData(newArr)
    setprimaryData(newArr)
    setLoading(false)
  }

  const fetchRestData = async () => {
    const res = await getAllCarInfo();
    console.log(res);
    const restArr = []
    res.data.cars.map((item) => {
      restArr.push(
        Object.assign({}, item, { 'key': `${item.id}` })
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
          <Button type="primary" icon={<IconPlus />} onClick={addUser}>
            {t['searchTable.operations.add']}
          </Button>
        </Space>
      </div>
      {/* </PermissionWrapper> */}
      <AddUser showIntialization={showIntialization} setShowState={setShowstate} />
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
