import WefiqBaseAPIs from './base-api'
import * as _ from 'underscore'
import { buildURL } from '../../Utils/buildURL'
import { AsyncStorage } from 'react-native'
export default class BaseService extends WefiqBaseAPIs {
    // Returns serealized data
  get (url) {
    return new Promise((resolve, reject) => {
      this.getAPI(url).then(document => {
        const models = this.serializeByModel('creation', document.normData)
        return resolve({models, count: document.count})
      }, error => {
        return reject(error)
      })
    })
  }

  create (url) {
    return new Promise((resolve, reject) => {
      this.getAPI(url).then(document => {
        return resolve(document)
      }, error => {
        return reject(error)
      })
    })
  }
}
const api = new BaseService()

export const fetchCreationService = async(params, apiType) => {
  const url = buildURL({ api: apiType, params })

  // const appAuthState = AppState().store.auth()
  // console.log('Apps state', appAuthState)
  var headers
  const userInfo = await AsyncStorage.getItem('loginCredentials')
  if (userInfo !== null) {
    const token = JSON.parse(userInfo)
    headers = {
      // 'content-type': 'application/vnd.api+json',
      Authorization: `Bearer ${token.data.attributes.token}`
    }
  }
  const resp = await api.getAPI({url, headers})
  // const models = api.serializeByModel('profileGeneral', resp.normData)
  // const resData = models.creation || models.user
  // const resDataArray = models.creation ? Object.keys(resData).map(i => resData[i]) : []
  return { resDataArray: resp.normData, count: resp.count }
}
export const fetchSingleCreation = async(uuid) => {
  const url = `/wefiq/creation/${uuid}`
  const creation = await api.get({ url }).then((res) => res)
  return creation
}
