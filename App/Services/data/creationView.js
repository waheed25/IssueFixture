import WefiqBaseAPIs from './base-api'

const api = new WefiqBaseAPIs()
export const IncreaseCreationView = async(params, apiType) => {
  return new Promise((resolve, reject) => {
    api.createAPI({ url: '/wefiq/view', requestPayload: params }).then(document => {
      if (document.ok) return resolve(document.data)
      else {
        return reject(document)
      }
    }, error => {
      return reject(error)
    })
  })
}
