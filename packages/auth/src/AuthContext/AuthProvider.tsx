import React from 'react';
import createSagaMiddleware, { Task } from 'redux-saga';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { AuthProviderProps, authRootSaga, authInitialState, AuthProviderState, reducer } from '../Api';
import AuthStateConnector from './AuthStateConnector';
import { Provider as ReduxProvider } from 'react-redux';
import { Router } from 'react-router';
import { RedirectOptions } from './AuthContext';

// @ts-ignore
const devTools = process.env.NODE_ENV === 'development';
const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), sagaMiddleware];

export class AuthProvider extends React.Component<AuthProviderProps> {
  static defaultProps = {
    injectRoutes: true,
  };
  store: any;
  task: Task;

  constructor(props: AuthProviderProps) {
    super(props);
    const { context, routes } = this.props;
    const preloadedState: AuthProviderState = { ...authInitialState, context, ...routes };
    this.store = configureStore({ reducer, preloadedState, middleware, devTools });

    this.task = sagaMiddleware.run(authRootSaga);

  }

  onRedirectTo = (path: string, opts?: RedirectOptions) => {
    const { history } = this.props;

    if (opts?.refresh) {
      window.location.href = path;
      return;
    }
    if (opts?.replace) {
      history.replace(path);
    } else {
      history.push(path);
    }
  };

  render() {
    const { children, history } = this.props;
    return <Router history={history as any}>
      <ReduxProvider store={this.store}>
        <AuthStateConnector onRedirectTo={this.onRedirectTo}>
          {children}
        </AuthStateConnector>
      </ReduxProvider>
    </Router>;
  }
}
