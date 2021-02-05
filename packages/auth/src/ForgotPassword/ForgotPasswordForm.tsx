import React, { ComponentType, createElement, FC } from 'react';
import {
  useT,
  validateEmail,
  validateSchema,
  ErrorMessage,
  FForm,
  FInput,
  FButton,
  FFormik,
} from '@frontegg/react-core';
import { useForgotPasswordState } from './hooks';

const { Formik } = FFormik;

type ForgotPasswordFormRendererProps = Omit<ForgotPasswordFormProps, 'renderer'>;

export interface ForgotPasswordFormProps {
  renderer?: ComponentType<ForgotPasswordFormRendererProps>;
}

export const ForgotPasswordForm: FC<ForgotPasswordFormProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();
  const { loading, email, error, forgotPassword } = useForgotPasswordState();
  if (renderer) {
    return createElement(renderer, props);
  }
  return (
    <Formik
      initialValues={{ email }}
      validationSchema={validateSchema({ email: validateEmail(t) })}
      isInitialValid={validateEmail(t).isValidSync(email)}
      onSubmit={async ({ email }) => forgotPassword({ email })}
    >
      <FForm>
        <FInput
          defaultValue={email}
          name='email'
          placeholder='name@example.com'
          label={t('auth.forgot-password.email-label')}
          data-test-id='email-box'
        />
        <FButton
          type='submit'
          formikDisableIfNotDirty={false}
          variant='primary'
          loading={loading}
          data-test-id='submit-btn'
        >
          {t('auth.forgot-password.remind-me')}
        </FButton>
        <ErrorMessage error={error} />
      </FForm>
    </Formik>
  );
};
