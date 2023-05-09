import React, { useState, useEffect, useRef } from 'react'
import { Form, Input, Button, Notification, Message, InputNumber } from '@arco-design/web-react';
const FormItem = Form.Item;
import './index.less'
import { IconCloseCircle } from '@arco-design/web-react/icon';
import updateUser, { updateUserInfo } from '../../../../services/user/updateUser'

import useLocale from '@/utils/useLocale';
import local from '../../locale'
interface IUpadateUserProps {
    setShowUpdate: (display) => void,
    showUpdate: string,
    record: {
        account_id: number
    }
}

const UpdateUser = ((props: IUpadateUserProps) => {
    //通过父组件传参来决定是否展示 UpdateUser 页面
    const { showUpdate, setShowUpdate, record } = props
    const [form] = Form.useForm();
    const divRef = useRef(null)
    const t = useLocale(local)


    /* 关闭页面 */
    const closeUserAddPage = () => {
        setShowUpdate('none')
    }
    //提交请求
    const handleClick = async () => {
        const data = form.getFieldsValue()
        data['account_id'] = record.account_id
        data['phone_number'] = JSON.stringify(data['phone_number'])

        const res = await updateUser(data as updateUserInfo);

        const status = res.data.base_resp.status_msg;

        if (status === 'success') {
            Notification.success({
                title: 'Success',
                content: t['Update user successfully'],
            })
        } else {
            Notification.error({
                title: 'Failed',
                content: t['Fail to update user'],
            })
        }
        form.resetFields();

    }
    useEffect(() => {
        setShowUpdate(showUpdate)

    }, [showUpdate])
    return (
        <div className='updateUserBox' ref={divRef} style={{ display: `${showUpdate}` }}>

            <Form
                className={'updateUserForm'}
                form={form}
                autoComplete='off'
                layout={'vertical'}
                validateMessages={{
                    required: (_, { label }) => `必须填写 ${label}`,
                    string: {
                        length: `字符数必须是 #{length}`,
                        match: `不匹配正则 #{pattern}`,
                    }
                }}
            >
                <div className='closeForm'>
                    <Button type='primary' onClick={closeUserAddPage} icon={<IconCloseCircle style={{ fontSize: '16px' }} className='closeBtnIcon' />} className={'closeBtn'}>
                    </Button>
                </div>
                <FormItem
                    label={t['Username']}
                    field='username'
                    required
                >
                    <Input placeholder={t['Please enter the username']} />
                </FormItem>
                <FormItem
                    label={t['Phone Number']}
                    field='phone_number'
                    extra={t['Please enter number']}
                    required
                >
                    <InputNumber placeholder={t['Please enter the phone number']} />
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

export default UpdateUser