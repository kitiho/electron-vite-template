const redirect_uri = 'http://localhost/callback'
const client_id = '4793998085611361432'
const accessToken = null
const profile = null
const refreshToken = null
function getAccessToken() {
  return accessToken
}

function getProfile() {
  return profile
}
function getAuthenticationURL() {
  return (
    'https://signin.aliyun.com/oauth2/v1/auth?' + `client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`
  )
}

export {
  getAccessToken,
  getAuthenticationURL,
  getProfile,
  redirect_uri,
  client_id,
  accessToken,
  profile,
  refreshToken,
}
