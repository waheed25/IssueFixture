import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import DeviceSizes from '../../Styles/DeviceSizes'
import Colors from '../../Styles/Colors'
import { appStyles } from '../../Styles/CommonStyles'
import WeffiqOpacity from '../WefiqTouchables'
import WefiqIcons from '../CustomIcons/CustomIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

function renderIcon (selected, CategoryName) {
  debugger
  switch (CategoryName) {
    case 'All' :
      if (selected) {
        return <WefiqIcons name='playlist' size={60} color={Colors.White} />
      }
      return <WefiqIcons name='playlist' size={60} color={Colors.appColor} />
    case 'Video' :
      if (selected) {
        return <WefiqIcons name='video' size={50} color={Colors.White} />
      }
      return <WefiqIcons name='video' size={50} color={Colors.appColor} />
    case 'Music' :
      if (selected) {
        return <Ionicons name='ios-musical-notes' size={70} color={Colors.White} />
      }
      return <Ionicons name='ios-musical-notes' size={70} color={Colors.appColor} />
    case 'Photos' :
      if (selected) {
        return <WefiqIcons name='photo' size={50} color={Colors.White} />
      }
      return <WefiqIcons name='photo' size={50} color={Colors.appColor} />
    case 'Podcast' :
      if (selected) {
        return <FontAwesome name='podcast' size={70} color={Colors.White} />
      }
      return <FontAwesome name='podcast' size={70} color={Colors.appColor} />
    case 'Arts' :
      if (selected) {
        return <MaterialCommunityIcons name='palette' size={70} color={Colors.White} />
      }
      return <MaterialCommunityIcons name='palette' size={70} color={Colors.appColor} />
    default :
      return <WefiqIcons name='playlist' size={60} color={Colors.appColor} />
  }
}

const CategoriesItem = ({ icon, CategoryName, count, selected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={selected ? styles.categoriesViewSelected : styles.categoriesViewUnSelected}>
        {renderIcon(selected, CategoryName)}
        <View style={styles.icon}>
          <Text style={selected ? styles.CategoryNameSelected : styles.CategoryNameUnSelected}>{CategoryName}</Text>
          {/* <Text style={selected ? styles.countSelected : styles.countUnSelected}>{count}</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default CategoriesItem

const styles = StyleSheet.create({
  categoriesViewSelected: {
    height: DeviceSizes.DEVICE_HEIGHT * 0.25,
    width: DeviceSizes.DEVICE_WIDTH * 0.45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.appColor,
    borderRadius: 5,
    margin: 5
  },
  categoriesViewUnSelected: {
    height: DeviceSizes.DEVICE_HEIGHT * 0.25,
    width: DeviceSizes.DEVICE_WIDTH * 0.45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.White,
    borderRadius: 5,
    borderColor: Colors.WefiqBorder,
    borderWidth: 1,
    margin: 5
  },
  icon: {
    top: 20
  },
  CategoryNameSelected: {
    ...appStyles.commonFontSemiBold,
    fontSize: 16,
    color: Colors.White
  },
  CategoryNameUnSelected: {
    ...appStyles.commonFontSemiBold,
    fontSize: 16
  },
  countSelected: {
    ...appStyles.defaultFontFamily,
    fontSize: 16,
    color: Colors.White,
    textAlign: 'center'
  },
  countUnSelected: {
    ...appStyles.defaultFontFamily,
    fontSize: 16,
    textAlign: 'center'
  }
})
