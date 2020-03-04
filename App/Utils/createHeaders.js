// import createStore from '../Redux'

// const appAuthState = createStore()
export const headers = (token) => (
  {
    Authorization: `Bearer ${token}`,
    'content-type': 'application/vnd.api+json'
  }
)

// try to declare initial state like below.
//   It worked for me.
//
//                   import RootNav from '../navigators'
// import { NavigationActions } from "react-navigation";
//
// let initNavState = RootNav.router.getStateForAction(
//   NavigationActions.init()
// );
//
// export const nav = (state = initNavState,action) => {
//   const nextState = RootNav.router.getStateForAction(action, state);
//   return nextState || state;
// }
