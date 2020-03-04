import * as _ from 'underscore'
import Config from 'react-native-config'

export default class WefiqConfig {
  ENV_KEY = Config.ENV_KEY

  constructor () {
    // retreive variables from .env

    // this.ENV_KEY = process.env['ENV_KEY']
    this.config = Config.ENV_KEY
  }

  getCurrentConfig () {
    const result = _.findWhere(this._environmentConfigs(Config.ENV_KEY), { id: this.ENV_KEY })
    return result
  }

  _environmentConfigs (ENV_KEY) {
    if (ENV_KEY === 'DEV') {
      return {
        DEV: new WefiqEnvironment(configs[0])
      }
    }
    if (ENV_KEY === 'QA') {
      return {
        QA: new WefiqEnvironment(configs[1])
      }
    }
  }
}

class WefiqEnvironment {
  // id = 'DEV'
  // api = 'http://api-dev.wefiq.com/api'
  // timezone = new Date().getTimezoneOffset()

  // pusherConfig = {
  //   key: '2106cc3e34f17c7d86b8',
  //   cluster: 'ap2',
  //   tls: true
  // }

  constructor (args) {
    this.id = args.id
    this.api = args.api
    this.timezone = args.timezone
    this.pusherConfig = args.pusherConfig
  }
}
const configs = [
  {
    id: 'DEV',
    api: 'https://api-dev.wefiq.com/api',
    pusherConfig: {
      pusherKey: '9a4fa9984a7559c1ddf2',
      cluster: 'us2',
      forceTLS: true
    },
    timezone: new Date().getTimezoneOffset()
  },
  {
    id: 'QA',
    api: 'http://api-qa.wefiq.com/api',
    pusherConfig: {
      pusherKey: 'de7ea5625109bea943b7',
      cluster: 'us2',
      forceTLS: true
    },
    timezone: new Date().getTimezoneOffset()
  }
]
