import React from 'react'
import styled from 'styled-components/native'
import Colors from '../../Styles/Colors'
const Input = ({placeholderTextColor, onChange, value, style, height, secureTextEntry, placeholder, editable, onFocus, keyboardType, autoCapitalize, autoFocus, onSubmitEditing, returnKeyType, autoCorrect}) => (
  <StyledInput
    onSubmitEditing={onSubmitEditing}
    onChangeText={onChange}
    placeholderTextColor={placeholderTextColor}
    value={value}
    style={style}
    autoCapitalize={autoCapitalize}
    keyboardType={keyboardType}
    height={height}
    secureTextEntry={secureTextEntry}
    placeholder={placeholder}
    editable={editable}
    onFocus={onFocus}
    autoFocus={autoFocus}
    returnKeyType={returnKeyType}
    autoCorrect={autoCorrect}
  />
)

const StyledInput = styled.TextInput`
background-color: white;
height: ${props => props.height ? props.height : '45px'};
width: 100%;
border: 1px solid;
border-color: ${Colors.WefiqBorder};
border-radius: 4px;
padding-left: 45px;
font-size: 16px;
font-family: SourceSansPro-Regular;
color: ${props => props.color ? props.color : Colors.WefiqText};;
`
export default Input
