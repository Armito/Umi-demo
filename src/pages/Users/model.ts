/*
 * @Author: Armito
 * @Date: 2022-01-09 14:31:13
 * @LastEditTime: 2022-01-09 15:57:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \umi-demo\src\pages\Users\model.ts
 */
import { Effect, Reducer, Subscription } from 'umi';
import { queryUsers } from './service';

export interface UsersModelType {
  namespace: 'users';
  state: any;
  effects: {
    queryUsers: Effect;
  };
  reducers: {
    getUsers: Reducer;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const UsersModel: UsersModelType = {
  namespace: 'users',

  state: {},

  effects: {
    *queryUsers(action, { call, put }) {
      const res = yield call(queryUsers);
      yield put({
        type: 'getUsers',
        payload: res,
      });
    },
  },

  reducers: {
    getUsers: (state, { payload }) => {
      return payload;
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/users') {
          dispatch({
            type: 'queryUsers',
          });
        }
      });
    },
  },
};

export default UsersModel;
