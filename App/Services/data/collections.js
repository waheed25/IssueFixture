import WefiqBaseAPIs from './base-api'
import { buildURL } from '../../Utils/buildURL'
const API = new WefiqBaseAPIs()
export const CollectionsService = (apiType, collectionParams) => {
  const url = buildURL({ api: apiType, params: collectionParams })
  return new Promise((resolve, reject) =>
  API.getAPI({ url }).then(res => {
    debugger
    const resData = res.normData.collection
    const resDataArray = res.normData.collection ? Object.keys(resData).map(i => resData[i]) : []
    resolve({resDataArray, count: res.count})
  })
    .catch(eror => reject(eror)
  ))
}
