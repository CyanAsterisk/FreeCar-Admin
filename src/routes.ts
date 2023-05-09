import auth, { AuthParams } from '@/utils/authentication';
import { useEffect, useMemo, useState } from 'react';
import {
  IconSettings,
  IconUser,
  IconTags,
  IconIdcard,
  IconPen,
  IconList,
  IconUndo,
  IconApps,
  IconBook,
  IconCommand 
} from '@arco-design/web-react/icon'
import type { IconProps } from '@arco-design/web-react/icon';

export type IRoute = AuthParams & {
  name: string;
  key: string;
  breadcrumb?: boolean;
  children?: IRoute[];
  hideInMenu?: boolean; // 是否在菜单中隐藏子路由，为了实现某些三级路由不展示在菜单中的需求
  icon?: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<unknown>
  >;
};

export const routes: IRoute[] = [
  {
    name: 'User',
    key: 'user',
    icon: IconUser
  },
  {
    name: 'Car',
    key: 'car',
    icon: IconTags
  },
  {
    name: 'Profile',
    key: 'profile',
    icon: IconIdcard,
    children: [

      {
        name: "Profile List",
        key: 'profile/list',
        icon: IconList
      },
      {
        name: 'Check',
        key: 'profile/check',
        icon: IconPen,
        //hideInMenu:true
      },
    ]
  },
  {
    name: 'visualization',
    key: 'visualization',
    icon: IconApps,
    children: [

      {
        name: "Analysis",
        key: 'visualization/data-analysis',
        icon: IconBook
      },
      {
        name: 'Multi Data Analysis',
        key: 'visualization/multi-dimension-data-analysis',
        icon: IconCommand,
        //hideInMenu:true
      },
    ]
  },
  {
    name: "Trip",
    key: 'trip',
    icon: IconUndo
  },
  {
    name: "Admin",
    key: 'admin',
    icon: IconSettings
  }
];

export const getName = (path: string, routes) => {
  return routes.find((item) => {
    const itemPath = `/${item.key}`;
    if (path === itemPath) {
      return item.name;
    } else if (item.children) {
      return getName(path, item.children);
    }
  });
};

export const generatePermission = (level: string) => {
  const actions = level === '3' ? [] : ['*'];
  const result = {};
  routes.forEach((item) => {
    if (item.children) {
      item.children.forEach((child) => {
        result[child.name] = actions;
      });
    }
  });
  return result;
};

const useRoute = (userPermission): [IRoute[], string] => {
  const filterRoute = (routes: IRoute[], arr = []): IRoute[] => {
    if (!routes.length) {
      return [];
    }
    for (const route of routes) {
      const { requiredPermissions, oneOfPerm } = route;

      let visible = true;
      if (requiredPermissions) {
        visible = auth({ requiredPermissions, oneOfPerm }, userPermission);
      }

      if (!visible) {
        continue;
      }
      if (route.children && route.children.length) {
        const newRoute = { ...route, children: [] };
        filterRoute(route.children, newRoute.children);
        if (newRoute.children.length) {
          arr.push(newRoute);
        }
      } else {
        arr.push({ ...route });
      }
    }

    return arr;
  };

  const [permissionRoute, setPermissionRoute] = useState(routes);

  useEffect(() => {
    const newRoutes = filterRoute(routes);
    setPermissionRoute(newRoutes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPermission]);

  const defaultRoute = useMemo(() => {
    const first = permissionRoute[0];
    if (first) {
      const firstRoute = first?.children?.[0]?.key || first.key;
      return firstRoute;
    }
    return '';
  }, [permissionRoute]);

  return [permissionRoute, defaultRoute];
};

export default useRoute;
