import React, { useEffect, useState } from 'react'
import { View, StyleSheet, RefreshControl, Text } from 'react-native'
import { withFollowers } from '../../Redux/hoc/withProfile/withFollowers'
import FollowersItem from '../../Components/Profile/FollwersView'
import { followersList } from '../../Utils/params'
import Colors from '../../Styles/Colors'
import WefiqList from '../../Components/WefiqList'
import { SearchUserLoader } from '../../Components/Loader/Loader'
import { fetchFollowers } from '../../Services/data/followers'
import { headers } from '../../Utils/createHeaders'
import WefiqBaseAPIs from '../../Services/data/base-api'
import { appStyles } from '../../Styles/CommonStyles'
import { withAuth } from '../../Redux/hoc/withAuth/withAuth'
let pageOffset = 0
let pageLimit = 10
const Api = new WefiqBaseAPIs()
class FollowersList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      refreshing: false,
      followersData: []
    }
    this.userId = props.navigation.state.params.userId
  }

//   const {
//   data
// ,
//   isLoading
// ,
//   totalCount
// ,
//   navigation
// }
//
// = this.props
// const userId = navigation.state.params.userId
// const [refreshing, setRefreshing] = useState(false)
// const [followersData, setFollowersData] = useState([])
//
// console.log('followers list', props)
// useEffect(async () => {
//   const params = followersList(pageLimit, pageOffset)
//   // fetchFollowers(params, userId)
//   const data = await fetchFollowers(params, userId)
//   setFollowersData(data.resDataArray)
// }, [])
//
// // useEffect(() => {
// //   setFollowersData(followersData)
// // }, [followersData])
//

  async componentDidMount () {
    const params = followersList(pageLimit, pageOffset)
    this.setState({ isLoading: true })
    const data = await fetchFollowers(params, this.userId)
    this.setState({followersData: data.resDataArray, isLoading: false})
  }

  onRefresh = async () => {
    pageOffset = 0
    const params = followersList(pageLimit, pageOffset)
    const data = await fetchFollowers(params, this.userId, { refreshList: true })
    this.setState({ followersData: data.resDataArray, refreshing: true })
    setTimeout(() => this.setState({ refreshing: false }), 2000)
  }
// const onEndReached = () => {
//   pageOffset += pageLimit
//   if (data.length < totalCount && !pageOffset < totalCount) {
//     const params = followersList(pageLimit, pageOffset)
//     fetchFollowers(params)
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
    this.props.navigation.push('Profile', { ProfileInfo: { name: item.attributes.name, fullName: item.attributes.fullName } })
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
    isUserLoggedIn={this.props.isUserLoggedIn}
    loggedInUserId={this.props.userInfo.drupal_internal__uid}
    followerId={item.attributes.drupal_internal__uid}
/>)
  render () {
    const { isLoading, followersData } = this.state
    console.log('followers', this.props)
    console.log('followers', this.state)
    if (isLoading && followersData.length < 1) return <SearchUserLoader />
    if (!isLoading && followersData.length < 1) return <View style={appStyles.alignCenter}><Text>No Followers Found</Text></View>
    return (
      <View style={styles.container}>
        <WefiqList
          style={styles.list}
          data={this.state.followersData}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing && this.props.isLoading}
              onRefresh={this.onRefresh}
              tintColor={Colors.appColor}
              Colors={[Colors.appColor]}
          />
        }
          onEndReachedThreshold={0.5}
        // onEndReached={() => onEndReached}
      />
      </View>
    )
  }
}
// TODO:: ON End Reached is causing problem due to un certain number of counts, Fix this when count is fixed.
export default withAuth(withFollowers(FollowersList))

const styles = StyleSheet.create({
  list: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10
  },
  container: {
    flex: 1
  },
  alignCenter: {

  }
})
