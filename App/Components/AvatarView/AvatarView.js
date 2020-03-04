import React from 'react'
import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../Styles/Colors'
import { hitSlopCategoryCloseButton } from '../../Utils'

const RoundImage = ({ uri, height, width, radius, onPress, isUserLoggedIn, userName, loggedInUserInfo }) => (
  <AvatarContainer>
    <EditProfile>
      {isUserLoggedIn && userName === loggedInUserInfo.name &&
        <EditProfileButton hitSlop={hitSlopCategoryCloseButton} onPress={onPress}>
          <RoundView>
            <MaterialIcons name='edit' size={13} color={Colors.White} />
          </RoundView>
        </EditProfileButton>
        }
      <AvatarView source={uri} height={height} width={width} radius={radius} />
    </EditProfile>
  </AvatarContainer>
)

export default RoundImage

const AvatarView = styled.Image`
height: ${props => props.height};
width: ${props => props.width};
border-radius: ${props => props.radius};
border-width: 3px;
border-color: ${Colors.appColor};
`
const AvatarContainer = styled.View`
`
const EditProfile = styled.View`
`
const RoundView = styled.View`
height: 20px;
width: 20px;
border-radius: 10px;
background-color: ${Colors.appColor}
justify-content: center;
align-items: center;
position: absolute
right: 0;
`
const EditProfileButton = styled(TouchableOpacity)`
z-index: 10
`
