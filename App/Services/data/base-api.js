// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import WefiqConfig from '../config'
import CookieManager from 'react-native-cookies'
import normalize from 'json-api-normalizer'
import * as _ from 'underscore'
export default class WefiqBaseAPIs {
  config = '';

  constructor () {
    this.config = new WefiqConfig().getCurrentConfig()
  }

  _getAPIResource (headers) {
    const baseURL = 'https://api-dev.wefiq.com/api/'
    return apisauce.create({
            // base URL is read from the "constructor"
      baseURL,
      headers: headers || { 'content-type': 'application/vnd.api+json' },
            // 10 second timeout...
      timeout: 10000
    })
  }

  getAPI ({url, headers, notNormalize, ...args}) {
    return new Promise((resolve, reject) => {
      this._getAPIResource(headers).get(url).then(result => {
        debugger
        // const dataWithCount = [...result.data,result.data.meta.count ]
        // if (notNormalize) {
        //   return resolve(result.data)
        // }
        // const normData = normalize(result.data, {endPoint: url})
        return resolve({ normData: result.data.data, count: result.data.meta ? result.data.meta.count : 1 })
      }, error => {
        return reject(error)
      })
    })
  }

  createAPI ({url, requestPayload, headers = null}) {
    debugger
        // If sauce needs fields' data in attributes then desearlize using a normalier library
    return new Promise((resolve, reject) => {
      this._getAPIResource(headers).post(url, requestPayload).then(result => {
        debugger
        if (result.ok) {
          resolve(result)
          CookieManager.clearAll()
            .then((res) => {
              console.log('CookieManager.clearAll =>', res)
            })
        }
        if (result.data.errors && result.data.errors.length > 0) {
          CookieManager.clearAll()
            .then((res) => {
              console.log('CookieManager.clearAll =>', res)
            })

          resolve(result.data)
        } else {
          reject(result)
        }
      }, error => {
        reject(error)
      })
    })
  }

  updateAPI (url, args, header) {
        // write logic for update
  }

  deleteAPI ({url, requestPayload, headers}) {
    debugger
    return new Promise((resolve, reject) => {
      this._getAPIResource(headers).delete(url, requestPayload).then(result => {
        debugger
        resolve(result)
      }, error => {
        reject(error)
      })
    })
  }

  serializeByModel (modelKey, tempdata) {
    const data = Object.assign({}, tempdata)

    if (_.isUndefined(data[modelKey])) { return data }
    _.each(data[modelKey], (model, key) => {
      _.each(model.relationships, (relDocObj, relDocKey) => {
        if (!relDocObj) { return }

        if (_.isNull(relDocObj.data)) { return }

        if (!relDocObj.data['0']) {
          relDocObj.data = {
            0: Object.assign({}, relDocObj.data)
          }
        }

        _.each(relDocObj.data, (relObj, relKey) => {
          const foundModel = _.findWhere(data[relObj.type], {id: relObj.id})

          if (_.isObject(foundModel)) {
            data[modelKey][key].relationships[relDocKey]['data'][relKey] = foundModel
          }
        })
      })
    })

    return data
  }
}
