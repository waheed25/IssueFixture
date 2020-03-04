import { connect } from 'react-redux'
import { fetchFollowedUser } from '../../actions/Profile/following'

const mapStateToProps = ({ followed, auth }) => {
  const { data, isLoading, error, totalCount } = followed
  const { userInfo } = auth
  return {
    data, isLoading, error, totalCount, userInfo
  }
}

const mapdispatchTOProps = dispatch => ({
  fetchFollowed: (payload, apiType) => dispatch(fetchFollowedUser(payload, apiType))

})

export const withFollowed = Component =>
  connect(mapStateToProps, mapdispatchTOProps)(Component)
