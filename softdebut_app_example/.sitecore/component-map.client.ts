// Client-safe component map for App Router

import { BYOCClientWrapper, NextjsContentSdkComponent, FEaaSClientWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

import * as Title from 'src/components/Title';
import * as RichText from 'src/components/RichText';
import * as PageContent from 'src/components/PageContent';
import * as Hero from 'src/components/Hero';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCClientWrapper],
  ['FEaaSWrapper', FEaaSClientWrapper],
  ['Form', Form],
  ['Title', { ...Title }],
  ['RichText', { ...RichText }],
  ['PageContent', { ...PageContent }],
  ['Hero', { ...Hero }],
]);

export default componentMap;
