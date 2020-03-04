import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { appStyles } from '../../Styles/CommonStyles'

const CreatorTile = ({ imgURL, creatorName, bio, time, onPress, item }) => (
  <TouchableOpacity style={styles.listItem} onPress={() => onPress(item)}>
    <View style={styles.horizontalView}>
      <FastImage style={styles.Avatar} source={{ uri: imgURL || 'https://www.freeiconspng.com/uploads/blue-user-icon-32.jpg' }} />
      <View style={styles.Container}>
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.creatorName}>{creatorName} <Text style={styles.commentTime}>{time}</Text></Text>
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.bio}>{bio}</Text>
      </View>
    </View>
  </TouchableOpacity>
)

export default CreatorTile
const styles = StyleSheet.create({

  listItem: {
    height: 35,
    marginBottom: 15,
    marginTop: 15
  },
  Container: {
    marginLeft: 10
  },
  bio: {
    ...appStyles.defaultFontFamily,
    fontSize: 14,
    lineHeight: 15,
    width: '80%'
  },
  creatorName: {
    ...appStyles.commonFontSemiBold,
    fontSize: 14
  },
  Avatar: {
    height: 35,
    width: 35,
    borderRadius: 17.5
  },
  horizontalView: {
    ...appStyles.horizontalView
  }
})
