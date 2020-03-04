import React from 'react'
import { withNavigation } from 'react-navigation'
import { View, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import ButtonTransparent from '../../Components/Buttons/ButtonTransparent'
import Colors from '../../Styles/Colors'
import styled from 'styled-components/native'
import AvatarView from '../../Components/AvatarView/AvatarView'
import DeviceSizes from '../../Styles/DeviceSizes'
import Loading from '../../Components/Loader/Loader'
import { withAuth } from '../../Redux/hoc/withAuth/withAuth'
import WefiqAlert from '../../Components/Alert'
import NavigationService from '../../Navigation/navigationService'

class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fellowship_uuid: props.user.fellowship_uuid
    }
  }
  static navigationOptions = {
    header: null
  };
  followUser=() => {
    if (!this.props.isUserLoggedIn) {
      return WefiqAlert({ title: 'Oh no!!!', message: 'You must be LoggedIn to Follow someone', onOK: () => NavigationService.navigate('Login', { onChangeLoginState: () => null }) })
    }
    this.setState({ fellowship_uuid: 'id' })
    this.props.followUser()
  }
  unFollowUser=() => {
    this.setState({ fellowship_uuid: null })
    this.props.unFollowUser()
  }
  render () {
    const { user } = this.props
    console.log('Profile', this.props)
    const { fellowship_uuid } = this.state
    if (!user) {
      return <Loading />
    }
    return (
      <View>
        <EditeProfileView>
          <AvatarView
            userName={this.props.userName}
            loggedInUserInfo={this.props.userInfo}
            isUserLoggedIn={this.props.isUserLoggedIn}
            uri={{uri: user.picture_url || user.pictureUrl}}
            onPress={() => alert('Hi, Edit Profile will be implemented soon')}
            height='78px'
            width='78px'
            radius='39px'
          />
          <InfoView >
            {/* <NameText>{user.profile_name || user.full_name }</NameText> */}
            <SkillText ellipsizeMode='tail' numberOfLines={2}>{user.about}</SkillText>
            <HorizontelView>
              {/* <MaterialCommunityIcons style={{bottom: 10, right: 5}} name='map-marker-radius' color={Colors.appColor} size={30} /> */}
              <Location ellipsizeMode='tail' numberOfLines={1}>{user.location}{user.geo_data}</Location>
            </HorizontelView>

            <HorizontelViewWithMargin>
              <TouchableOpacity onPress={() => this.props.navigation.push('FollowersList', { userId: this.props.userId })}>
                <FollowCount>
                  {user.followers_count || user.followersCount} <FollowText>Followers</FollowText>
                </FollowCount>
              </TouchableOpacity>
              <Seprator />
              <TouchableOpacity onPress={() => this.props.navigation.push('FollowingList', { userId: this.props.userId })}>
                <FollowCount>
                  {user.followings_count || user.followingsCount} <FollowText>Following</FollowText>
                </FollowCount>
              </TouchableOpacity>
            </HorizontelViewWithMargin>
          </InfoView>
        </EditeProfileView>
        { this.props.userName !== this.props.userInfo.name &&
          <ButtonView>
            <ButtonTransparent
              borderColor={Colors.profileButtons}
              icon={<MaterialIcons name='mail' color={Colors.profileButtons} size={20} />}
              height={DeviceSizes.DEVICE_HEIGHT * 0.05}
              width={DeviceSizes.DEVICE_WIDTH * 0.40}
              titleColor={Colors.profileButtons}
              title='Send Message'
            />
            <ButtonTransparent
              onPress={() => fellowship_uuid !== null ? this.unFollowUser() : this.followUser()}
              borderColor={(fellowship_uuid !== null) ? Colors.Transparent : Colors.profileButtons}
              btnColor={(fellowship_uuid !== null) ? Colors.appColor : Colors.Transparent}
              title={(fellowship_uuid !== null) ? 'Following' : 'Follow'}
              icon={((fellowship_uuid !== null) ? <FontAwesome5 name='user-check' size={15}
                color={(fellowship_uuid !== null) ? Colors.White : Colors.profileButtons} />
                : <FontAwesome5 name='user-plus' size={15} color={Colors.profileButtons} />)}
              height={DeviceSizes.DEVICE_HEIGHT * 0.05}
              width={DeviceSizes.DEVICE_WIDTH * 0.40}
              titleColor={(fellowship_uuid !== null) ? Colors.White : Colors.profileButtons}
            />
            {/* <ButtonTransparent */}
            {/* borderColor={Colors.appColor} */}
            {/* title='More info' */}
            {/* height={DeviceSizes.DEVICE_HEIGHT * 0.05} */}
            {/* width={DeviceSizes.DEVICE_WIDTH * 0.30} */}
            {/* /> */}
          </ButtonView>
        }
      </View>
    )
  }
}
export default withNavigation(withAuth(Profile))
const EditeProfileView = styled.View`
margin-left: 20px;
flex-direction: row;
justify-content: flex-start;
`
const InfoView = styled.View`
margin-left: 20px;
`
const NameText = styled.Text`
font-family: SourceSansPro-Regular;
font-size: 16px;
font-weight: bold;
color: ${Colors.WefiqText};
`
const HorizontelView = styled.View`
flex-direction: row;
`
const SkillText = styled.Text`
font-family: SourceSansPro-Regular;
font-size: 14px;
margin-bottom: 5px;
width: ${DeviceSizes.DEVICE_WIDTH * 0.6};
color: ${props => props.theme.skillText};
margin-right: 20px;
height: 40px
`
const Location = styled.Text`
font-family: SourceSansPro-Regular;
font-size: 14px;
width: ${DeviceSizes.DEVICE_WIDTH * 0.6};
color: ${props => props.theme.skillText};
margin-right: 20px;
`
const ButtonView = styled.View`
flex-direction: row;
justify-content: space-around;
width: ${DeviceSizes.DEVICE_WIDTH};
margin-top: 10px;
`
const Seprator = styled.View`
margin-left: 25px;
margin-right: 25px;
`
const FollowCount = styled.Text`
font-size: 16px;
font-family: SourceSansPro-SemiBold;
text-decoration: underline;
text-decoration-color: ${Colors.skillText};
`
const FollowText = styled.Text`
font-size: 16px;
font-family: SourceSansPro-Regular;
color: ${props => props.theme.skillText};

`
const HorizontelViewWithMargin = styled.View`
flex-direction: row;
margin-bottom: 0px;
`
