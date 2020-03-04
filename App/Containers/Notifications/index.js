import React, { Component } from 'react'
import { StyleSheet, FlatList, Text, RefreshControl, ActivityIndicator, Alert } from 'react-native'
import { withNotifications } from '../../Redux/hoc/withNotifications/withNotifications'
import NotificationTile from '../../Components/Notifications/notificationItem'
import { notificationParams } from '../../Utils'
import { headers } from '../../Utils/createHeaders'
import WefiqList from '../../Components/WefiqList'
import Loader, {
  SearchUserLoader
} from '../../Components/Loader/Loader'
import Colors from '../../Styles/Colors'
import Wefiq from '../../Components/CustomIcons/CustomIcons'
import NavigationService from '../../Navigation/navigationService'
import Header from '../../Components/Header/Header'
import _ from 'lodash'

class Notifications extends Component {
  pageLimit = 10
  pageOffset = 0

  state={
    refreshing: false
  }
  componentDidMount () {
    this.props.navigation.addListener('willFocus', (playload) => {
      if (!this.props.isUserLoggedIn) {
        this.userNotLoggedIn()
      }
      if (this.props.isUserLoggedIn && this.props.data.length < 1) {
        const params = notificationParams({ limit: this.pageLimit, offset: this.pageOffset })
        const apiType = '/wefiq/notifications?'
        this.props.fetchNotifications(params, apiType, headers(this.props.userInfo.token))
      }
      if (!this.props.hideNotificationBadge) {
        this.props.hideNotificationBadgeFromTab()
      }
    })
  }
  onChangeLoginState= async (state, data) => {
    // this.setState({ notLoggedIn: false, token: data.data.attributes.token })
  }
  userNotLoggedIn=() => (Alert.alert(
    'You Must be LoggedIn to see Notification',
    '',
    [
      {
        text: 'Cancel',
        onPress: () => this.props.navigation.goBack(),
        style: 'cancel'
      },
      {text: 'OK', onPress: () => NavigationService.navigate('Login', { onChangeLoginState: () => this.onChangeLoginState })}
    ],
    {cancelable: false}
  ))
  identifyActions=(action) => {
    switch (action) {
      case 'like_added':
        return {
          icon: <Wefiq name='like' style={styles.icon} size={16} color={'red'} />,
          text: 'liked your creation',
          onPress: () => null
        }
      case 'refiq_added':
        return {
          icon: <Wefiq name='refiq' style={styles.icon} size={18} color={Colors.appColor} />,
          text: 'refiq your creation',
          onPress: () => null
        }
      case 'comment_added':
        return {
          icon: <Wefiq name='comment' style={styles.icon} size={16} color={Colors.appColor} />,
          text: 'commented on your creation',
          onPress: () => null
        }
      case 'save_added':
        return {
          icon: <Wefiq name='comment' style={styles.icon} size={16} color={Colors.appColor} />,
          text: 'saved your creation',
          onPress: () => null
        }
      case 'following':
        return {
          icon: <Wefiq name='comment' style={styles.icon} size={16} color={Colors.appColor} />,
          text: 'has started following you',
          onPress: (name, profileName) => this.navigateToProfile(name, profileName)
        }
      case 'video_provisioned':
        return {
          icon: <Wefiq name='comment' style={styles.icon} size={16} color={Colors.appColor} />,
          text: 'video_provisioned',
          onPress: () => null
        }
    }
  }

  navigateToProfile=(name, profileName) => {
    NavigationService.navigate('Profile', { ProfileInfo: { name, profileName } })
  }

  renderItem =({item, index}) => {
    const participants = JSON.parse(item.attributes.participants)
    return (
      <NotificationTile
        url={participants.length > 0 ? participants[0].picture_url : 'https://facebook.github.io/react/logo-og.png'}
        profileName={participants.length > 0 ? participants[0].profile_name : ''}
        notificationInitiator={participants.length > 0 && participants[0].profile_name}
        notificationInitiatorUserName={item.relationships.attachedEntity.data[0].attributes.name}
        action={this.identifyActions(item.attributes.actionType).text}
        icon={this.identifyActions(item.attributes.actionType).icon}
        isRead={item.attributes.isRead}
        creationName={item.relationships.attachedEntity.data[0].attributes.title}
        onPress={this.identifyActions(item.attributes.actionType).onPress}
    />
    )
  }
  onRefresh =() => {
    this.pageOffset = 0
    this.setState({ refreshing: true })
    const params = notificationParams({ limit: this.pageLimit, offset: this.pageOffset })
    const apiType = '/wefiq/notifications?'
    this.props.fetchNotifications(params, apiType, headers(this.props.userInfo.token))
  }
  endScroll=() => {
    this.pageOffset += this.pageLimit
    const params = notificationParams({ limit: this.pageLimit, offset: this.pageOffset })
    const apiType = '/wefiq/notifications?'
    this.props.fetchNotifications(params, apiType, headers(this.props.userInfo.token))
  }
  renderFooter=() => {
    // if (this.props.isLoading && this.props.data.length > 0) {
    return (
      <ActivityIndicator size='large' color={Colors.appColor} />
    )
    // } else {
    //   return null
    // }
  }
  render () {
    console.log('notifications tabs', this.props)
    return (
      <React.Fragment>
        <Header centerText='Notifications' />
        { this.props.isUserLoggedIn &&
          <React.Fragment>
            {
              this.props.isLoading && this.props.data.length < 1 &&
              <SearchUserLoader />
            }
            {this.props.data.length > 1 &&
            <FlatList
              data={this.props.data}
              renderItem={this.renderItem}
              initialNumToRender={10}
              keyExtractor={(item) => `${item.id}${Math.random()}`}
              numColumns={1}
              maxToRenderPerBatch={10}
              windowSize={50}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing && this.props.isLoading}
                  onRefresh={this.onRefresh}
                  tintColor={Colors.appColor}
                  Colors={[Colors.appColor]}
                />
              }
              onEndReached={_.debounce(this.endScroll, 500)}
              onEndReachedThreshold={0.1}
              ListFooterComponent={this.renderFooter}
            />
            }
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}

export default withNotifications(Notifications)
const styles = StyleSheet.create({
  header: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10
  },
  closeBtn: {
    flexDirection: 'row'
  },
  uploadText: {
    fontSize: 16,
    right: 5,
    bottom: 5,
    fontWeight: '600',
    fontFamily: 'SourceSansPro-Regular'
  },
  closetButtonText: {
    bottom: 2,
    left: 3,
    fontFamily: 'SourceSansPro-Regular'
  },
  emptyView: {
    width: 35
  }

})
