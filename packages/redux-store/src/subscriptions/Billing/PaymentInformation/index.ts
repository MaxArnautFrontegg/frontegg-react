import { createModuleCaseReducers } from '../../utils';
import { createAction, createSlice } from '@reduxjs/toolkit';
import { subscriptionsStoreName } from '../../../constants';
import { PaymentInformationState } from './interfaces';

const initialPaymentInformation: PaymentInformationState = {
  loading: false,
  error: null,
};

const reducers = {
  ...createModuleCaseReducers<PaymentInformationState>(),
};

const { reducer, actions: paymentInformationActions, name } = createSlice({
  name: `${subscriptionsStoreName}/billing/paymentInformation`,
  initialState: initialPaymentInformation,
  reducers,
});

const actions = {
  loadPaymentInformation: createAction(`${name}/loadPaymentInformation`),
  ...paymentInformationActions,
};

export { reducer as paymentInformationReducer, actions as paymentInformationActions };