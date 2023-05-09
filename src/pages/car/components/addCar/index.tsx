import React, { useEffect, useRef } from 'react'
import { Form, Input, Button, Message, InputNumber, Notification } from '@arco-design/web-react';
const FormItem = Form.Item;
import './index.less'
import useLocale from '@/utils/useLocale';
import local from '../../locale'
import { IconCloseCircle } from '@arco-design/web-react/icon';
import addCar, { addCarInfo } from '../../../../services/car/addCar'
interface IAddUserProps {
    setShowState: (display) => void,
    showIntialization: string
}

const AddUser = ((props: IAddUserProps) => {
    //通过父组件传参来决定是否展示 AddUser 页面
    const { showIntialization, setShowState } = props
    const [form] = Form.useForm();
    const divRef = useRef(null)
    const t = useLocale(local)
    /* 关闭页面 */
    const closeUserAddPage = () => {
        setShowState('none')
    }
    //提交请求
    const handleClick = async () => {
        const data = form.getFieldsValue()
        const res = await addCar(data as addCarInfo)

        const status = res.data.base_resp.status_msg;
        if (status === 'success') {
            Notification.success({
                title: 'Success',
                content: 'Add a new car successfully',
            })
        } else {
            Notification.error({
                title: 'Failed',
                content: 'Fail to add a new car',
            })
        }
        form.resetFields();
    }
    useEffect(() => {
        setShowState(showIntialization)
    }, [showIntialization])
    return (
        <div className='addCarBox' ref={divRef} style={{ display: `${showIntialization}` }}>

            <Form
                className={'addCarForm'}
                form={form}
                autoComplete='off'
                layout={'vertical'}
                validateMessages={{
                    required: (_, { label }) => `必须填写 ${label}`,
                }}
            >
                <div className='closeForm'>
                    <Button type='primary' onClick={closeUserAddPage} icon={<IconCloseCircle style={{ fontSize: '16px' }} className='closeBtnIcon' />} className={'closeBtn'}>
                    </Button>
                </div>
                <FormItem
                    label={t['PlateNumber']}
                    field='plate_num'
                    required
                >
                    <Input placeholder={t['please enter the plate number']} />
                </FormItem>

                <FormItem wrapperCol={{ offset: 5 }}>
                    <Button type='primary' htmlType='submit' onClick={handleClick}>
                        {t['Submit']}
                    </Button>
                    <Button
                        style={{ marginLeft: 2 }}
                        onClick={() => {
                            form.resetFields();
                        }}
                    >
                        {t['Reset']}
                    </Button>
                </FormItem>
            </Form>
        </div>
    );
})

export default AddUser