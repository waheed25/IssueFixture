import { buildURL } from '../../Utils'
import { AsyncStorage } from 'react-native'
import CreationsService from './creations'

const api = new CreationsService()
export const fetchCommentSerivce = async(params, apiType) => {
  const url = buildURL({ api: apiType, params })
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
  debugger
  const models = api.serializeByModel('comment', resp.normData)
  const arrayOfComments = models.comment ? Object.keys(models.comment).map(i => models.comment[i]) : []
  return ({ arrayOfComments, totalComments: resp.count })
}
