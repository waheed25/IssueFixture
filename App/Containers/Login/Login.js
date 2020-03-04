import React from 'react'
import { AsyncStorage, TouchableOpacity, Alert, Platform, Linking } from 'react-native'
import apisauce from 'apisauce'
import _ from 'lodash'
import { withNavigation } from 'react-navigation'
import styled from 'styled-components/native'
import { withAuth } from '../../Redux/hoc/withAuth/withAuth'
import Colors from '../../Styles/Colors'
import Sizes from '../../Styles/DeviceSizes'
import ButtonWithGradiant from '../../Components/Buttons/ButtonWithGradiant'
import Input from '../../Components/TextInput/Input'
import ImageBackground from '../../Components/WefigBackground/BackgroundImage'
import Button from '../../Components/Buttons/ButtonColor'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Images from '../../Images/rootImages'
import Wefiq from '../../Components/CustomIcons/CustomIcons'
import { GoogleSignin } from '@react-native-community/google-signin'
import { hitSlop } from '../../Utils/hitslop'
import SpinnerOverly from 'react-native-loading-spinner-overlay'
import NavigationService from '../../Navigation/navigationService'
import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'
import WefiqBaseAPIs from '../../Services/data/base-api'
const token = 'EAAEGcTAiZBo0BAEEhcBZCV7qUTNbK2I3DcCClu9yY3NYe24kXwIU0i2omC2JaXVC4Xtbv4oSphxfq8tZBbB4PsqLofO5sLEQL8OI1RKPllvDiLs2pDLCchNc1vteX7cH2QhkkhZCdH867S04CdG0Kg75iYGuLQragC03p8iPrJ0L8RIEuZCpPgS7XFvvZAGcTkxDZCtOF37fJcZAMkhqBzc4X2t2NgD5oVxYpCNT8hXlTAZDZD'
class Auth extends React.Component {
  constructor (props) {
    super()
    this.state = {
      checked: true,
      mail: '',
      pass: '',
      disabled: false,
      displayed: false,
      loadingGoogleAuth: false,
      loadingFacebookAuth: false
    }
    this.handleLogin = this.handleLogin.bind(this)
    // this.onChangeLoginState = props.navigation.state.params.onChangeLoginState
    // this.uploadRoute = props.navigation.state.params.navigatingFromUpload
    this.api = new WefiqBaseAPIs()
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
  //
  // }
  async componentWillReceiveProps (nextProps, nextContext) {
    const { navigation } = this.props
    const { data, isLoading } = nextProps
    if (!(Object.entries(data).length === 0 && data.constructor === Object) && !isLoading) {
      // console.log('data is ::', data)
      try {
        // this.api._getAPIResource.setHeader('Authorization', 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1Njk1ODE3NjgsImV4cCI6MTU3MDE4NjU2OCwiZHJ1cGFsIjp7InVpZCI6IjM3NiJ9fQ.dQwgrTJD7zFEagLFX7g35bbrtzUKRhwwOTTNkPm6cCU')
        // this.api._getAPIResource().addRequestTransform(request => { request.headers['Authorization'] = `Bearer ${data.data.attributes.token}`})
        this.props.changeAuthStatus({ login: true, loginData: data })
        await AsyncStorage.setItem('loginCredentials', JSON.stringify(data))
        // navigation.state.params.onChangeLoginState(true, data)
        navigation.goBack()
      } catch (e) {
        // console.log('error found::', e)
      }
    }
    if (nextProps.error && this.props.navigation.isFocused()) {
      this.setState({ isLoading: false, disabled: false, loadingGoogleAuth: false })
      setTimeout(() => Alert.alert(nextProps.error), 100)
    }
  }
  showPassword () {
    this.setState({visible: !this.state.visible})
  }
  // 210123810570-rjvfjf3ne9rpe51hbrirgasptl6po2p1.apps.googleusercontent.com // QA
  // 953772650722-ujv54vv0ic3as9nf2cd1por6ci52lbp5.apps.googleusercontent.com // DEV
  async componentDidMount () {
    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '210123810570-kh73mmvtsgfqhuop1jvceijbr8n36m5v.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      accountName: '' // [Android] specifies an account name on the device that should be used
      // iosClientId: 'com.googleusercontent.apps.979100504961-tplh2ugc16e3cq843nn3kn3hmronvn5t' // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    })
    const userInfo = await AsyncStorage.getItem('credentials')
    if (userInfo !== null) {
      const parseInfo = JSON.parse(userInfo)
      this.setState({ mail: parseInfo.mail, pass: parseInfo.pass })
    }
  }
  handleLogin = () => {
    const { mail, pass } = this.state
    this.setState({ disabled: true, displayed: false })
    const { authUser } = this.props
    const data = {
      type: 'user',
      attributes: {
        mail: mail.replace(/\s+$/, ''),
        pass: pass
      }}
    authUser({data})
  }
  handleCheckBox=async () => {
    let credentials = {
      mail: this.state.mail,
      pass: this.state.pass
    }
    this.setState({checked: !this.state.checked}, async () => {
      if (this.state.checked) {
        await AsyncStorage.setItem('credentials', JSON.stringify(credentials))
      }
      if (!this.state.checked) {
        const havePreviousCredentials = await AsyncStorage.getItem('credentials')
        if (havePreviousCredentials === null) {

        } else {
          await AsyncStorage.removeItem('credentials')
        }
      }
    })
  }

  shouldComponentUpdate (nextProps, nextState, nextContext) {
    if (nextProps !== this.props || nextState !== this.state) {
      return true
    } else {
      return false
    }
  }
  // Somewhere in your code
  _signIn = async () => {
    this.setState({loadingGoogleAuth: true})
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      const data = { data: { attributes: { 'google_reg_code': userInfo.serverAuthCode, platform: 'mobile' } } }
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
      console.error(error)
    }
  };
  error=() => {
    this.setState({ displayed: true, disabled: false })
    Alert.alert(this.props.error.data.errors[0].detail)
  }
  goBack=() => {
    this.props.navigation.goBack()
  }
  openBrowser=()=>{
    debugger
    Linking.openURL('https://dev.wefiq.com/user/password-recovery')
  }
  render () {
    const { checked, mail, pass, disabled, loadingGoogleAuth, loadingFacebookAuth } = this.state
    const { isLoading } = this.props
    return (
      <ImageBackground source={Images.loginBg}>
        <LoginRootView keyboardShouldPersistTaps='always'>
          <SpinnerOverly visible={loadingFacebookAuth || loadingGoogleAuth || isLoading} />
          <TouchableOpacity hitSlop={hitSlop} onPress={() => this.props.navigation.navigate('Home')}>
            <ArrowBAck>
              <MaterialIcons name='arrow-back' size={25} color='black' />
            </ArrowBAck>
          </TouchableOpacity>
          <AlignCenter>
            <Wefiq name='wefiq-icon' size={66} color={Colors.appColor} />
            <WefiqTitle> Welcome to Wefiq</WefiqTitle>
            <LoginTitle>Sign in to continue</LoginTitle>
          </AlignCenter>
          <InputWithIconContainer style={{ marginBottom: Sizes.DEVICE_HEIGHT * 0.02 }}>
            <InputIcon name='mail' color={Colors.LoginColorIcon} size={24} />
            <Input
              keyboardType='email-address'
              autoCapitalize='none'
              placeholder='Your Email or User name'
              onChange={(mail) => this.setState({mail})}
              value={mail}
            />
          </InputWithIconContainer>
          <InputWithIconContainer style={{ marginBottom: Sizes.DEVICE_HEIGHT * 0.02 }}>
            <InputIcon name='lock' color={Colors.LoginColorIcon} size={24} />
            <Input
              placeholder='Your Password'
              onChange={(pass) => this.setState({pass})}
              value={pass}
              secureTextEntry
            />
          </InputWithIconContainer>
          <HorizontelView style={{ right: 10 }}>
            {/* <TouchableOpacity style={{flexDirection: 'row'}} hitSlop={hitSlop} onPress={this.handleCheckBox}> */}
            {/* <CheckBox */}
            {/* style={{ borderRadius: 3 }} */}
            {/* color={Colors.appColor} */}
            {/* checked={checked} */}
            {/* onPress={this.handleCheckBox} */}
            {/* /> */}
            {/* <LoggedInText> */}
            {/* Keep me logged in. */}
            {/* </LoggedInText> */}
            {/* </TouchableOpacity> */}
          </HorizontelView>
          <ButtonWithGradiant
            onPress={() => this.handleLogin()}
            disabled={disabled}
            // loading={isLoading}
            title='Sign in'
            style={{marginTop: Sizes.DEVICE_HEIGHT * 0.03, marginBottom: Sizes.DEVICE_HEIGHT * 0.02}}
          />
          <TouchableOpacity onPress={()=> this.openBrowser()}>
            <HorizontelViewCenter style={{marginBottom: Sizes.DEVICE_HEIGHT * 0.04}}>
              <ForgotPasswordText>
                {`Forgot password?${' '}`}
              </ForgotPasswordText>
              <ForgotPasswordLink>
                Recover here
              </ForgotPasswordLink>
            </HorizontelViewCenter>
          </TouchableOpacity>
          <HorizontelViewCenter>
            <RoundView>
              <SperatorText>OR</SperatorText>
            </RoundView>
            <VerticalSeprator />
          </HorizontelViewCenter>
          <ContinueWithSocial>Continue with social authentication</ContinueWithSocial>
          <ButtonView>
            <Button
              icon={<MaterialCommunityIcons name='facebook' color={Colors.White} size={30} />}
              style={{marginBottom: Sizes.DEVICE_HEIGHT * 0.03}}
              // loading={loadingFacebookAuth}
              borderColor='transparent'
              height={46} width={Sizes.DEVICE_WIDTH * 0.40}
              onPress={() => this.onFbLogin()}
              btnColor='#3b5998' />
            <Button
              onPress={() => this._signIn()}
              icon={<MaterialCommunityIcons name='google-plus' color={Colors.White} size={30} />}
              // loading={loadingGoogleAuth}
              borderColor='transparent'
              height={46} width={Sizes.DEVICE_WIDTH * 0.40}
              btnColor='#DB4437'
            />
          </ButtonView>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp', { onChangeLoginState: this.onChangeLoginState })}>
            <HorizontelViewCenter>
              <ForgotPasswordText size={16}>
                {`Don’t have an account?${' '}`}
              </ForgotPasswordText>
              <ForgotPasswordLink size={16}>
                Signup here
              </ForgotPasswordLink>
            </HorizontelViewCenter>
          </TouchableOpacity>
        </LoginRootView>
      </ImageBackground>

    )
  }
}
export default withNavigation(withAuth(Auth))
const AlignCenter = styled.View`
align-items: center
`
const ButtonView = styled.View`
flex-direction: row;
justify-content: space-between;
margin-top: ${Sizes.DEVICE_HEIGHT * 0.05};
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

const LoginRootView = styled.ScrollView`
flex: 1;
padding-right: 30px;
padding-left: 30px;
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
const ArrowBAck = styled.View`
margin-top: 35px;
right: 5px;
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
const ContinueWithSocial = styled.Text`
alignSelf: center;
top: 20px;
font-size: 16px;
font-family: SourceSansPro-Regular;
color: ${Colors.WefiqText};
`
