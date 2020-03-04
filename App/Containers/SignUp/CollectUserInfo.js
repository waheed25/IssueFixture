import React from 'react'
import { AsyncStorage, TouchableOpacity, Alert, Text, View, KeyboardAvoidingView } from 'react-native'
import { DatePicker } from 'native-base'
import _ from 'lodash'
import styled from 'styled-components/native'
import { withAuth } from '../../Redux/hoc/withAuth/withAuth'
import Colors from '../../Styles/Colors'
import Sizes from '../../Styles/DeviceSizes'
import ButtonWithGradiant from '../../Components/Buttons/ButtonWithGradiant'
import Input from '../../Components/TextInput/Input'
import ImageBackground from '../../Components/WefigBackground/BackgroundImage'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Images from '../../Images/rootImages'
import Wefiq from '../../Components/CustomIcons/CustomIcons'
import { GoogleSignin } from '@react-native-community/google-signin'
import { hitSlop } from '../../Utils/hitslop'
import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'
import SpinnerOverly from 'react-native-loading-spinner-overlay'
import CookieManager from 'react-native-cookies'
import moment from 'moment'
const token = 'EAAEGcTAiZBo0BAEEhcBZCV7qUTNbK2I3DcCClu9yY3NYe24kXwIU0i2omC2JaXVC4Xtbv4oSphxfq8tZBbB4PsqLofO5sLEQL8OI1RKPllvDiLs2pDLCchNc1vteX7cH2QhkkhZCdH867S04CdG0Kg75iYGuLQragC03p8iPrJ0L8RIEuZCpPgS7XFvvZAGcTkxDZCtOF37fJcZAMkhqBzc4X2t2NgD5oVxYpCNT8hXlTAZDZD'
class Auth extends React.Component {
  constructor (props) {
    super()
    this.state = {
      checked: true,
      mail: props.navigation.state.params.mail,
      pass: '',
      disabled: false,
      dateOfBirth: '',
      displayName: '',
      displayed: false,
      loadingGoogleAuth: false,
      loadingFacebookAuth: false,
      hidePass: true
    }
    this.handleSignUp = this.handleSignUp.bind(this)
    this.onChangeLoginState = props.navigation.state.params.onChangeLoginState
  }
  static navigationOptions = {
    header: null
  };
  // _responseInfoCallback(error: ?Object, result: ?Object) {
  //   if (error) {
  //     console.log('Error fetching data: ' + error.toString());
  //   } else {
  //     console.log('Success fetching data: ' + result.toString());
  //   }
  // }
  onFbLogin = () => {
    this.setState({ loadingFacebookAuth: true })
    LoginManager.logInWithPermissions(['email', 'public_profile']).then(
      (result) => {
        // console.log(result)
        if (result.isCancelled) {
          this.setState({ loadingFacebookAuth: false })
          return null
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            // console.log(data)
            if (data.accessToken) {
                // this.setState({token: data.accessToken})
              new GraphRequestManager().addRequest(req).start()
                // Alert.alert(data.accessToken)
            }
          }
          )
        }
      },
      (error) => {
        this.setState({ loadingFacebookAuth: false })
        Alert.alert(error)
      }
    )
    let req = new GraphRequest('/me', {
      httpMethod: 'GET',
      version: 'v2.5',
      parameters: {
        'fields': {
          'string': 'email,name,friends,picture'
        }
      }
    }, (err, res) => {
      // console.log('thank god data fetched', err, res)
      if (res) {
        const data = {
          data: {
            attributes: {
              fb_email: res.email,
              fb_user_id: res.id,
              fb_pic_url: res.picture.data.url,
              fb_name: res.name,
              fb_accessToken: token

            }
          }
        }
        this.props.facebookAuth(data)
      }
      if (err) {
        this.setState({ loadingFacebookAuth: false })
        Alert.alert(err)
      }
    })
  }
  // static getDerivedStateFromProps (nextProps, prevState) {
  //   if (nextProps.data !== props.data) {
  //     return { data: nextProps.data}
  //   } else return null
  // }
  // async componentDidUpdate () {
  //   const { data, isLoading, navigation } = this.props
  //   if (!_.isEmpty(data) && !isLoading) {
  //     console.log('data is ::', data)
  //     try {
  //       // this.setState({disabled: false})
  //       await AsyncStorage.setItem('loginCredentials', JSON.stringify(data))
  //       this.onChangeLoginState(true, data)
  //       navigation.goBack()
  //     } catch (e) {
  //       console.log('error found::', e)
  //     }
  //   }
  // }
  showPassword () {
    this.setState({visible: !this.state.visible})
  }
  componentDidMount () {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '210123810570-rjvfjf3ne9rpe51hbrirgasptl6po2p1.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      accountName: '' // [Android] specifies an account name on the device that should be used
      // iosClientId: 'com.googleusercontent.apps.979100504961-tplh2ugc16e3cq843nn3kn3hmronvn5t' // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    })
  }
  handleSignUp = async() => {
    const { mail, pass, displayName, dateOfBirth } = this.state
    if (pass === '') {
      return Alert.alert('Please Enter Your Password')
    }
    if (displayName === '') {
      return Alert.alert('Please Enter Your Display Name')
    }
    await CookieManager.clearAll()
    this.setState({ disabled: true, displayed: false })
    const { signUp } = this.props

    const data = {
      type: 'user',
      attributes: {
        access: ['creator'],
        mail: mail,
        pass: pass,
        name: displayName,
        dob: moment(dateOfBirth).format()
      }}
    signUp({data})
  }
  handleCheckBox=() => {
    this.setState({checked: !this.state.checked})
  }

  // Somewhere in your code
  _signIn = async () => {
    this.setState({ loadingGoogleAuth: true })
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      // console.log('userInfo', userInfo)
      const data = { data: { attributes: { 'google_reg_code': userInfo.serverAuthCode } } }
      this.props.googleAuth(data)
      this.signOut()
    } catch (error) {
      // console.log('error', error)
      // Alert.alert('Something went wrong')
      this.setState({ loadingGoogleAuth: false })
      // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      //   debugger
      //   // user cancelled the login flow
      // } else if (error.code === statusCodes.IN_PROGRESS) {
      //   debugger
      //   // operation (f.e. sign in) is in progress already
      // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      //   debugger
      //   // play services not available or outdated
      // } else {
      //   debugger
      //   // some other error happened
      // }
    }
  };
  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess()
      await GoogleSignin.signOut()
      this.setState({ user: null }) // Remember to remove the user from your app's state as well
    } catch (error) {
      // console.error(error)
    }
  };
  async componentWillReceiveProps (nextProps, nextContext) {
    const { navigation } = this.props
    const { data, isLoading } = nextProps

    if (!(Object.entries(data).length === 0 && data.constructor === Object) && !isLoading) {
      // console.log('data is ::', data)
      try {
        this.props.changeAuthStatus({ login: true, loginData: data })
        await AsyncStorage.setItem('loginCredentials', JSON.stringify(data))
        navigation.state.params.onChangeLoginState(true, data)
        navigation.goBack()
      } catch (e) {
        console.log('error found::', e)
      }
    }
    debugger
    if (nextProps.error) {
      this.setState({ isLoading: false, disabled: false })
      setTimeout(() => Alert.alert(nextProps.error), 100)
    }
  }
  // error=() => {
  //   debugger
  //   this.setState({ displayed: true, disabled: false })
  //   Alert.alert(this.props.error.data.errors[0].detail)
  // }
  setDate =(newDate) => {
    this.setState({ dateOfBirth: newDate.toString() })
  }
  goBack=() => {
    this.props.navigation.goBack()
  }
  showPass=() => {
    this.setState({ hidePass: !this.state.hidePass })
  }
  render () {
    const { name, pass, disabled, mail, hidePass } = this.state
    const { isLoading } = this.props
    // console.log('Sign up data')
    return (
      <ImageBackground source={Images.loginBg}>
        <LoginRootView enabled behavior='padding' keyboardVerticalOffset={100}>
          <SpinnerOverly visible={isLoading} />
          <TouchableOpacity hitSlop={hitSlop} onPress={() => this.goBack()}>
            <ArrowBAck>
              <MaterialIcons name='arrow-back' size={25} color='black' />
            </ArrowBAck>
          </TouchableOpacity>
          <AlignCenter style={{ marginBottom: 30 }}>
            <Wefiq name='wefiq-icon' size={66} color={Colors.appColor} />
            <WefiqTitle>Get Started with Wefiq</WefiqTitle>
          </AlignCenter>
          <InputWithIconContainer style={{ marginBottom: Sizes.DEVICE_HEIGHT * 0.03 }}>
            <InputIcon name='mail' color={Colors.GraySaldo} size={24} />
            <Input
              style={{ backgroundColor: '#D3D3D3', opacity: 0.5 }}
              editable={false}
              onChange={(mail) => this.setState({mail})}
              value={mail}
              placeholder={'Enter your email'}
            />
          </InputWithIconContainer>
          <View style={{ height: 1, backgroundColor: Colors.WefiqBorder, marginBottom: 20 }} />
          <InputWithIconContainer style={{ marginBottom: Sizes.DEVICE_HEIGHT * 0.03 }}>
            <LabelText>Choose your display name</LabelText>
            <InputIconRight color={Colors.LoginColorIcon} size={24} />
            <Input
              style={{paddingLeft: 20}}
              placeholder='Display Name'
              onChange={(displayName) => this.setState({displayName})}
              value={name}
            />
          </InputWithIconContainer>
          <InputWithIconContainer style={{ marginBottom: Sizes.DEVICE_HEIGHT * 0.02 }}>
            <LabelText>Choose your Password</LabelText>
            {/* <TouchableOpacity style={{zIndex: 10}} hitSlop={hitSlop} onPress={() => this.showPass()}> */}
            {/* <InputIconRight style={{ top: 10 }} name='remove-red-eye' color={Colors.LoginColorIcon} size={24} /> */}
            {/* </TouchableOpacity> */}
            <Input
              style={{ paddingLeft: 20 }}
              placeholder='Password'
              onChange={(pass) => this.setState({pass})}
              value={pass}
              secureTextEntry={hidePass}
            />
          </InputWithIconContainer>
          <LabelText>Date of Birth</LabelText>
          <DataPickerContainer>
            <InputIconRight name='date-range' color={Colors.LoginColorIcon} size={24} />
            <CustomDatePicker
              // defaultDate={new Date(2007, 1, 1)}
              // minimumDate={new Date(2007, 1, 1)}
              maximumDate={new Date(2007, 1, 1)}
              locale={'en'}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={'fade'}
              androidMode={'default'}
              placeHolderText={'Select a Date'}
              textStyle={{ color: 'black' }}
              placeHolderTextStyle={{ color: '#d3d3d3', fontFamily: 'SourceSansPro-Regular' }}
              onDateChange={this.setDate}
              disabled={false}
            />
          </DataPickerContainer>
          <ButtonWithGradiant
            onPress={() => this.handleSignUp()}
            // disabled={disabled}
            // loading={isLoading}
            title='Get Started'
            style={{ marginTop: Sizes.DEVICE_HEIGHT * 0.03, marginBottom: Sizes.DEVICE_HEIGHT * 0.02 }}
          />
        </LoginRootView>
      </ImageBackground>

    )
  }
}
export default withAuth(Auth)

