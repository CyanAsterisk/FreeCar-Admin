import {
  Form,
  Input,
  Checkbox,
  Button,
  Space,
} from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import { IconLock, IconUser } from '@arco-design/web-react/icon';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'
import useStorage from '@/utils/useStorage';
import { useNavigate } from 'react-router-dom';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import styles from './style/index.module.less';
import FreeCar from '@/assets/FreeCar.png'

export default function LoginForm() {
  const navigate = useNavigate();
  const formRef = useRef<FormInstance>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginParams, setLoginParams, removeLoginParams] =
    useStorage('loginParams');

  const t = useLocale(locale);

  const [rememberPassword, setRememberPassword] = useState(!!loginParams);

  function afterLoginSuccess(params) {
    // 记住密码
    if (rememberPassword) {
      setLoginParams(JSON.stringify(params));
    } else {
      removeLoginParams();
    }
    // 记录登录状态
    localStorage.setItem('userStatus', 'login');
    // 跳转首页
    window.location.href = '/';
  }
  /* function login(params) {
    setErrorMessage('');
    setLoading(true);
    axios
      .post('/api/user/login', params)
      .then((res) => {
        const { status, msg } = res.data;
        if (status === 'ok') {
          afterLoginSuccess(params);
        } else {
          setErrorMessage(msg || t['login.form.login.errMsg']);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  } */

  function login(params) {
    const { userName, password } = params
    setErrorMessage('');
    setLoading(true);
    const body = {
      username: userName,
      password: password
    }
    console.log(body);

    axios({
      method: 'post',
      url: 'http://localhost:8080/login/admin',
      data: body,

    })
      .then((res) => {
        const status = res.data.base_resp.status_msg;
        console.log(status);
        //*保存登陆状态

        if (status === 'success') {
          const token = res.data.token;
          console.log(token);

          afterLoginSuccess(params);
          localStorage.setItem('token', token);
          navigate('/');
        } else {
          setErrorMessage(status || t['login.form.login.errMsg']);
        }

      }).catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onSubmitClick() {
    /* formRef.current.validate().then((values) => {
      login(values);
      console.log(values);

    }); */
    const data = formRef.current.getFieldsValue()
    //console.log(data);
    login(data)
  }

  // 读取 localStorage，设置初始值
  useEffect(() => {
    const rememberPassword = !!loginParams;
    setRememberPassword(rememberPassword);
    if (formRef.current && rememberPassword) {
      const parseParams = JSON.parse(loginParams);
      formRef.current.setFieldsValue(parseParams);
    }
  }, [loginParams]);

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['freecar-logo']}>
        {/* <img
          src={FreeCar}
        ></img> */}
      </div>
      <div className={styles['login-form-error-msg']}>{errorMessage}</div>
      <Form
        className={styles['login-form']}
        layout="vertical"
        ref={formRef}
        initialValues={{ userName: 'admin', password: 'admin' }}
      >
        <Form.Item
          field="userName"
          rules={[{ required: true, message: t['login.form.userName.errMsg'] }]}
        >
          <Input
            prefix={<IconUser />}
            placeholder={t['login.form.userName.placeholder']}
            onPressEnter={onSubmitClick}
            className={'inputBox'}
          />
        </Form.Item>
        <Form.Item
          field="password"
          rules={[{ required: true, message: t['login.form.password.errMsg'] }]}
        >
          <Input.Password
            prefix={<IconLock />}
            placeholder={t['login.form.password.placeholder']}
            onPressEnter={onSubmitClick}
            className={'inputBox'}
          />
        </Form.Item>
        <Space size={16} direction="vertical">
          <div className={styles['login-form-password-actions']}>
            <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
              {t['login.form.rememberPassword']}
            </Checkbox>
            {/* <Link>{t['login.form.forgetPassword']}</Link> */}
          </div>
          <Button
            type="primary"
            shape='round'
            long
            onClick={onSubmitClick}
            loading={loading}
            className={'loginBtn'}
          >
            {t['login.form.login']}
          </Button>
        </Space>
      </Form>
    </div>
  );
}
