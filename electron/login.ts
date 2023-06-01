const ROAClient = require('@alicloud/pop-core').ROAClient

export const client = new ROAClient({
  // Please ensure that the environment variables ALIBABA_CLOUD_ACCESS_KEY_ID and ALIBABA_CLOUD_ACCESS_KEY_SECRET are set.
  accessKeyId: 'LTAI5tBwZQX8pavmCLTLgDbc',
  accessKeySecret: 'K7ol3wDSOOHXMrIR9R4g3FNLlyoBuL',
  // securityToken: process.env['ALIBABA_CLOUD_SECURITY_TOKEN'], // use STS Token
  endpoint: 'https://devops.cn-hangzhou.aliyuncs.com',
  apiVersion: '2021-06-25',
})
