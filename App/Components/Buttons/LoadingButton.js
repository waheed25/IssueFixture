import React from 'react'
import { TouchableOpacity, ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'
import DeviceSizes from '../../Styles/DeviceSizes'

const ButtonTransparent = ({onPress, title, icon, titleColor, btnColor, borderColor, style, disabled, loading}) => (
  <TouchableOpacity onPress={onPress} disabled={disabled}>
    <ButtonView style={style} btnColor={btnColor} borderColor={borderColor}>
      { loading &&
      <ActivityIndicator style={{right: 20}} size='small' color='#fff' />
      }
      <ButtonText titleColor={titleColor}>{title}</ButtonText>
    </ButtonView>
  </TouchableOpacity>
)
export default ButtonTransparent
const ButtonView = styled.View`
  background-color: ${props => props.btnColor ? props.btnColor : props.theme.Transparent};
  height: ${DeviceSizes.DEVICE_HEIGHT * 0.06}
  width: ${DeviceSizes.DEVICE_WIDTH * 0.45}
  border: 1px;
  border-radius: 3px;
  border-color: ${props => props.borderColor ? props.borderColor : props.theme.LightBlack};
  justify-content: center;
  align-items: center;
  flex-direction: row
`
const ButtonText = styled.Text`
color: ${props => props.titleColor ? props.titleColor : props.theme.appColor};
font-size: 16px
font-family: SourceSansPro-Regular
`
