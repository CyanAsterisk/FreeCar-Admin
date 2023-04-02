import React, { useEffect } from 'react';
import LoginForm from './form';
import LoginBanner from './banner';
import styles from './style/index.module.less';
function Login() {
  useEffect(() => {
    document.body.setAttribute('arco-theme', 'light');
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <div className={styles['logo-text']}>FreeCar-Admin</div>
      </div>
      <div className={styles.banner}>
        <div className={styles['banner-inner']}>
          <LoginBanner />
        </div>
      </div>
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
