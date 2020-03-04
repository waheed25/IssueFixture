import { connect } from 'react-redux'
import { fetchFollowers } from '../../actions/Profile/followers'

const mapStateToProps = ({ followers, auth }) => {
  const { data, isLoading, error, totalCount } = followers
  const { userInfo } = auth
  return {
    data, isLoading, error, totalCount, userInfo
  }
}

const mapdispatchTOProps = dispatch => ({
  fetchFollowers: (payload, userId, refreshing) => dispatch(fetchFollowers(payload, userId, refreshing))

})

export const withFollowers = Component =>
  connect(mapStateToProps, mapdispatchTOProps)(Component)
