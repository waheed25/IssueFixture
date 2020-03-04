import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import Sizes from '../../Styles/DeviceSizes'
import Colors from '../../Styles/Colors'
import { hitSlop } from '../../Utils/hitslop'
import { appStyles } from '../../Styles/CommonStyles'
// import CategoriesIcon from '../../Images/SVG/categories_icon.svg'

const Header = ({leftIcon, leftIconPress, rightSecondIcon, rightSecondIconPress, rightFirstIcon, rightFirstIconPress, centerText, rightSecondIconDisabled}) => {
  return (
    <View style={styles.linearGradient}>{/* leftIcon onPress function */}
      <TouchableOpacity hitSlop={hitSlop} onPress={leftIconPress}>
        {/* leftIcon of header */}
        {leftIcon}
      </TouchableOpacity>
      <View><Text style={styles.headerCenterText}>{centerText}</Text></View>
      <View>
        {/* RightSecondIcon onPress function */}
        <TouchableOpacity disabled={rightSecondIconDisabled} hitSlop={hitSlop} onPress={rightSecondIconPress}>{rightSecondIcon}</TouchableOpacity>
      </View>
    </View>

  )
}
export default Header
var styles = StyleSheet.create({
  linearGradient: {
    // height: Sizes.DEVICE_HEIGHT / 8 * 0.8,
    height: 50,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    alignItems: 'center',
    borderBottomColor: Colors.GraySaldo,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingLeft: 25,
    paddingRight: 25
  },
  headerCenterText: {
    ...appStyles.headerCenterText
  }
})
