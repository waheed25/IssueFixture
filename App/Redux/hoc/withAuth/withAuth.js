import { connect } from 'react-redux'
import { authUser, googleAuth, facebookAuth, signUp, changeAuthStatus } from '../../actions/Auth/Auth'

const mapStateToProps = ({ auth, categories, notifications }) => {
  const { data, isLoading, error, isUserLoggedIn, userInfo } = auth
  const { categoryItems } = categories
  const { hideNotificationBadge } = notifications
  return {
    data, isLoading, error, isUserLoggedIn, userInfo, categoryItems, hideNotificationBadge
  }
}

const mapdispatchTOProps = dispatch => ({
  authUser: (payload) => dispatch(authUser(payload)),
  googleAuth: (payload) => dispatch(googleAuth(payload)),
  facebookAuth: (payload) => dispatch(facebookAuth(payload)),
  signUp: (payload) => dispatch(signUp(payload)),
  changeAuthStatus: (payload) => dispatch(changeAuthStatus(payload))
})

export const withAuth = Component =>
  connect(mapStateToProps, mapdispatchTOProps)(Component)
