import React from 'react';
import { PageProps, useT } from '@frontegg/react-core';
import { MFA } from '../../MFA';

export const ProfileMfaPage: PageProps = () => {
  const { t } = useT();
  return (
    <div className='fe-profile-mfa-page'>
      <div className='fe-section-title fe-bold'>{t('auth.mfa.two-factor')}</div>
      <MFA.Layout />
    </div>
  );
};

ProfileMfaPage.Title = () => useT().t('auth.mfa.title');
ProfileMfaPage.route = '/mfa';
