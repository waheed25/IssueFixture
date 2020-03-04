import Pusher from 'pusher-js/react-native'
import _ from 'underscore'
import WefiqConfig from '../Services/config'
const ENVConfigs = new WefiqConfig().getCurrentConfig()
// console.log('ENVConfigs', ENVConfigs)
var PusherInstance = null

export function InitializePusher () {
  if (_.isNull(PusherInstance)) {
    PusherInstance = createInstance()
  }
  return PusherInstance
}
function createInstance () {
  return new Pusher(ENVConfigs.pusherConfig.pusherKey, {
    cluster: ENVConfigs.pusherConfig.cluster,
    forceTLS: ENVConfigs.pusherConfig.forceTLS
  })
}
