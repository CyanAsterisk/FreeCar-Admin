import React, { useState } from 'react';
import { Descriptions, Card, Button } from '@arco-design/web-react';
import ChangePassword from './password/index'
import './index.less'
import useLocal from '@/utils/useLocale'
import local from './local'



const App = () => {
    const t = useLocal(local)
    const data = [
        {
            label: t['Name'],
            value: t['Admin'],
        },
        {
            label: t['Residence'],
            value: t['Chongqing'],
        },
        {
            label:t[ 'Address'],
            value: 'CQUPT',
        },
    ];
    const hacndleClick = () => {
        setShowstate('block')
    }
    const [showIntialization, setShowstate] = useState('none');

    return (
            <Card>
                <ChangePassword showIntialization={showIntialization} setShowState={setShowstate} />
                <Descriptions
                    column={1}
                    title={t['User Info']}
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
    );
};

export default App;
