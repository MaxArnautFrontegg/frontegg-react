import { PayloadAction } from '@reduxjs/toolkit';
import { put, select, takeEvery } from 'redux-saga/effects';
import { api, IDisableMfa, ILoginWithMfa, IVerifyMfa } from '@frontegg/rest-api';
import { actions } from '../reducer';
import { MFAState, MFAStep } from './interfaces';
import { WithCallback } from '../../interfaces';
import { delay } from '../utils';
import { userDemo } from '../dummy';
import { call } from '../../toolkit';
import { afterAuthNavigation } from '../LoginState/saga';

function* enrollMfa() {
  yield put(actions.setMfaState({ loading: true }));
  try {
    const { qrCode } = yield call(api.auth.enrollMfa);
    yield put(actions.setMfaState({ loading: false, error: undefined, qrCode }));
  } catch (e) {
    yield put(actions.setMfaState({ loading: false, error: e.message }));
  }
}

function* verifyMfa({
  payload: { callback, ...payload },
}: PayloadAction<WithCallback<IVerifyMfa, string | undefined>>) {
  yield put(actions.setMfaState({ loading: true }));
  try {
    const user = yield select((state) => state.auth.user);
    const data = yield call(api.auth.verifyMfa, payload);

    const mfaState: MFAState = {
      step: MFAStep.recoveryCode,
      loading: false,
      error: undefined,
    };
    if (data?.recoveryCode) {
      mfaState.recoveryCode = data.recoveryCode;
    }
    yield put(actions.setMfaState(mfaState));
    yield put(actions.setUser({ ...user, mfaEnrolled: true }));
    callback?.(mfaState.recoveryCode);
  } catch (e) {
    yield put(actions.setMfaState({ loading: false, error: e.message }));
    callback?.(null, e);
  }
}

function* verifyMfaAfterForce({
  payload: { callback, ...payload },
}: PayloadAction<WithCallback<ILoginWithMfa, string | undefined>>) {
  yield put(actions.setMfaState({ loading: true }));
  try {
    const user = yield call(api.auth.loginWithMfa, payload);

    const mfaState: MFAState = {
      step: MFAStep.recoveryCode,
      loading: false,
      error: undefined,
    };
    if (user?.recoveryCode) {
      mfaState.recoveryCode = user.recoveryCode;
    }
    yield put(actions.setMfaState(mfaState));
    yield put(actions.setState({ user }));
    yield put(actions.loadTenants());
    callback?.(mfaState.recoveryCode);
  } catch (e) {
    yield put(actions.setMfaState({ loading: false, error: e.message }));
    callback?.(null, e);
  }
}

function* disableMfa({ payload }: PayloadAction<WithCallback<IDisableMfa>>) {
  yield put(actions.setMfaState({ loading: true }));
  try {
    const user = yield select((state) => state.auth.user);
    yield api.auth.disableMfa(payload);
    yield put(actions.setMfaState({ loading: false, error: undefined }));
    yield put(actions.setUser({ ...user, mfaEnrolled: false }));
    payload.callback?.(true);
  } catch (e) {
    yield put(actions.setMfaState({ loading: false, error: e.message }));
    payload.callback?.(false, e);
  }
}

export function* mfaSagas() {
  yield takeEvery(actions.enrollMfa, enrollMfa);
  yield takeEvery(actions.verifyMfa, verifyMfa);
  yield takeEvery(actions.disableMfa, disableMfa);
  yield takeEvery(actions.verifyMfaAfterForce, verifyMfaAfterForce);
}

/*********************************
 *  Preview Sagas
 *********************************/

function* enrollMfaMock() {
  yield put(actions.setMfaState({ loading: true }));
  const qrCode = 'test';
  yield put(actions.setMfaState({ loading: false, error: undefined, qrCode }));
}

function* verifyMfaMock({
  payload: { callback, ...payload },
}: PayloadAction<WithCallback<IVerifyMfa, string | undefined>>) {
  yield put(actions.setMfaState({ loading: true }));
  yield delay();
  const data = { token: 'token', recoveryCode: 'recoveryCode' };
  const mfaState: MFAState = {
    step: MFAStep.recoveryCode,
    loading: false,
    error: undefined,
  };
  if (data?.recoveryCode) {
    mfaState.recoveryCode = data.recoveryCode;
  }
  yield put(actions.setMfaState(mfaState));
  yield put(actions.setUser({ ...userDemo, mfaEnrolled: true }));
  callback?.(mfaState.recoveryCode);
}

function* verifyMfaAfterForceMock({
  payload: { callback, ...payload },
}: PayloadAction<WithCallback<ILoginWithMfa, string | undefined>>) {
  yield put(actions.setMfaState({ loading: true }));
  yield delay();
  const data = { ...payload, recoveryCode: 'recoveryCode' };

  const mfaState: MFAState = {
    step: MFAStep.recoveryCode,
    loading: false,
    error: undefined,
  };
  if (data?.recoveryCode) {
    mfaState.recoveryCode = data.recoveryCode;
  }
  yield put(actions.setMfaState(mfaState));
  yield delay();
  yield put(actions.setUser({ ...userDemo, mfaEnrolled: true }));
  callback?.(mfaState.recoveryCode);
}

function* disableMfaMock({ payload }: PayloadAction<WithCallback<IDisableMfa>>) {
  yield put(actions.setMfaState({ loading: true }));
  yield delay();
  yield put(actions.setMfaState({ loading: false, error: undefined }));
  yield put(actions.setUser({ ...userDemo, mfaEnrolled: false }));
  payload.callback?.(true);
}

export function* mfaSagasMock() {
  yield takeEvery(actions.enrollMfa, enrollMfaMock);
  yield takeEvery(actions.verifyMfa, verifyMfaMock);
  yield takeEvery(actions.disableMfa, disableMfaMock);
  yield takeEvery(actions.verifyMfaAfterForce, verifyMfaAfterForceMock);
}