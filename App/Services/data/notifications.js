import WefiqBaseAPIs from './base-api'
import { buildURL } from '../../Utils'
import { serializeByModel } from '../../Utils/dataSerialization'

const api = new WefiqBaseAPIs()
export const fetchNotifications = async(params, apiType, headers) => {
  const NotificationsURL = buildURL({params, api: apiType})
  debugger
  return new Promise((resolve, reject) => {
    api.getAPI({url: NotificationsURL, headers, notNormalize: true}).then(document => {
      const afterSerializing = serializeByModel('notification', document)
      debugger
      if (document.data) return resolve(afterSerializing)
      else {
        return reject(document)
      }
    }, error => {
      return reject(error)
    })
  })
}
