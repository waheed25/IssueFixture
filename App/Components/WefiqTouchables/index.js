import React from 'react'
import { TouchableOpacity, StyleSheet, TouchableHighlight } from 'react-native'
import _ from 'underscore'
// import { hitSlop } from '../../Utils/hitslop'

const WefiqTouchableOpacity = (props) => (
  <TouchableOpacity activeOpacity={0.7} onPress={_.debounce(props.onPress, 2500)} {...props}>{props.children}</TouchableOpacity>
)
export default WefiqTouchableOpacity
const styles = StyleSheet.create({
  touchableArea: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    // shadowOffset: { height: 30, width: 30 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, // IOS,
    // backgroundColor: 'blue',
    elevation: 2 // Android
    // height: 50,
    // width: 100,
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'row'
  }
})
export const WefiqTouchableHighlight = ({disabled, style, ...props}) => (
  <TouchableHighlight style={style} underlayColor={'rgba(173,216,230 ,0.15 )'} activeOpacity={0.3} disabled={disabled} onPress={_.debounce(props.onPress, 2000)} {...props}>{props.children}</TouchableHighlight>
)
