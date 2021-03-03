import React, { FC } from 'react';
import classNames from 'classnames';
import { useT, FFormik, validateDomain, validateSchema, FInput, FForm } from '@frontegg/react-core';
import { SSOClaimDomainProceedStep } from './SSOClaimDomainProceedStep';
import { SSOClaimDomainValidateStep } from './SSOClaimDomainValidateStep';
import { useSSOActions, useSSOState } from '@frontegg/react-hooks/auth';

const { Formik } = FFormik;
type SSOClaimDomainFormProps = {
  background?: string;
  className?: string;
};

const prefixT = 'auth.sso.claim-domain.form';
export const SSOClaimDomainForm: FC<SSOClaimDomainFormProps> = (props) => {
  const { t } = useT();
  const { samlConfiguration } = useSSOState(({ samlConfiguration }) => ({ samlConfiguration }));
  const { validateSSODomain, saveSSOConfigurations } = useSSOActions();

  const children = props.children ?? (
    <>
      <div className='fe-sso-claim-domain-form__header'>{t(`${prefixT}.title`)}</div>

      <div className='fe-sso-claim-domain-form__body'>
        <FInput name='domain' placeholder={t(`${prefixT}.enter-your-domain`)} />

        <SSOClaimDomainProceedStep />
        <SSOClaimDomainValidateStep />
      </div>
    </>
  );
  return (
    <div className={classNames('fe-sso-claim-domain-form', props.className)}>
      <Formik
        validationSchema={validateSchema({
          domain: validateDomain(t),
        })}
        validateOnChange
        initialValues={{ domain: samlConfiguration?.domain ?? '' }}
        onSubmit={({ domain }, { setSubmitting }) => {
          const callback = () => setSubmitting(false);
          samlConfiguration?.domain === domain
            ? validateSSODomain({ callback })
            : saveSSOConfigurations({ callback, domain });
        }}
      >
        <FForm>{children}</FForm>
      </Formik>
    </div>
  );
};
