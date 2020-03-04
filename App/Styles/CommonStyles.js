import { StyleSheet } from 'react-native'
import Colors from './Colors'

export const appStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  alignCenterWithColor: {
    flex: 1,
    backgroundColor: '#4bb5d4',
    alignItems: 'center',
    justifyContent: 'center'
  },
  alignCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  alignCenterWithoutFlex: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  alignCenterWithSpace: {
    flex: 1,
    backgroundColor: '#4bb5d4',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  alignSelfCenter: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexWithSpace: {
    flex: 1,
    justifyContent: 'space-between'
  },
  commonFont: {
    fontFamily: 'SourceSansPro-Regular',
    color: Colors.White
  },
  commonFontSemiBold: {
    fontFamily: 'SourceSansPro-SemiBold'
  },
  commonFontBold: {
    fontFamily: 'SourceSansPro-Bold'
  },
  headerCenterText: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 16
  },
  defaultFontColor: {
    color: Colors.WefiqText
  },
  whiteFontColor: {
    color: Colors.White
  },
  defaultFontFamily: {
    fontFamily: 'SourceSansPro-Regular'
  },
  defaultFontFamilyBold: {
    fontFamily: 'SourceSansPro-Bold'
  },
  alignCenterWithBackground: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  verticalAlignCenter: {
    justifyContent: 'center'
  },
  horizontalAlignCenter: {
    alignItems: 'center'
  },
  horizontalView: {
    flexDirection: 'row'
  },
  searchSegments: {
    width: '33.33%',
    height: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  absolutePosition: {
    position: 'absolute'
  }
})
