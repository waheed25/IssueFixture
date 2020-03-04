import React from 'react'
import { ActivityIndicator, View, Alert, StyleSheet, PermissionsAndroid } from 'react-native'
import * as Progress from 'react-native-progress'
import { withAuth } from '../../Redux/hoc/withAuth/withAuth'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import KeyBoardSpacer from 'react-native-keyboard-spacer'
import { WebView } from 'react-native-webview'
import NavigationService from '../../Navigation/navigationService'
import Colors from '../../Styles/Colors'
class Upload extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      token: '',
      loading: true,
      modalVisible: false,
      Cancelled: false,
      notLoggedIn: false,
      progress: 0,
      webViewOpacity: 1
    }
  }
  async componentDidMount () {
    this.props.navigation.addListener('willFocus', (playload) => {
      if (!this.props.isUserLoggedIn) {
        // this.userNotLoggedIn()
        NavigationService.navigate('Login', { onChangeLoginState: this.onChangeLoginState, navigatingFromUpload: true })
      }
    })
    if (!this.props.isUserLoggedIn && !this.props.userInfo) {
      this.setState({ notLoggedIn: true })
    } else {
      const token = this.props.userInfo.token
      this.setState({ token })
    }

    await this.requestCameraPermission()
  }
  async requestCameraPermission () {
    try {
      const granted = await PermissionsAndroid.requestPermission(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          'title': 'Cool Photo App Camera Permission',
          'message': 'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.'
        }
      )
      if (granted) {
        console.log('You can use the camera')
      } else {
        console.log('Camera permission denied')
      }
    } catch (err) {
      console.warn(err)
    }
  }
  message = (e) => {
    const messageData = JSON.parse(e.nativeEvent.data)
    debugger
    if (messageData.type === 'cancelled') {
      this.setState({ Cancelled: true })
    }
    if (messageData.type === 'published') {
      // Alert.alert('Creation Uploaded Successfully')
      NavigationService.navigate('Profile', { ProfileInfo: this.props.userInfo })
    }
  }
  onChangeLoginState= async (state, data) => {
    this.setState({ notLoggedIn: false, token: data.data.attributes.token })
  }
  userNotLoggedIn=() => (Alert.alert(
    'You Must be LoggedIn for Upload Creation',
    '',
    [
      {
        text: 'Cancel',
        onPress: () => this.props.navigation.goBack(),
        style: 'cancel'
      },
      {text: 'OK', onPress: () => NavigationService.navigate('Login', { onChangeLoginState: this.onChangeLoginState })}
    ],
    {cancelable: false}
  ))
  render () {
    const { webViewOpacity, progress } = this.state
    console.log('upload::', `https://dev.wefiq.com/external/${this.props.userInfo.token}?redirect=/external/upload`)
    return (
      <React.Fragment>
        { !this.state.notLoggedIn &&
          <View style={{flex: 1}}>
            {/* <View style={styles.header}> */}
              {/* <TouchableOpacity onPress={() => this.props.navigation.goBack()}> */}
            {/* <View style={styles.closeBtn}> */}
            {/* <MaterialCommunityIcons color={Colors.Black} name='close-circle' size={15} /> */}
            {/* <Text style={styles.closetButtonText}>Close</Text> */}
            {/* </View> */}
              {/* </TouchableOpacity> */}
              {/* <Text style={styles.uploadText}>Upload</Text> */}
              {/* { progress === 0 && <View style={styles.emptyView} /> } */}
              {/* { progress > 0 && */}
            {/* <Progress.Circle color={Colors.appColor} thickness={1} textStyle={{fontSize: 9}} showsText progress={progress / 100} size={30} />} */}
            {/* </View> */}
            {!this.state.Cancelled &&
            <WebView
              javaScriptEnabled
              useWebKit
              originWhitelist={['*']}
              onLoad={() => this.setState({ loading: false })}
              // source={{html: '<input type="file" accept="image/*, video/*" />'}}
              source={{ uri: `https://dev.wefiq.com/external/${this.props.userInfo.token}?redirect=/external/upload` }}
              // style={{ marginTop: 0, opacity: webViewOpacity }}
              onMessage={event => this.message(event)}
              mediaPlaybackRequiresUserAction
            />
            }
            {
              this.state.loading &&
              <ActivityIndicator
                style={styles.activityIndicator}
                size='large'
                color={Colors.appColor}
              />
            }
            <KeyBoardSpacer />
          </View>
        }
      </React.Fragment>
    )
  }
}
export default withAuth(Upload)

const styles = StyleSheet.create({
  header: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10
  },
  closeBtn: {
    flexDirection: 'row'
  },
  uploadText: {
    fontSize: 16,
    right: 5,
    bottom: 5,
    fontWeight: '600',
    fontFamily: 'SourceSansPro-Regular'
  },
  closetButtonText: {
    bottom: 2,
    left: 3,
    fontFamily: 'SourceSansPro-Regular'
  },
  emptyView: {
    width: 35
  },
  activityIndicator: {
    position: 'absolute',
    top: '50%',
    left: '48%'
  }

})
