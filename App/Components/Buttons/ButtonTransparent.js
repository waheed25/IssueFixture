import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

const ButtonTransparent = ({onPress, title, icon, titleColor, btnColor, borderColor, style, disabled, height, width}) => (
  <TouchableOpacity onPress={onPress} disabled={disabled}>
    <ButtonView style={style} btnColor={btnColor} borderColor={borderColor} height={height} width={width} >
      <IconView>{icon}</IconView>
      <ButtonText titleColor={titleColor}>{title}</ButtonText>
    </ButtonView>
  </TouchableOpacity>
)
export default ButtonTransparent
const ButtonView = styled.View`
  background-color: ${props => props.btnColor ? props.btnColor : props.theme.Transparent};
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  border: 1px;
  border-radius: 3px;
  border-color: ${props => props.borderColor ? props.borderColor : props.theme.LightBlack};
  justify-content: center;
  align-items: center;
  flex-direction: row;
`
const ButtonText = styled.Text`
color: ${props => props.titleColor ? props.titleColor : props.theme.appColor};
font-size: 14px
font-family: SourceSansPro-Regular;
margin-left: 5px;
`
const IconView = styled.View`
right: 5px
`
