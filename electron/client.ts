/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import type ClientType from '@alicloud/devops20210625'

const { default: Devops20210625 } = require('@alicloud/devops20210625')
const { Config } = require('@alicloud/openapi-client')
const { RuntimeOptions } = require('@alicloud/tea-util')

const config = new Config({
  // 您的AccessKey ID
  accessKeyId: import.meta.env.VITE_ACCESSKEY_ID,
  // 您的AccessKey Secret
  accessKeySecret: import.meta.env.VITE_ACCESSKEY_SECRET,
  // 访问的区域
  regionId: import.meta.env.VITE_REGION_ID,
})
config.endpoint = import.meta.env.VITE_ENDPOINT
export const client: ClientType = new Devops20210625(config)
export const runtime = new RuntimeOptions({})
