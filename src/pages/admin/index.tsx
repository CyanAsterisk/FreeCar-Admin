import React, { useState } from 'react';
import { Descriptions, Card, Button } from '@arco-design/web-react';
import ChangePassword from './password/index'
import './index.less'

const data = [
    {
        label: 'Name',
        value: 'Admin',
    },
    {
        label: 'Residence',
        value: 'Chongqing',
    },
    {
        label: 'Address',
        value: 'CQUPT',
    },
];

const App = () => {
    const hacndleClick = () => {
        setShowstate('block')
    }
    const [showIntialization, setShowstate] = useState('none');

    return (
        <div className='userSettingBox'>
            <Card>
                <ChangePassword showIntialization={showIntialization} setShowState={setShowstate} />
                <Descriptions
                    column={1}
                    title='User Info'
                    data={data}
                    style={{ marginBottom: 20 }}
                    labelStyle={{ paddingRight: 36 }}
                    className={'userSetting'}
                />
                <Button
                    type='outline'
                    onClick={hacndleClick}
                >
                    修改密码
                </Button>
            </Card>
        </div>
    );
};

export default App;
