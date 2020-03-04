import * as _ from 'underscore'
import normlize from 'json-api-normalizer'
export function serializeByModel (modelKey, tempdata) {
  const normaizedData = normlize(tempdata)
  const data = Object.assign({}, normaizedData)

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
