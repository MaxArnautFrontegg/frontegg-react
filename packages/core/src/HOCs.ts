import { ComponentType } from 'react';
import { bindActionCreators, Dispatch, connect } from '@frontegg/redux-store/toolkit';
import { withTranslation, WithTranslation } from 'react-i18next';

export type WithT = WithTranslation;
export { withTranslation as withT };

export type UseMapper<S, A> = {
  state: (state: S) => Partial<S>;
  actions: (actions: A) => Partial<A>;
};

export const withPlugin = <S, A>(pluginName: string, defaultMapper: UseMapper<S, A>, pluginActions: A) => {
  const fn = <P extends any>(Component: ComponentType<P>, mapper: UseMapper<S, A>) => {
    const mapStateToProps = (state: any) => mapper.state(state[pluginName]);
    const mapDispatchToProps = (dispatch: Dispatch) =>
      bindActionCreators(mapper.actions(pluginActions) as any, dispatch);
    return connect(mapStateToProps, mapDispatchToProps)(Component as any) as ComponentType<
      Omit<P, keyof (ReturnType<typeof mapper.state> & ReturnType<typeof mapper.actions>)>
    >;
  };
  Object.defineProperty(fn, 'name', {
    value: `with${pluginName.substring(0, 1).toUpperCase()}${pluginName.substring(1)}`,
  });
  return fn;
};

export { connect };
