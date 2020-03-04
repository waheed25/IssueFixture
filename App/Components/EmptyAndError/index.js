import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Content } from 'native-base'
import FastImage from 'react-native-fast-image'

const ErrroAnyEmptyState = ({image, text, onAdd}) => (
  <Content contentContainerStyle={styles.root}>
    <FastImage resizeMode='contain' style={styles.image} source={image} />
    <Text style={styles.text}>{text}</Text>
    <Text style={styles.uploadDescription}>Tab on “+” icon to upload your creations</Text>
    <TouchableOpacity onPress={onAdd}>
      {/*<FastImage resizeMode='contain' style={{ marginTop: 15, height: 30, width: 30 }} source={require('../../Images/png/add.png')} />*/}
    </TouchableOpacity>
  </Content>
)

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // height: '100%',
    // width: '100%'
    zIndex: 10,
    height: 100
  },
  image: {
    height: 150,
    width: 150,
    marginTop: 40
  },
  text: {
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 16
  },
  uploadDescription: {
    marginTop: 10,
    fontFamily: 'SourceSansPro-Regular'
  }
})
export default ErrroAnyEmptyState
