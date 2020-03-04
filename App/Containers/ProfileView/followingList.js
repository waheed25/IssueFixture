import React, { useEffect, useState } from 'react'
import { View, StyleSheet, RefreshControl, Text } from 'react-native'
import { withFollowed } from '../../Redux/hoc/withProfile/withFollowed'
import FollowersItem from '../../Components/Profile/FollwersView'
import { followersList } from '../../Utils/params'
import Colors from '../../Styles/Colors'
import WefiqList from '../../Components/WefiqList'
import { SearchUserLoader } from '../../Components/Loader/Loader'
import { fetchFollowed } from '../../Services/data/followed'
import { headers } from '../../Utils/createHeaders'
import _ from 'underscore'
import WefiqBaseAPIs from '../../Services/data/base-api'
import { appStyles } from '../../Styles/CommonStyles'
let pageOffset = 0
let pageLimit = 10
const Api = new WefiqBaseAPIs()
class FollowedList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      refreshing: false,
      followedUsers: [],
      isLoading: false
    }
    this.userId = props.navigation.state.params.userId
  }
  // const { fetchFollowed, data, isLoading, totalCount, navigation } = props
  // const [refreshing, setRefreshing] = useState(false)
  // console.log('following list', props)
  // useEffect(() => {
  //   const params = followersList(pageLimit, pageOffset)
  //   fetchFollowed(params)
  // }, [])

  onRefresh = async () => {
    pageOffset = 0
    this.setState({refreshing: true})
    const params = followersList(pageLimit, pageOffset)
    const data = await fetchFollowed(params, this.userId)
    setTimeout(() => this.setState({followedUsers: data.resDataArray, refreshing: false}), 3000)
  }
  async componentDidMount () {
    const params = followersList(pageLimit, pageOffset)
    this.setState({ isLoading: true })
    const data = await fetchFollowed(params, this.userId)
    this.setState({followedUsers: [...this.state.followedUsers, ...data.resDataArray], isLoading: false})
  }
  // onEndReached = () => {
  //   pageOffset += pageLimit
  //   if (data.length < totalCount && !pageOffset < totalCount) {
  //     const params = followersList(pageLimit, pageOffset)
  //     fetchFollowed(params)
  //   }
  // }
  followUser=(id) => {
    const url = `/wefiq/follow/${id}`
    Api.createAPI({url, headers: headers(this.props.userInfo.token)}).then((res) => {
      console.log('follow user', res.data)
    })
  }
  unFollowUser=(id) => {
    const url = `/wefiq/follow/${id}`
    Api.deleteAPI({url, headers: headers(this.props.userInfo.token)}).then((res) => {
    })
  }

  navigateToProfile = (item) => {
    this.props.navigation.push('Profile', { ProfileInfo: { name: item.attributes.name } })
  }
  renderItem = ({ item }) => (<FollowersItem
    creatorName={item.attributes.full_name}
    imgURL={item.attributes.picture_url}
    bio={item.attributes.about}
    userName={item.attributes.name}
    fellowshipUuid={item.attributes.fellowship_uuid}
    onPress={() => this.navigateToProfile(item)}
    id={item.id}
    followUser={this.followUser}
    unFollowUser={this.unFollowUser}
  />)
  render () {
    const { isLoading, refreshing, followedUsers } = this.state
    if (isLoading && followedUsers.length < 1) return <SearchUserLoader />
    if (!isLoading && followedUsers.length < 1) return <View style={appStyles.alignCenter}><Text>Not Following anyone</Text></View>

    return (
      <View style={styles.container}>
        <WefiqList
          style={styles.list}
          data={followedUsers}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing && isLoading}
              onRefresh={this.onRefresh}
              tintColor={Colors.appColor}
              Colors={[Colors.appColor]}
          />
        }
          onEndReachedThreshold={0.01}
        // onEndReached={onEndReached}
      />
      </View>
    )
  }
}
export default withFollowed(FollowedList)

const styles = StyleSheet.create({
  list: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10
  },
  container: {
    flex: 1
  }
})
