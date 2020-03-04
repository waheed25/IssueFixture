import React from 'react'
import { withAuth } from '../../Redux/hoc/withAuth/withAuth'
import { View, Text, StyleSheet } from 'react-native'
import WefiqIcon from '../../Components/CustomIcons/CustomIcons'
import Colors from '../../Styles/Colors'
import { appStyles } from '../../Styles/CommonStyles'
const IconSpace = {top: 2}
const Badge = React.memo(({ userInfo, focused, isUserLoggedIn, hideNotificationBadge }) => {
  console.log('userInfo', userInfo)
  return (<React.Fragment>
    { isUserLoggedIn && !hideNotificationBadge &&
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{userInfo.gen_notif_count}</Text>
      </View>
    }
    <WefiqIcon name='notification-icon' style={IconSpace} size={22} color={focused ? Colors.appColor : Colors.BottomTabsIconColor} />
  </React.Fragment>)
})

export default withAuth(Badge)

const styles = StyleSheet.create({
  badge: {
    height: 20,
    width: 20,
    backgroundColor: Colors.appColor,
    borderRadius: 10,
    position: 'absolute',
    bottom: '40%',
    right: '22%',
    ...appStyles.alignSelfCenter,
    zIndex: 10
  },
  badgeText: {
    ...appStyles.commonFont,
    fontSize: 11
  }
})
