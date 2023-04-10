import React, { useEffect, useRef } from 'react'
import { Form, Input, Button, Message, InputNumber, Notification } from '@arco-design/web-react';
const FormItem = Form.Item;
import './index.less'
import { IconCloseCircle } from '@arco-design/web-react/icon';
import addUser, { addUserInfo } from '../../../../services/user/addUser'
interface IAddUserProps {
    setShowState: (display) => void,
    showIntialization: string
}

const AddUser = ((props: IAddUserProps) => {
    //通过父组件传参来决定是否展示 AddUser 页面
    const { showIntialization, setShowState } = props
    const [form] = Form.useForm();
    const divRef = useRef(null)

    /* 关闭页面 */
    const closeUserAddPage = () => {
        setShowState('none')
    }
    //提交请求
    const handleClick = async () => {
        const data = form.getFieldsValue()
        console.log(data);
        const res = await addUser(data as addUserInfo)

        const status = res.data.base_resp.status_msg;
        if (status === 'success') {
            Notification.success({
                title: 'Success',
                content: 'Add a new user successfully',
            })
        } else {
            Notification.error({
                title: 'Failed',
                content: 'Fail to add a new user',
            })
        }
        form.resetFields();
    }
    useEffect(() => {
        setShowState(showIntialization)
    }, [showIntialization])
    return (
        <div className='addUserBox' ref={divRef} style={{ display: `${showIntialization}` }}>

            <Form
                className={'addUserForm'}
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
                    label='Account Id'
                    field='account_id'
                    extra='Please enter number'
                    required
                >
                    <InputNumber placeholder='please enter the account id' />
                </FormItem>
                <FormItem
                    label='Username'
                    field='username'
                    required
                >
                    <Input placeholder='please enter the username' />
                </FormItem>
                <FormItem
                    label='Phone Number'
                    field='phone_number'
                    extra='Please enter number'
                    required
                >
                    <InputNumber placeholder='please enter the phone number' />
                </FormItem>
                <FormItem
                    label='Avatar Blob Id'
                    field='avatar_blod_id'
                    extra='Please enter number'
                    required
                >
                    <InputNumber placeholder='please enter the avatar blob id' />
                </FormItem>
                <FormItem
                    label='Open Id'
                    field='open_id'
                    required
                >
                    <Input placeholder='please enter the open id' />
                </FormItem>

                <FormItem wrapperCol={{ offset: 5 }}>
                    <Button type='primary' htmlType='submit' onClick={handleClick}>
                        Submit
                    </Button>
                    <Button
                        style={{ marginLeft: 2 }}
                        onClick={() => {
                            form.resetFields();
                        }}
                    >
                        Reset
                    </Button>
                </FormItem>
            </Form>
        </div>
    );
})

export default AddUser