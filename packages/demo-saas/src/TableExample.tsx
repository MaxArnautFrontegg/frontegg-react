import React, { FC, useCallback, useState } from 'react';
import { Elements } from '@frontegg/react-core';
// import { uiLibrary as S } from '@frontegg/react-elements-semantic';
import { uiLibrary as M } from '@frontegg/react-elements-material-ui';
import { TableFilter, TableSort, Input } from '@frontegg/react-core';

// const SE = S as Elements;
// const FE = fronteggElements as Elements;
const ME = M as Elements;

const data = [
  {
    ip: '79.176.23.49',
    user: 'Tillie Casias',
    action: 'Accessed',
    resource: 'Audit',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:15:15.600',
    totalRows: 2250,
    searchText: 'None',
    piiReturned: 'true',
    frontegg_id: 'cc4330b6-5882-4460-a0c1-6941f1d35d86',
  },
  {
    ip: '79.176.23.49',
    user: 'Johnny Lu',
    action: 'Accessed',
    resource: 'Dashboard',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:15:15.462',
    frontegg_id: '777293f9-de88-49c4-b432-e8c853d8e648',
  },
  {
    ip: '72.28.101.231',
    user: 'Florine Pinion',
    action: 'Sanity Check Finished',
    scanId: '30eefef7-859f-4fce-9ba8-8666bc342591',
    service: 'Payments',
    infoLink: 'https://iapp.org/news/a/understanding-data-processors-iso-and-soc-2-credentials-for-gdpr-compliance/',
    resource: 'Cluster',
    severity: 'Attention',
    standard: 'SOC2',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:10.221',
    frontegg_id: 'e1cd9f43-505c-45fe-bd60-f712656235fa',
  },
  {
    ip: '72.92.55.231',
    user: 'Verona Gonzalas',
    action: 'Sanity Check Finished',
    scanId: '9eea13e1-a91f-47be-8378-1c076f121527',
    service: 'Cars',
    infoLink: 'https://iapp.org/news/a/understanding-data-processors-iso-and-soc-2-credentials-for-gdpr-compliance/',
    resource: 'Cluster',
    severity: 'Info',
    standard: 'SOC2',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:10.087',
    frontegg_id: '7545fd29-c010-41ee-8238-bb39526c8f6a',
  },
  {
    ip: '23.92.49.21',
    user: 'Melda Richert',
    action: 'Periodic Scan Finished',
    result: 'Success',
    scanId: '428454cf-faac-49b1-b3c4-d904255da224',
    service: 'Cars',
    resource: 'Service',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:05.124',
    frontegg_id: '62adc639-e701-4095-95a4-27cdbedf59ab',
  },
  {
    ip: '23.92.49.21',
    user: 'Rhoda Blaylock',
    action: 'Periodic Scan Finished',
    result: 'Total Failure',
    scanId: 'c96c6560-af2b-4abe-94d2-c8f2b741f6ea',
    service: 'Cars',
    resource: 'Service',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:05.069',
    frontegg_id: '9b83dc83-204c-433a-97ad-639279cfd5e6',
  },
  {
    ip: '25.44.49.21',
    user: 'Tillie Casias',
    action: 'Settings Modified',
    resource: 'Microservice',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:01.483',
    microservice: 'Payments',
    settingChanged: 'Authentication',
    frontegg_id: '0ecfa8fd-8ca0-4736-bf1a-b2a77bcc0e3e',
  },
  {
    ip: '161.185.160.93',
    user: 'Clement Gallop',
    cause: 'Service Response Lag',
    action: 'Remediated',
    scanId: '50622ae6-9156-4894-bcce-a61a015fa5a1',
    lagTime: '2500ms',
    service: 'Payments',
    resource: 'Service',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:01.482',
    restartTime: '2000ms',
    frontegg_id: '24a9e25f-9ca4-48c0-9c1c-17940bf2b919',
  },
  {
    ip: '161.185.160.93',
    api: 'GET /payments',
    user: 'Kieth Mason',
    action: 'Liveness Check Perfomed',
    result: 'Success',
    scanId: '96212e63-fab9-451e-a8b0-61b6d59ad8e7',
    resource: 'APIs',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:01.481',
    frontegg_id: 'ba814ecd-7186-44b2-ac03-f9591cac3015',
  },
  {
    ip: '25.44.49.21',
    user: 'Kieth Mason',
    action: 'Settings Modified',
    changed: 'Amount of Services',
    cluster: 'Main',
    resource: 'Cluster',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:01.481',
    frontegg_id: '0f488824-c7af-4463-8639-2669a492c2e2',
  },
  {
    ip: '23.92.55.21',
    user: 'Tillie Casias',
    email: 'tilliecasias@example.com',
    action: 'Added',
    resource: 'Users',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:01.480',
    frontegg_id: '92bb449b-ab0a-4f2c-9055-1ea03a7f7d83',
  },
  {
    ip: '23.92.55.231',
    user: 'Ardelia Dismuke',
    action: 'Settings Modified',
    resource: 'Microservice',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:01.478',
    microservice: 'Payments',
    settingChanged: 'Authentication',
    frontegg_id: '8597d041-257d-43ce-b561-cddab37dc2b4',
  },
  {
    ip: '72.28.101.231',
    api: 'POST /products',
    user: 'Marg Lovelace',
    action: 'Liveness Check Perfomed',
    result: 'Success',
    scanId: '25638864-671a-4beb-8df8-22ce0e0b8147',
    resource: 'APIs',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:01.477',
    frontegg_id: '4d1ae8f7-8908-4df2-866b-0d906d14650e',
  },
  {
    ip: '3.92.49.21',
    user: 'Ardelia Dismuke',
    action: 'Lag Detected',
    result: 'Service Response Lag',
    scanId: '8da73d4b-3785-4421-a969-5fb19c7d2988',
    lagTime: '14007ms',
    service: 'Users',
    resource: 'Service',
    severity: 'Error',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:01.476',
    frontegg_id: '6c579ddc-5d11-4220-a0a8-52b63df762e6',
  },
  {
    ip: '35.92.49.21',
    user: 'Iris Basso',
    action: 'Security Audit Perfomed',
    scanId: '3e182f18-a295-4c05-a101-eaa9aa3cb706',
    service: 'Users',
    infoLink: 'https://owasp.org/www-project-top-ten/',
    resource: 'Cluster',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:01.475',
    owaspResult: 'Broken Authentication',
    frontegg_id: 'e65e397d-820d-4bc2-a91b-1b1f462255b2',
  },
  {
    ip: '3.92.49.21',
    user: 'Jennell Fant',
    action: 'Remap',
    changed: 'Amount of Services',
    cluster: 'Main',
    resource: 'Cluster',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:01.475',
    frontegg_id: '44319670-695e-41ee-842e-1672e4ccb7db',
  },
  {
    ip: '72.28.55.231',
    user: 'Verona Gonzalas',
    action: 'Compliance Audit Performed',
    scanId: '375e5feb-e0d8-4c8c-98d2-c06a5862f617',
    service: 'Payments',
    infoLink: 'https://iapp.org/news/a/understanding-data-processors-iso-and-soc-2-credentials-for-gdpr-compliance/',
    resource: 'Cluster',
    severity: 'Attention',
    standard: 'SOC2',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:01.474',
    frontegg_id: 'f4227fd6-3474-4fc2-94ee-5b172365c977',
  },
  {
    ip: '72.92.55.231',
    user: 'Naida Rinker',
    action: 'Security Audit Perfomed',
    scanId: 'c4cd62f4-9d20-4773-bcde-eaba9a6208d9',
    service: 'Users',
    infoLink: 'https://owasp.org/www-project-top-ten/',
    resource: 'Cluster',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:01.473',
    owaspResult: 'Broken Authentication',
    frontegg_id: '4dd797b7-8e52-4a82-a235-b338ce0afb0a',
  },
  {
    ip: '23.92.49.21',
    info: '/insights#scan-id',
    user: 'Florine Pinion',
    action: 'Sanity Check Started',
    failed: '2 Tests',
    scanId: '30eefef7-859f-4fce-9ba8-8666bc342591',
    cluster: 'Main',
    resource: 'Cluster',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:01.472',
    succeeded: '42 Tests',
    testsPerfomed: '44 tests',
    frontegg_id: 'dce52fbf-799a-4a8f-9c17-5ed382df8e52',
  },
  {
    ip: '72.28.55.231',
    user: 'Debora Coddington',
    action: 'Remap',
    changed: 'Security Level',
    cluster: 'Main',
    resource: 'Cluster',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:01.471',
    frontegg_id: 'b9bccc42-e440-4b3f-9dc2-0b54b7c721ae',
  },
  {
    ip: '3.92.49.21',
    user: 'Deanna Post',
    action: 'Remap',
    changed: 'Amount of Services',
    cluster: 'Main',
    resource: 'Cluster',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-29 00:00:01.320',
    frontegg_id: '54e2cfe6-d040-4671-b23e-053c511fbe4f',
  },
  {
    ip: '23.92.55.231',
    user: 'Naida Rinker',
    action: 'Downtime Detected',
    result: 'Total Service Downtime',
    scanId: 'e09e1684-f736-4277-851c-d59809e57d43',
    service: 'Users',
    resource: 'Service',
    severity: 'Error',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-29 00:00:01.319',
    frontegg_id: '58297c84-262a-45df-a054-dc7207a29d3b',
  },
  {
    ip: '72.28.101.231',
    user: 'Herb Mcwain',
    action: 'Cache Purged',
    resource: 'API Gateway',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-29 00:00:01.318',
    cachedItems: 462,
    frontegg_id: '5570deca-2b0b-4779-bab3-d3451e5b3bc0',
  },
  {
    ip: '23.92.55.21',
    user: 'Normand Menz',
    action: 'Compliance Audit Performed',
    scanId: 'b076bb81-74c7-425e-b384-f2f91f5dc60e',
    service: 'Cars',
    infoLink: 'https://iapp.org/news/a/understanding-data-processors-iso-and-soc-2-credentials-for-gdpr-compliance/',
    resource: 'Cluster',
    severity: 'Attention',
    standard: 'HIPAA',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-29 00:00:01.316',
    frontegg_id: '6985ca88-4b59-4abf-a124-980de32f1153',
  },
  {
    ip: '35.92.49.21',
    user: 'Caitlin Hodes',
    action: 'Security Audit Perfomed',
    scanId: '9c44e4d5-9886-484d-9c14-2c81be2dedee',
    service: 'Payments',
    infoLink: 'https://owasp.org/www-project-top-ten/',
    resource: 'Cluster',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-29 00:00:01.315',
    owaspResult: 'Broken Authentication',
    frontegg_id: '489a91f3-37b4-4beb-90d6-5f500a5fef58',
  },
  {
    ip: '3.92.49.21',
    user: 'Valery Krieg',
    action: 'Lag Detected',
    result: 'Service Response Lag',
    scanId: '0db8e45b-94d0-4159-ba98-4f47ad62c3de',
    lagTime: '4021ms',
    service: 'Payments',
    resource: 'Service',
    severity: 'Error',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-29 00:00:01.314',
    frontegg_id: '18e3ccf2-56b4-48ea-b01c-4024158f1989',
  },
  {
    ip: '72.28.101.231',
    user: 'Emelia Modeste',
    email: 'emeliamodeste@example.com',
    action: 'Added',
    resource: 'Users',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-29 00:00:01.312',
    frontegg_id: 'd0bad576-75a0-4f25-96e4-00cf30570485',
  },
  {
    ip: '3.92.49.21',
    info: '/insights#scan-id',
    user: 'Darcie Policastro',
    action: 'Sanity Check Started',
    failed: '2 Tests',
    scanId: 'af7f4742-3ee0-4cdd-9cac-dbbcaf16eb7e',
    cluster: 'Main',
    resource: 'Cluster',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-29 00:00:01.310',
    succeeded: '42 Tests',
    testsPerfomed: '44 tests',
    frontegg_id: 'fab4ecf7-1828-441c-933f-6d8ffb4f44b4',
  },
  {
    ip: '72.28.101.231',
    user: 'Naida Rinker',
    email: 'naidarinker@example.com',
    action: 'Removed',
    resource: 'Users',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-29 00:00:01.308',
    frontegg_id: 'a384b58b-dcc9-4852-89eb-8cbfabc80406',
  },
  {
    ip: '72.92.55.231',
    url: 'https://example.com/hook?services',
    user: 'Geraldo Shupe',
    title: 'Service events',
    action: 'Edited',
    events: 'Service.Added, Service.Deleted',
    resource: 'WebHooks',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-29 00:00:01.307',
    webHookId: '3aa06a19-edf9-4026-b030-dc6e3eb80712',
    frontegg_id: 'ad393229-a2aa-42ec-9bee-2151e56637f5',
  },
  {
    ip: '25.42.49.21',
    user: 'Herb Mcwain',
    action: 'Settings Modified',
    resource: 'Microservice',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-29 00:00:01.305',
    microservice: 'Payments',
    settingChanged: 'Amount of Pods',
    frontegg_id: 'e6d8b14c-de90-45ab-b764-b8aa3e4de1b0',
  },
  {
    ip: '23.92.55.21',
    user: 'Naida Rinker',
    action: 'Sanity Check Finished',
    scanId: '76cd6684-5103-4306-8a14-ca9b9c850183',
    service: 'Users',
    infoLink: 'https://iapp.org/news/a/understanding-data-processors-iso-and-soc-2-credentials-for-gdpr-compliance/',
    resource: 'Cluster',
    severity: 'Info',
    standard: 'HIPAA',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 23:00:10.215',
    frontegg_id: '89201527-644b-4a00-b5a7-30c287117999',
  },
  {
    ip: '25.44.49.21',
    user: 'Marg Lovelace',
    action: 'Sanity Check Finished',
    scanId: 'e1ea57fa-b7bc-41c1-ae5e-bf92b69fb8bf',
    service: 'Payments',
    infoLink: 'https://iapp.org/news/a/understanding-data-processors-iso-and-soc-2-credentials-for-gdpr-compliance/',
    resource: 'Cluster',
    severity: 'Info',
    standard: 'GDPR',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 23:00:10.068',
    frontegg_id: 'b7247cae-f7d2-4cb0-82e4-7c512ce589c6',
  },
  {
    ip: '23.92.49.21',
    user: 'Darcie Policastro',
    action: 'Periodic Scan Finished',
    result: 'Success',
    scanId: 'f4d4ec1d-92c0-4fd4-bf72-0dd3a4d1198b',
    service: 'Cars',
    resource: 'Service',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 23:00:05.264',
    frontegg_id: 'eaa61296-1f55-4939-8f82-5d5bca1046fb',
  },
  {
    ip: '3.92.49.21',
    user: 'Ardelia Dismuke',
    action: 'Periodic Scan Finished',
    result: 'Success',
    scanId: 'ed0358f2-d828-47d8-bc1c-70e667ffa447',
    service: 'Payments',
    resource: 'Service',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 23:00:05.208',
    frontegg_id: 'e93c8137-4c96-45d9-b66e-eb9530c0a543',
  },
  {
    ip: '161.185.160.93',
    user: 'Naida Rinker',
    action: 'Security Audit Perfomed',
    scanId: 'b3a11eea-4e99-4d92-90c5-4852e9b3b2fc',
    service: 'Users',
    infoLink: 'https://owasp.org/www-project-top-ten/',
    resource: 'Cluster',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 23:00:01.237',
    owaspResult: 'Broken Authentication',
    frontegg_id: 'c97a790e-ead6-484e-a3c4-4b43f7ec0e3b',
  },
  {
    ip: '23.92.55.21',
    user: 'Geraldo Shupe',
    action: 'Compliance Audit Performed',
    scanId: '54beb7e8-1150-4721-9f1f-c4af8012907d',
    service: 'Payments',
    infoLink: 'https://iapp.org/news/a/understanding-data-processors-iso-and-soc-2-credentials-for-gdpr-compliance/',
    resource: 'Cluster',
    severity: 'Info',
    standard: 'SOC2',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 23:00:01.236',
    frontegg_id: '89582bd3-cb4a-42fa-88c2-608b77927299',
  },
  {
    ip: '35.92.49.21',
    user: 'Darcie Policastro',
    action: 'Settings Modified',
    resource: 'Microservice',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 23:00:01.236',
    microservice: 'Payments',
    settingChanged: 'Amount of Pods',
    frontegg_id: '4dec5263-22ff-4efa-957c-4dca7ed34751',
  },
  {
    ip: '23.92.55.231',
    info: '/insights#scan-id',
    user: 'Naida Rinker',
    action: 'Sanity Check Started',
    failed: '2 Tests',
    scanId: '76cd6684-5103-4306-8a14-ca9b9c850183',
    cluster: 'Main',
    resource: 'Cluster',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 23:00:01.235',
    succeeded: '42 Tests',
    testsPerfomed: '44 tests',
    frontegg_id: 'a738aec1-2c59-4705-91dd-d50d3da8a8e0',
  },
  {
    ip: '25.44.49.21',
    user: 'Deanna Post',
    action: 'Cache Purged',
    resource: 'API Gateway',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 23:00:01.233',
    cachedItems: 651,
    frontegg_id: '1111c87b-b480-40fe-b38a-6df73e10cff2',
  },
  {
    ip: '25.42.1.21',
    user: 'Verona Gonzalas',
    action: 'Settings Modified',
    changed: 'Amount of Services',
    cluster: 'Main',
    resource: 'Cluster',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 23:00:01.232',
    frontegg_id: '3e2eb99a-898b-4c66-a59c-c2c1bc9a32fb',
  },
  {
    ip: '25.44.49.21',
    api: 'GET /insights/343',
    user: 'Florine Pinion',
    action: 'Liveness Check Perfomed',
    result: 'Total Failure',
    scanId: 'ac004f86-d25e-4e1e-81f0-5d7ef99ebc29',
    resource: 'APIs',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 23:00:01.231',
    frontegg_id: '76bc91af-7f90-4e56-bf4a-ae46abbbc40c',
  },
  {
    ip: '72.28.55.231',
    user: 'Tillie Casias',
    action: 'Settings Modified',
    changed: 'Amount of Services',
    cluster: 'Main',
    resource: 'Cluster',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 23:00:01.230',
    frontegg_id: '7c6aa166-1431-402e-8fb7-3b37e084702e',
  },
  {
    ip: '35.92.49.21',
    user: 'Lenard Chicoine',
    cause: 'Service Response Lag',
    action: 'Remediated',
    scanId: 'e5c21456-4c4f-4983-8b7f-a0f3eeef6566',
    lagTime: '2500ms',
    service: 'Payments',
    resource: 'Service',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 23:00:01.230',
    restartTime: '2000ms',
    frontegg_id: '557eb503-08e1-4c87-88a0-d8e846a50911',
  },
  {
    ip: '161.185.160.93',
    user: 'Normand Menz',
    action: 'Lag Detected',
    result: 'Service Response Lag',
    scanId: '222f3518-9611-4e02-b67d-5390f59601b3',
    lagTime: '7364ms',
    service: 'Payments',
    resource: 'Service',
    severity: 'Error',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 23:00:01.229',
    frontegg_id: '151d664c-094a-48a4-b69e-b036a12237cc',
  },
  {
    ip: '25.42.29.21',
    user: 'Gail Blackerby',
    action: 'Remap',
    changed: 'Amount of Services',
    cluster: 'Main',
    resource: 'Cluster',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 23:00:01.228',
    frontegg_id: '2f5e988d-7e64-4a40-a1f2-0eae475ad431',
  },
  {
    ip: '23.92.49.21',
    user: 'Darcie Policastro',
    action: 'Periodic Scan Started',
    scanId: 'f4d4ec1d-92c0-4fd4-bf72-0dd3a4d1198b',
    service: 'Cars',
    resource: 'Service',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 23:00:01.227',
    frontegg_id: '4f16e7bd-b7ef-412d-9883-ccb5587a512e',
  },
  {
    ip: '23.92.55.21',
    user: 'Ardelia Dismuke',
    action: 'Compliance Audit Performed',
    scanId: '96c08187-927e-48b5-ba95-f9b928e70de8',
    service: 'Users',
    infoLink: 'https://iapp.org/news/a/understanding-data-processors-iso-and-soc-2-credentials-for-gdpr-compliance/',
    resource: 'Cluster',
    severity: 'Attention',
    standard: 'GDPR',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 23:00:01.226',
    frontegg_id: 'c039888a-bedb-4526-92f6-ebea7be67279',
  },
  {
    ip: '3.92.49.21',
    user: 'Ardelia Dismuke',
    action: 'Periodic Scan Started',
    scanId: 'ed0358f2-d828-47d8-bc1c-70e667ffa447',
    service: 'Payments',
    resource: 'Service',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 23:00:01.224',
    frontegg_id: '3a93bf83-330e-47fe-a793-7543a0b76ca9',
  },
  {
    ip: '72.92.55.231',
    user: 'Debora Coddington',
    action: 'Cache Purged',
    resource: 'API Gateway',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 23:00:01.223',
    cachedItems: 924,
    frontegg_id: 'fd4911b1-7e43-4bd7-a952-1c85ea272a9e',
  },
  {
    ip: '25.42.1.21',
    user: 'Lenna Nodine',
    action: 'Remap',
    changed: 'Amount of Services',
    cluster: 'Main',
    resource: 'Cluster',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 23:00:01.223',
    frontegg_id: '2ec15823-9235-42d2-9397-d27745326252',
  },
  {
    ip: '161.185.160.93',
    user: 'Jennell Fant',
    cause: 'Service Response Lag',
    action: 'Remediated',
    scanId: 'b5f97e83-e295-4d2c-957b-ff939a69645c',
    lagTime: '2500ms',
    service: 'Payments',
    resource: 'Service',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 23:00:01.221',
    restartTime: '2000ms',
    frontegg_id: '1432d1f6-a891-4de7-8156-b6cff363b24d',
  },
  {
    ip: '25.42.29.21',
    api: 'GET /payments',
    user: 'Clement Gallop',
    action: 'Liveness Check Perfomed',
    result: 'Success',
    scanId: 'e619125f-52af-42a3-83d0-8f9067286dd4',
    resource: 'APIs',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 23:00:01.216',
    frontegg_id: '2000132d-6e59-4221-abb5-3ca50fff6c33',
  },
  {
    ip: '72.92.55.231',
    user: 'Geraldo Shupe',
    action: 'Settings Modified',
    resource: 'Microservice',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 23:00:00.231',
    microservice: 'Cars',
    settingChanged: 'Amount of Pods',
    frontegg_id: 'e6fb4081-22a5-4f4a-a954-392be36a47c9',
  },
  {
    ip: '72.28.101.231',
    user: 'Kelvin Casella',
    action: 'Lag Detected',
    result: 'Service Response Lag',
    scanId: '806a3362-4b3c-4d66-9347-44c7004f56d5',
    lagTime: '13704ms',
    service: 'Users',
    resource: 'Service',
    severity: 'Error',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 23:00:00.230',
    frontegg_id: 'fb89e859-9261-49c4-9309-2fa729af290a',
  },
  {
    ip: '23.92.55.231',
    info: '/insights#scan-id',
    user: 'Marg Lovelace',
    action: 'Sanity Check Started',
    failed: '2 Tests',
    scanId: 'e1ea57fa-b7bc-41c1-ae5e-bf92b69fb8bf',
    cluster: 'Main',
    resource: 'Cluster',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 23:00:00.228',
    succeeded: '42 Tests',
    testsPerfomed: '44 tests',
    frontegg_id: '95c066eb-666e-457a-9bfb-f269ccd349ed',
  },
  {
    ip: '25.44.49.21',
    user: 'Ardelia Dismuke',
    action: 'Security Audit Perfomed',
    scanId: '493fa109-88c0-4b54-8b08-6184440f385e',
    service: 'Cars',
    infoLink: 'https://owasp.org/www-project-top-ten/',
    resource: 'Cluster',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 23:00:00.163',
    owaspResult: 'Cross-Site Scripting',
    frontegg_id: 'b73fd741-e974-496c-b808-a90f09830dec',
  },
  {
    ip: '23.92.55.21',
    user: 'Clement Gallop',
    action: 'Sanity Check Finished',
    scanId: '42f3286a-f1fa-40d7-a4f7-a5a48e24da63',
    service: 'Cars',
    infoLink: 'https://iapp.org/news/a/understanding-data-processors-iso-and-soc-2-credentials-for-gdpr-compliance/',
    resource: 'Cluster',
    severity: 'Info',
    standard: 'GDPR',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 22:00:10.134',
    frontegg_id: '17210ae9-7288-4b24-aa28-f591d89454e3',
  },
  {
    ip: '25.42.29.21',
    user: 'Valery Krieg',
    action: 'Sanity Check Finished',
    scanId: '853fc3e8-e000-4fb6-9c82-29f19388a423',
    service: 'Users',
    infoLink: 'https://iapp.org/news/a/understanding-data-processors-iso-and-soc-2-credentials-for-gdpr-compliance/',
    resource: 'Cluster',
    severity: 'Info',
    standard: 'HIPAA',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 22:00:10.040',
    frontegg_id: '1dbae207-aedd-4036-b23d-e18066bd7fab',
  },
  {
    ip: '25.42.29.21',
    user: 'Geraldo Shupe',
    action: 'Periodic Scan Finished',
    result: 'Success',
    scanId: '27ffb2c5-dd0e-4e2f-b3fd-e7b7b29d8208',
    service: 'Users',
    resource: 'Service',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 22:00:05.171',
    frontegg_id: '8276babd-0e9f-4472-9cdd-8fc9daa15acc',
  },
  {
    ip: '23.92.49.21',
    user: 'Tillie Casias',
    action: 'Periodic Scan Finished',
    result: 'Success',
    scanId: 'cc484c12-5d8d-4078-b7c4-aefdba52108b',
    service: 'Users',
    resource: 'Service',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 22:00:05.052',
    frontegg_id: '23cb0263-510e-4f75-8631-83ac326e46aa',
  },
  {
    ip: '35.92.49.21',
    user: 'Debora Coddington',
    action: 'Compliance Audit Performed',
    scanId: '632091be-50e0-4894-800e-1e923157160c',
    service: 'Payments',
    infoLink: 'https://iapp.org/news/a/understanding-data-processors-iso-and-soc-2-credentials-for-gdpr-compliance/',
    resource: 'Cluster',
    severity: 'Info',
    standard: 'SOC2',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 22:00:01.504',
    frontegg_id: '44771d00-2524-41b7-a84a-95ba15e1fde6',
  },
  {
    ip: '25.42.29.21',
    user: 'Geraldo Shupe',
    action: 'Periodic Scan Started',
    scanId: '27ffb2c5-dd0e-4e2f-b3fd-e7b7b29d8208',
    service: 'Users',
    resource: 'Service',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 22:00:01.503',
    frontegg_id: 'd2a12db6-9921-4c4a-af35-3193d546f1ea',
  },
  {
    ip: '3.92.49.21',
    user: 'Florine Pinion',
    action: 'Cache Purged',
    resource: 'API Gateway',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 22:00:01.502',
    cachedItems: 210,
    frontegg_id: '36015eb5-624b-45b4-901f-ed6ecea1fa9d',
  },
  {
    ip: '72.28.55.231',
    user: 'Wendi Burghardt',
    action: 'Settings Modified',
    changed: 'Amount of Services',
    cluster: 'Main',
    resource: 'Cluster',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 22:00:01.501',
    frontegg_id: 'be7155a7-990f-468d-a962-a669336032a0',
  },
  {
    ip: '25.44.49.21',
    api: 'POST /products',
    user: 'Herb Mcwain',
    action: 'Liveness Check Perfomed',
    result: '9 issues found',
    scanId: 'a1a6c622-099b-4fc3-a1ae-2e87aa18b4f6',
    resource: 'APIs',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 22:00:01.500',
    frontegg_id: 'e253d2a2-3d81-4766-88d6-7f33fc4a1b25',
  },
  {
    ip: '25.44.49.21',
    user: 'Florine Pinion',
    action: 'Lag Detected',
    result: 'Service Response Lag',
    scanId: 'b9b83865-9315-4a04-8d4e-558ae41d7ed4',
    lagTime: '16707ms',
    service: 'Payments',
    resource: 'Service',
    severity: 'Error',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 22:00:01.500',
    frontegg_id: '63bbfb77-65a7-4c25-9447-96273ee84c2a',
  },
  {
    ip: '25.42.1.21',
    info: '/insights#scan-id',
    user: 'Clement Gallop',
    action: 'Sanity Check Started',
    failed: '2 Tests',
    scanId: '42f3286a-f1fa-40d7-a4f7-a5a48e24da63',
    cluster: 'Main',
    resource: 'Cluster',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 22:00:01.499',
    succeeded: '42 Tests',
    testsPerfomed: '44 tests',
    frontegg_id: '9c56179f-56af-4567-b05e-0c4b85b103b6',
  },
  {
    ip: '23.92.49.21',
    api: 'POST /products',
    user: 'Deanna Post',
    action: 'Liveness Check Perfomed',
    result: 'Total Failure',
    scanId: '622fb278-508d-4404-a0df-26d42c9cdf9d',
    resource: 'APIs',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 22:00:01.498',
    frontegg_id: '23a17fbe-fb65-41b5-9988-1ed5027e8809',
  },
  {
    ip: '25.44.49.21',
    user: 'Kieth Mason',
    action: 'Remap',
    changed: 'Amount of Services',
    cluster: 'Main',
    resource: 'Cluster',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 22:00:01.497',
    frontegg_id: 'd38483b9-64de-43ef-be18-e0b010e04932',
  },
  {
    ip: '72.92.55.231',
    user: 'Geraldo Shupe',
    cause: 'Service Response Lag',
    action: 'Remediated',
    scanId: '77a7c820-5415-400e-a350-afdd31a15ada',
    lagTime: '2500ms',
    service: 'Cars',
    resource: 'Service',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 22:00:01.496',
    restartTime: '2000ms',
    frontegg_id: 'a68f1f78-edd5-41c8-85f9-ab8674f64072',
  },
  {
    ip: '72.28.101.231',
    user: 'Iris Basso',
    action: 'Compliance Audit Performed',
    scanId: 'a994926f-eaca-4363-868a-34f3fe17e37d',
    service: 'Cars',
    infoLink: 'https://iapp.org/news/a/understanding-data-processors-iso-and-soc-2-credentials-for-gdpr-compliance/',
    resource: 'Cluster',
    severity: 'Attention',
    standard: 'SOC2',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 22:00:01.495',
    frontegg_id: 'f7a5bdda-8aed-4468-94fa-239b14507447',
  },
  {
    ip: '23.92.49.21',
    user: 'Deanna Post',
    action: 'Cache Purged',
    resource: 'API Gateway',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 22:00:01.494',
    cachedItems: 135,
    frontegg_id: '722c46de-ec03-4949-ad03-9e4eb926a92e',
  },
  {
    ip: '72.28.55.231',
    user: 'Thomas Salser',
    action: 'Remap',
    changed: 'Amount of Services',
    cluster: 'Main',
    resource: 'Cluster',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 22:00:01.493',
    frontegg_id: 'a0d1c3b4-f8e0-4c79-a405-b38d408f4ed4',
  },
  {
    ip: '23.92.49.21',
    user: 'Tillie Casias',
    action: 'Periodic Scan Started',
    scanId: 'cc484c12-5d8d-4078-b7c4-aefdba52108b',
    service: 'Users',
    resource: 'Service',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 22:00:01.492',
    frontegg_id: '9d22b318-f9e2-467d-80a5-bda4b9e2066e',
  },
  {
    ip: '72.28.101.231',
    user: 'Naida Rinker',
    action: 'Security Audit Perfomed',
    scanId: '1d0bf2c1-9aaa-42ff-9c08-e3aaa85be249',
    service: 'Payments',
    infoLink: 'https://owasp.org/www-project-top-ten/',
    resource: 'Cluster',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 22:00:01.492',
    owaspResult: 'Injection',
    frontegg_id: '7ec9e56e-f79d-4179-9d9a-25d0f8060d02',
  },
  {
    ip: '25.44.49.21',
    user: 'Tillie Casias',
    action: 'Settings Modified',
    resource: 'Microservice',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 22:00:01.491',
    microservice: 'Cars',
    settingChanged: 'Amount of Pods',
    frontegg_id: '5a74d618-19b4-444f-8efa-0d624ea59579',
  },
  {
    ip: '35.92.49.21',
    user: 'Iris Basso',
    cause: 'Service Response Lag',
    action: 'Remediated',
    scanId: 'cc544e0a-8895-4608-b832-07718e461ccf',
    lagTime: '2500ms',
    service: 'Users',
    resource: 'Service',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 22:00:01.490',
    restartTime: '2000ms',
    frontegg_id: 'c48789ae-574a-47a7-84c1-88d722aec057',
  },
  {
    ip: '23.92.55.231',
    user: 'Rena Flanders',
    action: 'Settings Modified',
    resource: 'Microservice',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 22:00:00.306',
    microservice: 'Payments',
    settingChanged: 'Amount of Pods',
    frontegg_id: '86d9c7d5-80c8-40f2-bd24-d090dad05f39',
  },
  {
    ip: '35.92.49.21',
    user: 'Emelia Modeste',
    action: 'Security Audit Perfomed',
    scanId: '8f012caf-3f20-4c34-a21a-78e2bb87ae3b',
    service: 'Cars',
    infoLink: 'https://owasp.org/www-project-top-ten/',
    resource: 'Cluster',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 22:00:00.305',
    owaspResult: 'Injection',
    frontegg_id: 'cf93bcd0-e368-4de4-be9d-6d110464abf6',
  },
];

