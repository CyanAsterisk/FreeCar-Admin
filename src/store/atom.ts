import defaultSettings from '../settings.json';
import { atom } from 'recoil';
export interface GlobalState {
  settings?: typeof defaultSettings;
  userInfo?: {
    id?: string;
    account?: string;
    level?: string;
    name?: string;
    avatar?: string;
    superior?: string;
    permissions?: Record<string, string[]>;
  };
  userLoading?: boolean;
}

const initialState: GlobalState = {
  settings: defaultSettings,
  userInfo: {
    permissions: {},
  },
};

export const globalState = atom({
  key: 'globalState',
  default: initialState,
});

/*
 以下全局状态用于recoil（穆哥）
*/
//使用recoil保存按钮状态是否展示
export const diffState = atom({
  key: 'diffState',
  default: {
    passVisible: true,
    relieveVisible: false,
  },
});

export const FilterState = atom({
  key: 'FilterState',
  default: '2',
});



//关于可解除绑定和不可解除绑定的标记
export const isRelieve = atom({
  key: 'isRelieve',
  default: true,
});

export const selectRowKey = atom<React.Key[]>({
  key: 'selectRowKey',
  default: [],
});

export const reGetData = atom({
  key: 'reGetData',
  default: true,
});
