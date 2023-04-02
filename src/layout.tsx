import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Spin } from '@arco-design/web-react';
import cs from 'classnames';
import { IconMenuFold, IconMenuUnfold } from '@arco-design/web-react/icon';
// import { useSelector } from 'react-redux';
import qs from 'query-string';
import NProgress from 'nprogress';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import useRoute from '@/routes';
import { isArray } from './utils/is';
import useLocale from './utils/useLocale';
import getUrlParams from './utils/getUrlParams';
import lazyload from './utils/lazyload';
import { globalState } from './store/atom';
import styles from './style/layout.module.less';
import { useRecoilState } from 'recoil';
import Exception403 from '@/pages/exception/403';
import type { IRoute } from './routes';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const Sider = Layout.Sider;
const Content = Layout.Content;

function getIcon(route: IRoute): JSX.Element {
  if (route.icon) {
    return <route.icon className={styles.icon} />;
  }
  return <div className={styles['icon-empty']} />;
}

function getFlattenRoutes(routes: IRoute[]) {
  const mod = import.meta.glob('./pages/**/[a-z[]*.tsx');
  const res = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function travel(_routes: any[]) {
    _routes.forEach((route) => {
      const visibleChildren = (route.children || []).filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (child: { hideInMenu: any }) => !child.hideInMenu
      );
      if (route.key && (!route.children || !visibleChildren.length)) {
        try {
          if (route.key.includes('/:')) {
            route.component = lazyload(
              mod[`./pages/${route.key.split('/:')[0]}/index.tsx`]
            );
          } else {
            route.component = lazyload(mod[`./pages/${route.key}/index.tsx`]);
          }
          res.push(route);
        } catch (e) {
          //console.log(route.key);
          console.error(e);
        }
      }
      if (isArray(route.children) && route.children.length) {
        travel(route.children);
      }
    });
  }
  travel(routes);

  return res;
}

