import React, { useState, useEffect, useRef } from 'react'
import { Form, Input, Button, Notification, Message, InputNumber } from '@arco-design/web-react';
const FormItem = Form.Item;
import './index.less'
import { IconCloseCircle } from '@arco-design/web-react/icon';
import changePassword from '@/services/changePassword';
import { useNavigate } from 'react-router-dom';
import useLocale from '@/utils/useLocale';
import local from '../local'
interface IChangePasswordProps {
    setShowState: (display) => void,
    showIntialization: string
}

const ChangePassword = ((props: IChangePasswordProps) => {
    const t = useLocale(local)
    //通过父组件传参来决定是否展示 UpdateUser 页面
    const { showIntialization, setShowState } = props
    const [form] = Form.useForm();
    const divRef = useRef(null)
    const navigate = useNavigate()
    /* 关闭页面 */
    const closeUserAddPage = () => {
        setShowState('none')
    }
    const toLogin = () => {
        localStorage.removeItem('token')
        navigate("/login", { replace: true })
    }
    //提交请求
    const handleClick = async () => {
        const data = form.getFieldsValue()
        console.log(data);
        const body = {
            old_password: data.oldPassword,
            new_password: data.newPassword
        }
        const res = await changePassword(body);

        const status = res.data.base_resp.status_msg;

        if (status === 'success') {
            Notification.success({
                title: 'Success',
                content: `Change password successfully and please login again`,
                onClose: () => {
                    toLogin();
                }
            })
        } else {
            Notification.error({
                title: 'Failed',
                content: 'Fail to change password',
            })
        }
        form.resetFields();

    }
    useEffect(() => {
        setShowState(showIntialization)

    }, [showIntialization])
    return (
        <div className='changePasswordBox' ref={divRef} style={{ display: `${showIntialization}` }}>

            <Form
                className={'changePasswordForm'}
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
                    label={t['old passsword']}
                    field='oldPassword'
                    required
                >
                    <Input.Password placeholder='please enter the username' />
                </FormItem>
                <FormItem
                    label={t['new password']}
                    field='newPassword'
                    required
                >
                    <Input.Password placeholder='please enter the new password' />
                </FormItem>
                <FormItem
                    label={t['confirm password']}
                    field='confirmPassword'
                    rules={[{
                        validator: (v, cb) => {
                            if (!v) {
                                return cb('confirm_password is required')
                            } else if (form.getFieldValue('newPassword') !== v) {
                                return cb('confirm_password must be equal with password')
                            }
                        }
                    }]}
                    required
                >
                    <Input.Password placeholder='please confirm your new password' />
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

export default ChangePassword