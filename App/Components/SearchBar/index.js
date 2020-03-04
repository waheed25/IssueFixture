import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import TextInput from '../TextInput/Input'
import Colors from '../../Styles/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import WefiqIcons from '../CustomIcons/CustomIcons'

const SearchInput = ({onChange, onSubmitEditing, value, returnKeyType, keyboardType, style, onSettingsBtnPress, selectedSegment}) => (
  <React.Fragment>
    <TextInput autoCorrect={false} keyboardType={keyboardType} returnKeyType={returnKeyType} value={value} onSubmitEditing={onSubmitEditing} onChange={onChange} placeholderTextColor={Colors.WefiqText} placeholder='Search' style={[searchInputStyles.container, style]} />
    <Ionicons style={searchInputStyles.iconsStyles} name='md-search' size={25} />
    <TouchableOpacity style={searchInputStyles.iconsStylesSettings} onPress={onSettingsBtnPress}>
      {selectedSegment === 'Creations' &&
      <WefiqIcons name='categories_icon' color='#000000' size={22} />
      }
      {selectedSegment === 'Creators' &&
      <MaterialIcons name='my-location' color='#000000' size={22} />
      }
    </TouchableOpacity>
  </React.Fragment>
    )

const searchInputStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.WefiqText,
    borderRadius: 10,
    height: 40,
    width: '98%',
    left: 5,
    zIndex: -1
  },
  iconsStyles: {
    position: 'absolute',
    left: 15,
    top: 28
  },
  iconsStylesSettings: {
    position: 'absolute',
    right: 15,
    top: 28
  }

})

export default SearchInput
