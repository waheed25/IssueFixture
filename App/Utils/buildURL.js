// import WefiqConfig from '../Services/config'
import qs from 'qs'
// const baseUrl = new WefiqConfig().getCurrentConfig()
export const buildURL = ({api, params, defaultParams = {}}) => {
  params = Object.assign(defaultParams, params)
  const urlString = qs.stringify(params, { encode: false })
  return `${api}${urlString}`
}

