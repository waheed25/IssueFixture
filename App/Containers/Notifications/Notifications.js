import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import Header from '../../Components/Header/Header'
import Colors from '../../Styles/Colors'
import Images from '../../Images/rootImages'
// import EmptyAndErrorState from '../../Components/EmptyAndError'
const EmptyMessageAndNotification = ({title, desscription, onAdd, source, displayUpload}) => {
  return (
    <View style={{ flex: 1 }}>
      <Header {...this.props} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FastImage style={{borderRadius: 45, height: 200, width: 200}} source={source} />
        <Text style={styles.noMessageText}>
          {title}
        </Text>
        <Text style={styles.uploadText}>{desscription}</Text>
        { displayUpload &&
        <View style={{ flex: 1, position: 'absolute', bottom: 30 }}>
          <TouchableOpacity onPress={onAdd}>
            <FastImage resizeMode='contain' style={{ marginTop: 15, height: 40, width: 40 }}
              source={Images.uploadButton} />
          </TouchableOpacity>
        </View>
        }
      </View>
    </View>
  )
}
export default EmptyMessageAndNotification

const styles = StyleSheet.create({
  noMessageText: {
    textAlign: 'center',
    color: Colors.WefiqText,
    fontSize: 16,
    fontFamily: 'SourceSansPro-Bold',
    marginTop: 30
  },
  uploadText: {
    textAlign: 'center',
    color: Colors.WefiqText,
    // fontWeight: '600',
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
    marginTop: 5
  }

})