export const TableExample: FC = () => {
  const [filters, setFilters] = useState<TableFilter[]>([]);
  const [sortBy, setSortBy] = useState<TableSort[]>([]);

  const renderExpandedComponent = useCallback((data) => {
    return <>{JSON.stringify(data, null, 2)}</>;
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h4>Material Table</h4>
      <ME.Table
        columns={[
          {
            accessor: 'user',
            Header: 'User',
            sortable: true,
            Filter: ({ value, setFilterValue }) => {
              return <Input label='Filter by user' value={value} onChange={(e) => setFilterValue(e.target.value)} />;
            },
          },
          {
            accessor: 'createdAt',
            Header: 'Time',
            sortable: true,
            Filter: ({ setFilterValue }) => <div></div>,
          },
          { accessor: 'resource', Header: 'Resource', sortable: true },
          { accessor: 'action', Header: 'Action', sortable: true },
          { accessor: 'severity', Header: 'Severity', sortable: true },
          { accessor: 'ip', Header: 'Ip Address', sortable: true },
        ]}
        data={data}
        totalData={data.length}
        rowKey='frontegg_id'
        pagination='pages'
        pageSize={10}
        pageCount={100}
        // onPageChange={(pageSize, page) => {
        //   console.log(pageSize, page);
        // }}
        expandable
        renderExpandedComponent={renderExpandedComponent}
        selection='multi'
        onRowSelected={(selected) => {
          // console.log(selected);
        }}
        toolbar
        isMultiSort
        // sortBy={sortBy}
        // onSortChange={(_sortBy) => {
        //   setSortBy(_sortBy);
        //   console.log('_sortBy', JSON.stringify(_sortBy, null, 2));
        // }}
        // filters={filters}
        // onFilterChange={(_filters) => {
        //   setFilters(_filters);
        //   console.log('_filters', JSON.stringify(_filters, null, 2));
        // }}
      />
    </div>
  );
};
