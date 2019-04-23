import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { Login, getFakeCaptcha } from '@/services/user';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import storage from '@/utils/storage';
export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(Login, payload);
      if (!response.data) {
        return;
      }
      // 本地持久化 sessionID
      storage.set('token', response.data);
      yield put(routerRedux.replace('/'));
    },

    *logout(_, { put }) {
      yield put(routerRedux.replace('/user/login'));
      /*yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      // redirect
      if (window.location.pathname !== '/user/login') {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }*/
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
