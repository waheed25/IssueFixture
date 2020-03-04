import React from 'react'
import { View, StyleSheet, ScrollView, InteractionManager, Text, PanResponder } from 'react-native'
import Sizes from '../../Styles/DeviceSizes'
import _ from 'lodash'
import Loading from '../../Components/Loader/Loader'
import ProfileView from './Profile'
import ProfileTabView from './ProfileTabs'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Header from '../../Components/Header/Header'
import styled from 'styled-components/native/dist/styled-components.native.esm'

class UserSpecificCreations extends React.Component {
  state={
    contentHeight: Sizes.DEVICE_HEIGHT
  }

  static navigationOptions = {
    header: null
  };
  componentWillMount () {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this.fScroll.setNativeProps({ scrollEnabled: false })
      },
      onPanResponderMove: () => {

      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: () => {
        this.fScroll.setNativeProps({ scrollEnabled: true })
      }
    })
  }
  render () {
    // const { user } = this.props.navigation.state.params.ProfileInfo
    console.log('data is:::::::::', this.props)
    console.log('state of data is:::::::::', this.state)
    if ((this.props.isLoading && this.props.data.length < 1) || (_.isUndefined(this.props.navigation.state.params.ProfileInfo))) {
      return (
        <Loading />
      )
    }
    var _scrollToBottomY
    return (

      <View style={{flexGrow: 1, flex: 1}}>
        <Header
          leftIcon={<MaterialIcons name='arrow-back' color='#fff' style={{left: 10}} size={24} />}
          leftIconPress={() => this.props.navigation.goBack()}
          rightSecondIcon={<MaterialIcons name='mail' color='#fff' size={24} />}
          rightFirstIcon={<MaterialIcons name='notifications' color='#fff' size={24} />}
          rightFirstIconPress={() => this.props.navigation.navigate('Notifications')}
          centerElement={<HeaderCenterText numberOfLines={1} ellipsizeMode='tail'>{this.props.navigation.state.params.ProfileInfo.user.profile_name}</HeaderCenterText>}
          {...this.props}
          />
        <ScrollView
          // nestedScrollEnabled
          stickyHeaderIndices={[1]}
          // ref={ref => this.scrollView = ref}
          // onContentSizeChange={(contentWidth, contentHeight) => {
          //   _scrollToBottomY = contentHeight
          // }}
          contentContainerStyle={{flexGrow: 1,
            }}
           >

          <ProfileView {...this.props.navigation.state.params.ProfileInfo} />
          <ProfileTabView {...this.props.navigation.state.params.ProfileInfo} />

        </ScrollView>
      </View>
    )
  }
}
const HeaderCenterText = styled.Text`
font-size: 16px;
color: #fff;
`
export default UserSpecificCreations
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  Thumbnail: {
    height: '75%',
    width: '100%',
    borderRadius: 6
  },
  CardStyle: {
    padding: 0,
    height: Sizes.DEVICE_HEIGHT * 0.35,
    width: Sizes.DEVICE_WIDTH * 0.93,
    borderRadius: 6,
    marginBottom: 15
  },
  title: {
    fontSize: 16,
    width: '80%',
    fontFamily: 'SourceSansPro-Regular',
    margin: 15,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: '600'
  },
  description: {
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  descriptionText: {
    color: '#C2C2C2',
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 14
  }

})
