import { combineReducers } from 'redux'
import creations from './Creations/Creations'
import latestCreations from './Creations/latestCreations'
import feedCreations from './Creations/feedCreations'
import auth from './Auth/auth'
import userCreations from './UserCreations/Creations'
import refiq from './Refiq/Refiq'
import collections from './Collections/Collections'
import creationsOfCollections from '../Reducers/Collections/Creations'
import pusher from './Pusher'
import connectPusher from './Pusher/connectToPusher'
import { reducer } from '../NavigationRedux'
import audioPlayer from './AudioPlayer'
import creationsDetails from './Creations/creationsDetails'
import categories from './Categories'
import search from './Search/search'
import creationView from './Creations/creationsViews'
import notifications from './Notifications'
import followers from './Profile/Followers'
import followed from './Profile/Followed'
const rootReducer = {
  creations,
  latestCreations,
  nav: reducer,
  auth,
  userCreations,
  refiq,
  collections,
  creationsOfCollections,
  pusher,
  connectPusher,
  audioPlayer,
  creationsDetails,
  categories,
  search,
  creationView,
  notifications,
  feedCreations,
  followers,
  followed
}

export default combineReducers(rootReducer)
