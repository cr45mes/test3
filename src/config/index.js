const env = import.meta.env.MODE || 'prod'
const EnvConfig = {
  development: {
    baseApi: '/',
    mockApi: 'https://www.fastmock.site/mock/73f156c6cf8edfe0c930d037eb879a3b/api'
  },
  test: {
    baseApi: '//test.futurefe.com/api',
    mockApi: 'https://www.fastmock.site/mock/73f156c6cf8edfe0c930d037eb879a3b/api'
  },
  prod: {
    baseApi: '//futurefe.com/api',
    mockApi: 'https://www.fastmock.site/mock/73f156c6cf8edfe0c930d037eb879a3b/api'
  }
}
export default {
  env,
  mock: true,
  namespace: 'manager',
  ...EnvConfig[env]
}
