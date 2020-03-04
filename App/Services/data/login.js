import WefiqBaseAPIs from './base-api'
const API = new WefiqBaseAPIs()

export const AuthApi = ({ url, requestPayload, headers = null }) => {
  return API.createAPI({ url, requestPayload, headers })
}
