import React from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import styled from 'styled-components/native'
import hitSlop from '../../Utils/hitslop'
import Colors from '../../Styles/Colors'
const GradinatButton = ({onPress, style, title, textStyle, loading, disabled}) => (
  <TouchableOpacity hitSlop={hitSlop} onPress={onPress} disabled={disabled}>
    <ButtonView style={style}>
      { loading &&
      <ActivityIndicator style={{right: 20}} size='small' color='#fff' />
      }
      <ButtonText style={textStyle}>
        {title}
      </ButtonText>
    </ButtonView>
  </TouchableOpacity>
)

export default GradinatButton

const ButtonView = styled.View`
height: ${45};
width: 100%;
justify-content: center;
align-items: center;
border-radius: 2px;
flex-direction: row;
background-color: #2AAAD2
`
const ButtonText = styled.Text`
font-size: 16px
font-family: SourceSansPro-Regular;
color: ${Colors.White}
`