const DataPickerContainer = styled.View`
border-width: 1px;
border-color: ${Colors.WefiqBorder};
height: 45px;
background-color: transparent;
padding-left: 10px
`

const AlignCenter = styled.View`
align-items: center
`
const ButtonView = styled.View`
flex-direction: row;
justify-content: space-between;
margin-top: ${Sizes.DEVICE_HEIGHT * 0.05};
`
const LabelText = styled(Text)`
fontWeight: 600;
fontSize: 13px;
marginBottom: 5px
`
const CustomDatePicker = styled(DatePicker)`
position: absolute;
height: 200;
background-color: transparent;
`

const WefiqTitle = styled.Text`
font-size: 22px;
color: ${Colors.WefiqText};
font-family: SourceSansPro-Regular;
margin-top: ${Sizes.DEVICE_HEIGHT * 0.03}
`
const HorizontelView = styled.View`
flex-direction: row;
width: 100%;
`
const HorizontelViewCenter = styled.View`
flex-direction: row;
align-items: center;
justify-content: center;
`
const LoginTitle = styled.Text`
font-size: 14px;
font-family: SourceSansPro-Regular;
margin-top: 5px;
color: #383838;
margin-bottom: ${Sizes.DEVICE_HEIGHT * 0.04};
`

const LoginRootView = styled(KeyboardAvoidingView)`
flex: 1;
margin-top: ${Sizes.DEVICE_HEIGHT * 0.01};
margin-right: 30px;
margin-left: 30px;
margin-bottom: ${Sizes.DEVICE_HEIGHT * 0.02};
`
const InputWithIconContainer = styled.View`
width: 100%;
`
const InputIcon = styled(MaterialIcons)`
position: absolute;
z-index: 1;
top: 10px;
left: 12px;
`
const InputIconRight = styled(MaterialIcons)`
position: absolute;
z-index: 1;
top: 10px;
right: 12px;
`
const LoggedInText = styled.Text`
font-size: 16px;
font-family: SourceSansPro-Regular;
margin-left: 20px;
color: ${Colors.WefiqText};
`
const ForgotPasswordText = styled.Text`
color: ${Colors.WefiqText};
font-size: ${props => props.size ? props.size : 14};
font-family: SourceSansPro-Regular;
`
const ForgotPasswordLink = styled.Text`
color:${Colors.appColor};
font-size: ${props => props.size ? props.size : 14};
font-family: SourceSansPro-Regular;
`
const VerticalSeprator = styled.View`
height: 1px;
width: 100%;
background: ${Colors.GraySaldo};
`
const RoundView = styled.View`
justify-content: center;
align-items: center;
height: 36px;
width: 36px;
background: ${Colors.White};
border-radius: 25px;
font-size: 14px;
font-family: SourceSansPro-Regular;
position: absolute;
align-self: center;
z-index: 1px;
left: 43%;
border: solid;
border-color: ${Colors.GraySaldo}
`
const SperatorText = styled.Text`
font-size: 14px;
font-family: SourceSansPro-Regular;
`
const ArrowBAck = styled.View`
margin-top: 25px;
right: 5px;
`
const ContinueWithSocial = styled.Text`
alignSelf: center;
top: 25px;
font-size: 16px;
margin-top: 10px;
font-family: SourceSansPro-Regular;
color: ${Colors.WefiqText};
`
