import React from 'react';
import { Carousel } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import styles from './style/index.module.less';
import swiper1 from '@/assets/swiper1.jpg'
import swiper2 from '@/assets/swiper2.jpg'
import swiper3 from '@/assets/swiper3.jpg'

export default function LoginBanner() {
  const t = useLocale(locale);
  
  const data = [
    {
      slogan: t['login.banner.slogan1'],
      subSlogan: t['login.banner.subSlogan1'],
      image: swiper1,
    },
    {
      slogan: t['login.banner.slogan1'],
      subSlogan: t['login.banner.subSlogan1'],
      image: swiper2,
    },
    {
      slogan: t['login.banner.slogan1'],
      subSlogan: t['login.banner.subSlogan1'],
      image: swiper3,
    },
  ];
  return (
    <Carousel className={styles.carousel} animation="fade">
      {data.map((item, index) => (
        <div key={`${index}`}>
          <div className={styles['carousel-item']}>
            {/* <div className={styles['carousel-title']}>{item.slogan}</div>
            <div className={styles['carousel-sub-title']}>{item.subSlogan}</div> */}
            <img
              alt="banner-image"
              className={styles['carousel-image']}
              src={item.image}
            />
          </div>
        </div>
      ))}
    </Carousel>
  );
}
