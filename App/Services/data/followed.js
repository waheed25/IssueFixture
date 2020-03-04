import { buildURL } from '../../Utils'
import { AsyncStorage } from 'react-native'
import WefiqBaseAPI from './base-api'
const api = new WefiqBaseAPI()
export const fetchFollowed = async(params, userId) => {
  const url = buildURL({ api: `wefiq/follow/${userId}/followees?`, params })
  let headers
  const userInfo = await AsyncStorage.getItem('loginCredentials')
  if (userInfo !== null) {
    const token = JSON.parse(userInfo)
    headers = {
      // 'content-type': 'application/vnd.api+json',
      Authorization: `Bearer ${token.data.attributes.token}`
    }
  }
  const resp = await api.getAPI({url, headers})
  return ({resDataArray: resp.normData, count: resp.count})
}
