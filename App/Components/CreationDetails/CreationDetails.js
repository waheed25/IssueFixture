import React from 'react'
import {
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { withNavigation } from 'react-navigation'
class CreationDetails extends React.PureComponent {
  // shouldComponentUpdate (nextProps, nextState, nextContext) {
  //   if (nextProps.showDetails !== this.props.showDetails) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }
  render () {
    const { isShowingDetails, hideDetails, showDetails } = this.props
    return (
      <TouchableWithoutFeedback onPress={() => isShowingDetails ? hideDetails() : showDetails()}>
        <FastImage
          resizeMode='contain'
          source={{uri: this.props.imgUrl, static: true}}
          style={styles.image} />
      </TouchableWithoutFeedback>
    )
  }
}

export default withNavigation(CreationDetails)

const styles = StyleSheet.create({
  image: {
    height: '100%'
  }
})
