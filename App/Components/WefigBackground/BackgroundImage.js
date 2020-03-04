import React from 'react'
import { ImageBackground } from 'react-native'
import styled from 'styled-components/native'

const Background = (props) => (
  <BackgroundImage source={props.source} style={props.style}>
    {props.children}
  </BackgroundImage>
)

export default Background

const BackgroundImage = styled(ImageBackground)`
height: 100%;
width: 100%;
flexShrink: 1;
`
