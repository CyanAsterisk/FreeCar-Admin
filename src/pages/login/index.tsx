import React, { useEffect } from 'react';
import LoginForm from './form';
import LoginBanner from './banner';
import styles from './style/index.module.less';
import './style/index.less'
function Login() {
  useEffect(() => {
    console.log(document.URL);

    if (!(window.history.state && window.history.state.target === 'Final')) {
      window.history.pushState({ target: 'MeanSure', random: Math.random() }, '', window.location.href);
      window.history.pushState({ target: 'Final', random: Math.random() }, '', window.location.href);
    }
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.target === 'MeanSure') {
        // 此处可调用一些自定义的操作，例如弹窗提示之类的
        window.history.forward();
      }

    }, false);


    document.body.setAttribute('arco-theme', 'light');
  }, []);

  return (
    <div className={styles.container}>
      {/* <div className={styles.logo}>
        <div className={styles['logo-text']}>FreeCar-Admin</div>
      </div> */}
      {/* <div className={styles.banner}>
        <div className={styles['banner-inner']}>
          <LoginBanner />
        </div>
      </div> */}
      <div className={styles.content}>
        <div className={styles['content-inner']}>
          <LoginForm />
        </div>

      </div>
    </div>
  );
}
Login.displayName = 'LoginPage';

export default Login;
