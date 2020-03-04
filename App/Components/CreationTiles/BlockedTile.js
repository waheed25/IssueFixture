import React from 'react'
import { StyleSheet, Text, View, Platform, Alert } from 'react-native'
import FastImage from 'react-native-fast-image'
import Sizes from '../../Styles/DeviceSizes'
import Colors from '../../Styles/Colors'
import Images from '../../Images/rootImages'
import Button from '../../Components/Buttons/ButtonTransparent'
import { headers } from '../../Utils/createHeaders'
import WefiqBaseAPIs from '../../Services/data/base-api'
import { withAuth } from '../../Redux/hoc/withAuth/withAuth'
const cardHeight = Sizes.DEVICE_HEIGHT * 0.42
const cardWidth = Sizes.DEVICE_WIDTH * 0.93
const Api = new WefiqBaseAPIs()

const EmptyCreation = ({ title, reason, isUserLoggedIn, drupalInternalNid, userInfo, onRemoveEmptyCreation, index, listName, creationId, collectionID }) => {
  // const isOwner = (uid) => uid === userInfo.drupal_internal__uid
  const unRefiq = async() => {
    Api.deleteAPI({
      url: `/wefiq/activity/${drupalInternalNid}?activity_type=refiq`,
      headers: headers(userInfo.token)
    }).then((res) => {
      onRemoveEmptyCreation(index)
      if (!res.ok) {
        return Alert({ title: 'Oh no!!!', message: 'Unable to Remove' })
      }
    })
  }
  const removeFromCollection = {
    uuid: collectionID,
    nids: [drupalInternalNid]
  }
  const removeCreationFromCollection = async () => {
    Api.createAPI({ url: `/wefiq/collection/creations/remove`, requestPayload: removeFromCollection, headers: headers(userInfo.token) }).then((res) => {
      onRemoveEmptyCreation(index)
      if (!res.ok) {
        return alert('Unable to remove from collection')
      }
    }
    )
  }
  const deleteCreation = async() => {
    Api.deleteAPI({
      url: `/wefiq/delete/node/${creationId}`,
      headers: headers(userInfo.token)
    }).then((res) => {
      onRemoveEmptyCreation(index)
      if (!res.ok) {
        return Alert({ title: 'Oh no!!!', message: 'Unable to Remove' })
      }
    })
  }
  return (
    <View style={styles.CardStyle}>
      <FastImage
        resizeMode='cover'
        style={[styles.Thumbnail]}
        placeholder={Images.placeHolder}
        source={Images.placeHolder} />
      <View style={[styles.horizontalAlign]}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text numberOfLines={2} ellipsizeMode='tail' style={styles.profileName}>{reason}</Text>
        </View>
        { isUserLoggedIn &&
          <Button
            onPress={() => listName === 'refiqs' ? unRefiq() : (listName === 'CreationsOfCollections' ? removeCreationFromCollection() : deleteCreation())}
            borderColor={Colors.wefiqRed}
            width={80}
            height={30}
            style={styles.button}
            titleColor={Colors.wefiqRed}
            title='Remove'
          />
        }
      </View>
    </View>
  )
}
export default withAuth(EmptyCreation)

const styles = StyleSheet.create({
  profileName: {
    fontSize: 14,
    fontFamily: 'SourceSansPro-Regular',
    color: '#969696',
    lineHeight: 17,
    width: 230
  },
  Thumbnail: {
    height: Platform.OS === 'ios' ? '75%' : '70%',
    width: '100%',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  CardStyle: {
    backgroundColor: 'white',
    flex: 1,
    height: cardHeight,
    width: cardWidth,
    borderRadius: 6,
    marginBottom: 10,
    paddingBottom: 20,
    shadowOpacity: 2,
    elevation: 5,
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowRadius: 10
  },
  title: {
    fontSize: 14,
    color: Colors.WefiqText,
    fontFamily: 'SourceSansPro-SemiBold',
    lineHeight: 16
  },
  horizontalAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20
  },
  button: {
    borderRadius: 15
  }
})
