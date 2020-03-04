import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import Colors from '../../Styles/Colors'
import { appStyles } from '../../Styles/CommonStyles'
import DeviceSizes from '../../Styles/DeviceSizes'

const NotificationTile = React.memo(({ url, notificationInitiator, action, icon, isRead, creationName, onPress, notificationInitiatorUserName, profileName }) => (
  <TouchableOpacity style={isRead && styles.unreadNotification} onPress={() => onPress(notificationInitiatorUserName, profileName)}>
    <View style={[styles.notificationItemView]}>
      <View style={styles.horizontalAlign}>
        <FastImage style={styles.notifierImage} source={{uri: url}} />
        <Text numberOfLines={2} style={[styles.alignWithImage, styles.notificationText]}><Text numberOfLines={2} style={[appStyles.commonFontBold, styles.notificationText]}>{notificationInitiator}</Text> {action}<Text numberOfLines={2} style={[appStyles.commonFontBold, styles.notificationText]}> {creationName}</Text></Text>
        <View style={styles.rightView}>{icon}
          <Text style={styles.time}>just now</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
))
const styles = StyleSheet.create({
  notificationItemView: {
    height: 80,
    width: '95%',
    marginLeft: 10,
    marginRight: 20,
    borderBottomWidth: 1,
    borderColor: Colors.WefiqBorder,
    justifyContent: 'center',
    // backgroundColor: 'green',
    flex: 1
  },
  notifierImage: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  horizontalAlign: {
    ...appStyles.horizontalView
    // justifyContent: 'center'
  },
  alignWithImage: {
    top: 7,
    left: 15,
    ...appStyles.defaultFontFamily,
    width: DeviceSizes.DEVICE_WIDTH * 0.70
  },
  notificationText: {
    fontSize: 14
  },
  unreadNotification: {
    backgroundColor: 'rgba(197, 239, 247, 0.8)'
  },
  rightView: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 60
  },
  time: {
    fontSize: 11,
    color: Colors.WefiqText,
    ...appStyles.defaultFontFamily
  }

})
export default NotificationTile
