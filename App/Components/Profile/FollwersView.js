import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { appStyles } from '../../Styles/CommonStyles'
import Colors from '../../Styles/Colors'
import _ from 'underscore'
import TransparentButton from '../../Components/Buttons/ButtonTransparent'
import DeviceSizes from '../../Styles/DeviceSizes'

const CreatorTile = ({ imgURL, creatorName, bio, time, item, onPress, userName, fellowshipUuid, followUser, id, unFollowUser, isUserLoggedIn, loggedInUserId, followerId }) => {
  const [ following, setFollowing ] = useState(!_.isNull(fellowshipUuid))
  console.log('following', following)
  const onfollowUnfollow = () => {
    setFollowing(!following)
    if (following) {
      unFollowUser(fellowshipUuid)
    } else {
      followUser(id)
    }
  }

  return (<TouchableOpacity style={styles.listItem} onPress={() => onPress(item)}>
    <View style={{position: 'absolute', right: 10, height: 100, width: 100, zIndex: 10}}>
      { isUserLoggedIn && followerId !== loggedInUserId &&
        <TransparentButton onPress={() => onfollowUnfollow()}
          btnColor={following ? Colors.appColor : Colors.Transparent} height={35} width={110}
          borderColor={following ? Colors.Transparent : Colors.appColor}
          titleColor={following ? Colors.White : Colors.appColor}
          title={following ? 'Following' : 'Follow'} style={styles.followButton}
        />
      }
    </View>
    <View style={styles.horizontalView}>
      <FastImage style={styles.Avatar} source={{ uri: imgURL || 'https://www.freeiconspng.com/uploads/blue-user-icon-32.jpg' }} />
      <View style={styles.Container}>
        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.creatorName}>{creatorName} <Text style={styles.commentTime}>{time}</Text></Text>
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.username}>@{userName}</Text>
        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.bio}>{bio}</Text>
      </View>
    </View>
  </TouchableOpacity>
  )
}
export default CreatorTile
const styles = StyleSheet.create({

  listItem: {
    height: 100,
    justifyContent: 'center',
    zIndex: -1
  },
  Container: {
    marginLeft: 10
  },
  bio: {
    ...appStyles.defaultFontFamily,
    color: Colors.WefiqText,
    fontSize: 13,
    // lineHeight: 40,
    width: DeviceSizes.DEVICE_WIDTH * 0.6
  },
  creatorName: {
    ...appStyles.commonFontSemiBold,
    fontSize: 14,
    width: 150
  },
  Avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginBottom: '6%'
  },
  followButton: {
    borderRadius: 20,
    // position: 'absolute',
    // right: 0,
    zIndex: 20
  },
  horizontalView: {
    ...appStyles.horizontalView,
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.GraySaldo,
    paddingBottom: 5
  },
  username: {
    color: Colors.GraySilver,
    marginBottom: 5,
    lineHeight: 22
  }
})
