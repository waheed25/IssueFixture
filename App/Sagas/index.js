// import { takeLatest, all } from 'redux-saga/effects'
// import API from '../Services/Api'
// import FixtureAPI from '../Services/FixtureApi'
// import DebugConfig from '../Config/DebugConfig'
//
// /* ------------- Types ------------- */
//
// import { StartupTypes } from '../Redux/StartupRedux'
// import { GithubTypes } from '../Redux/GithubRedux'
//
// /* ------------- Sagas ------------- */
//
// import { startup } from './StartupSagas'
// import { getUserAvatar } from './GithubSagas'
// import creationsSaga from './Creations/creations'
// /* ------------- API ------------- */
//
// // The API we use is only used from Sagas, so we create it here and pass along
// // to the sagas which need it.
// const api = DebugConfig.useFixtures ? FixtureAPI : API.create()
//
// /* ------------- Connect Types To Sagas ------------- */
//
// export default function * root () {
//   yield all([
//     // some sagas only receive an action
//     creationsSaga(),
//     takeLatest(StartupTypes.STARTUP, startup),
//
//     // some sagas receive extra parameters in addition to an action
//     takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
//   ])
// }
import { all } from 'redux-saga/effects'

import creations from './Creations/creations'
import latestCreations from './Creations/latestCreations'
import feedCreations from './Creations/feedCreations'
import auth from './Auth/auth'
import googleAuth from './Auth/googleAuth'
import signUp from './Auth/signup'
import facebookAuth from './Auth/facebookAuth'
import userCreations from './UserCreations/creations'
import refiq from './Refiq/Refiq'
import collections from './Collections/Collections'
import creationsOfCollections from './Collections/creations'
import pusher from './Pusher'
import connectToPusher from './Pusher/connectToPusher'
import creationsDetails from './Creations/creationsDetails'
import search from './Search/search'
import creationView from './Creations/creationView'
import notifications from './Notifications/notifications'
import followers from './Profile/followers'
import followed from './Profile/followed'

export default function * rootSaga () {
  yield all([
    creations(),
    auth(),
    signUp(),
    googleAuth(),
    facebookAuth(),
    userCreations(),
    refiq(),
    collections(),
    creationsOfCollections(),
    pusher(),
    connectToPusher(),
    creationsDetails(),
    latestCreations(),
    feedCreations(),
    search(),
    creationView(),
    followers(),
    followed(),
    notifications()

  ])
}
