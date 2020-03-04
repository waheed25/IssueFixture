import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import ContentLoader, { Circle, Rect } from 'react-content-loader/native'
import Colors from '../../Styles/Colors'
import Sizes from '../../Styles/DeviceSizes'

const Loader = () => (
  <React.Fragment>
    <WefiqLoader />
    <WefiqLoader />
    <WefiqLoader />
  </React.Fragment>
)
const height = Sizes.DEVICE_HEIGHT * 0.4
const containerHeight = Sizes.DEVICE_HEIGHT * 0.28
const width = Sizes.DEVICE_WIDTH * 0.91
const y0 = (Sizes.DEVICE_HEIGHT * 0.315).toString()
const y1 = (Sizes.DEVICE_HEIGHT * 0.36).toString()
const circle = (Sizes.DEVICE_HEIGHT * 0.345).toString()
const WefiqLoader = () => (
  <View>
    <ContentLoader
      height={height}
    >
      <Rect x='20' y='10' rx='4' ry='4' width={width.toString()} height={containerHeight.toString()} />
      <Rect x='90' y={y0} rx='10' ry='4' width='150' height='20' />
      <Rect x='90' y={y1} rx='3' ry='3' width='120' height='13' />
      <Circle cx='50' cy={circle} r='20' />
    </ContentLoader>
  </View>
)
// Sizes.DEVICE_HEIGHT * 0.43, width: Sizes.DEVICE_WIDTH * 0.93
export default Loader

export const DefaultLoader = ({style}) => (
  <View style={[{flex: 1, justifyContent: 'center', alignItems: 'center'}, style]}>
    <ActivityIndicator size='large' color={Colors.appColor} />
  </View>
)
const SearchUserLoaderItem = () => (
  <View>
    <ContentLoader
      height={70}
    >
      <Rect x='90' y={30} rx='10' ry='4' width='150' height='18' />
      <Rect x='90' y={55} rx='3' ry='3' width='120' height='13' />
      <Circle cx='50' cy={50} r='20' />
    </ContentLoader>
  </View>
)
export const SearchUserLoader = () => (
  <React.Fragment>
    <SearchUserLoaderItem />
    <SearchUserLoaderItem />
    <SearchUserLoaderItem />
    <SearchUserLoaderItem />
    <SearchUserLoaderItem />
    <SearchUserLoaderItem />
    <SearchUserLoaderItem />
    <SearchUserLoaderItem />
    <SearchUserLoaderItem />
  </React.Fragment>
)
