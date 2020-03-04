import React from 'react'
import { TouchableOpacity, ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'

const ButtonTransparent = ({loaderColor, onPress, title, icon, titleColor, btnColor, borderColor, style, disabled, height, width, loading}) => (
  <TouchableOpacity onPress={onPress} disabled={disabled}>
    <ButtonView style={style} btnColor={btnColor} borderColor={borderColor} height={height} width={width} >
      {icon}
      <ButtonText titleColor={titleColor}>{title}</ButtonText>
      { loading && <Loader size='small' loaderColor={loaderColor} />
      }
    </ButtonView>
  </TouchableOpacity>
)
export default ButtonTransparent
const ButtonView = styled.View`
  background-color: ${props => props.btnColor ? props.btnColor : props.theme.Transparent};
  height: ${props => props.height};
  width: ${props => props.width};
  border: 1px;
  border-radius: 3px;
  border-color: ${props => props.borderColor ? props.borderColor : props.theme.LightBlack};
  justify-content: center;
  align-items: center;
  flex-direction: row;
`
const ButtonText = styled.Text`
color: ${props => props.titleColor ? props.titleColor : props.theme.White};
font-size: 16px
font-family: SourceSansPro-Regular
`

const Loader = styled(ActivityIndicator)`
color: ${props => props.loaderColor ? props.loaderColor : props.theme.appColor};
right: -20px
`