function PageLayout() {
  const urlParams = getUrlParams();
  const history = useLocation();
  const navigate = useNavigate();
  const pathname = history.pathname;
  const currentComponent = qs.parseUrl(pathname).url.slice(1);
  const locale = useLocale();
  const global = useRecoilState(globalState);
  const settings = global[0].settings;
  const userInfo = global[0].userInfo;
  const userLoading = global[0].userLoading;
  const [routes, defaultRoute] = useRoute(userInfo?.permissions);
 //  console.log(routes);
  const defaultSelectedKeys = [currentComponent || defaultRoute];
  const paths = (currentComponent || defaultRoute).split('/');
  const defaultOpenKeys = paths.slice(0, paths.length - 1);

  const [breadcrumb, setBreadCrumb] = useState([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] =
    useState<string[]>(defaultSelectedKeys);
  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys);

  const routeMap = useRef<Map<string, React.ReactNode[]>>(new Map());
  const navbarHeight = 60;
  const menuWidth = collapsed ? 48 : 220;
  const showNavbar = settings.navbar && urlParams.navbar !== false;
  const showMenu = settings.menu && urlParams.menu !== false;
  const showFooter = settings.footer && urlParams.footer !== false;

  const flattenRoutes = useMemo(() => getFlattenRoutes(routes) || [], [routes]);
  // console.log('flattenRoutes', flattenRoutes);

  function onClickMenuItem(key: string) {
    const currentRoute = flattenRoutes.find((r) => r.key === key);
    // console.log(currentRoute);

    const component = currentRoute.component;
    const preload = component.preload();
    NProgress.start();
    preload.then(() => {
      setSelectedKeys([key]);
      navigate(currentRoute.path ? currentRoute.path : `/${key}`);
      NProgress.done();
    });
  }

  function toggleCollapse() {
    setCollapsed((collapsed) => !collapsed);
  }

  const paddingLeft = showMenu ? { paddingLeft: menuWidth } : {};
  const paddingTop = showNavbar ? { paddingTop: navbarHeight } : {};
  const paddingStyle = { ...paddingLeft, ...paddingTop };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function renderRoutes(locale: { [x: string]: any }) {
    routeMap.current.clear();
    return function travel(_routes: IRoute[], level: number, parentNode = []) {
      return _routes.map((route) => {
        const { breadcrumb = true, hideInMenu } = route;
        const iconDom = getIcon(route);
        const titleDom = (
          <>
            {iconDom} {locale[route.name] || route.name}
          </>
        );
        routeMap.current.set(
          `/${route.key}`,
          breadcrumb ? [...parentNode, route.name] : []
        );
        const visibleChildren = (route.children || []).filter((child) => {
          const { hideInMenu, breadcrumb = true } = child;
          if (hideInMenu || route.hideInMenu) {
            routeMap.current.set(
              `/${child.key}`,
              breadcrumb ? [...parentNode, route.name, child.name] : []
            );
          }
          return !hideInMenu;
        });
        // console.log(visibleChildren);
        if (hideInMenu) {
          return [];
        }
        if (visibleChildren.length) {
          return (
            <SubMenu key={route.key} title={titleDom}>
              {travel(visibleChildren, level + 1, [...parentNode, route.name])}
            </SubMenu>
          );
        }
        return (
          <MenuItem key={route.key}>
            <Link to={`/${route.key}`}>{titleDom}</Link>
          </MenuItem>
        );
      });
    };
  }

  useEffect(() => {
    const routeConfig = routeMap.current.get(pathname);
    setBreadCrumb(routeConfig || []);
  }, [pathname]);

  return (
    <Layout className={styles.layout}>
      <div
        className={cs(styles['layout-navbar'], {
          [styles['layout-navbar-hidden']]: !showNavbar,
        })}
      >
        <Navbar show={showNavbar} />
      </div>
      {userLoading ? (
        <Spin className={styles['spin']} />
      ) : (
        <Layout>
          {showMenu && (
            <Sider
              className={styles['layout-sider']}
              width={menuWidth}
              collapsed={collapsed}
              onCollapse={setCollapsed}
              trigger={null}
              collapsible
              breakpoint="xl"
              style={paddingTop}
            >
              <div className={styles['menu-wrapper']}>
                <Menu
                  collapse={collapsed}
                  onClickMenuItem={onClickMenuItem}
                  selectedKeys={selectedKeys}
                  openKeys={openKeys}
                  onClickSubMenu={(_, openKeys) => {
                    setOpenKeys(openKeys);
                  }}
                >
                  {renderRoutes(locale)(routes, 1)}
                </Menu>
              </div>
              <div className={styles['collapse-btn']} onClick={toggleCollapse}>
                {collapsed ? <IconMenuUnfold /> : <IconMenuFold />}
              </div>
            </Sider>
          )}
          <Layout className={styles['layout-content']} style={paddingStyle}>
            <div className={styles['layout-content-wrapper']}>
              {!!breadcrumb.length && (
                <div className={styles['layout-breadcrumb']}>
                  <Breadcrumb>
                    {breadcrumb.map((node, index) => (
                      <Breadcrumb.Item key={index}>
                        {typeof node === 'string' ? locale[node] || node : node}
                      </Breadcrumb.Item>
                    ))}
                  </Breadcrumb>
                </div>
              )}
              <Content>
                <Routes>
                  {flattenRoutes.map((route, index) => {
                    return (
                      <Route
                        key={index}
                        path={`/${route.key}`}
                        element={<route.component />}
                      />
                    );
                  })}
                  <Route
                    path="/"
                    element={<Navigate to={`/${defaultRoute}`} replace />}
                  />
                  <Route path="*" element={<Exception403 />} />
                </Routes>
              </Content>
            </div>
            {showFooter && <Footer />}
          </Layout>
        </Layout>
      )}
    </Layout>
  );
}

export default PageLayout;
