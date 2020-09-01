import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LoginPage, LogoutPage } from '../Login';
// import { ActivatePage } from './Activate';
// import { ForgotPasswordPage, ResetPasswordPage } from './ForgotPassword';
// import { AuthContext } from './AuthContext';
// import { AuthPageProps } from './interfaces';
import { AuthPageProps } from '../interfaces';
import { AuthState } from '../Api';
import { withAuth } from '../HOCs';
import { AuthMapper } from '../helpers';
import { ForgotPasswordPage } from '../ForgotPassword';


const stateMapper = ({ routes, isLoading, header, loaderComponent }: AuthState) => ({ routes, isLoading, defaultComps: { header, loaderComponent } });

class DefaultAuthRoutes extends React.Component<AuthPageProps & ReturnType<typeof stateMapper>> {
  render() {
    const {
      routes: {
        loginUrl,
        logoutUrl,
        forgetPasswordUrl,
      },
      isLoading,
      header,
      loaderComponent,
      defaultComps,
      children, ...rest
    } = this.props;

    const pageProps = {
      ...rest,
      ...defaultComps,
      ...(header !== undefined ? { header } : {}),
      ...(loaderComponent !== undefined ? { loaderComponent } : {}),
    };
    return <Switch>
      <Route exact path={loginUrl} render={() => <LoginPage {...pageProps}/>}/>
      <Route exact path={logoutUrl} render={() => <LogoutPage {...pageProps}/>}/>
      {/*<Route exact path={this.context!.activateUrl} render={() => <ActivatePage {...pageProps}/>}/>*/}
      <Route exact path={forgetPasswordUrl} render={() => <ForgotPasswordPage {...pageProps}/>}/>
      {/*<Route exact path={this.context!.resetPasswordUrl} render={() => <ResetPasswordPage {...pageProps}/>}/>*/}
      <Route path='*' children={() => pageProps.loaderComponent && isLoading ? pageProps.loaderComponent : children}/>
    </Switch>;
  }
}

export default withAuth(DefaultAuthRoutes, stateMapper);
