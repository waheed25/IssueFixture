import {
  Animated,
  Easing
} from 'react-native'

let CollapseExpand = (index, position) => {
  const inputRange = [index - 1, index, index + 1]
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1]
  })

  const scaleY = position.interpolate({
    inputRange,
    outputRange: ([0, 1, 1])
  })

  return {
    opacity,
    transform: [
      { scaleY }
    ]
  }
}

let SlideFromRight = (index, position, width) => {
  const inputRange = [index - 1, index, index + 1]
  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [width, 0, 0]
  })
  const slideFromRight = { transform: [{ translateX }] }
  return slideFromRight
}
let SlideFromLeft = (index, position, width) => {
  const inputRange = [index - 1, index, index + 1]
  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [-width, 0, 0]
  })
  const SlideFromLeft = { transform: [{ translateX }] }
  return SlideFromLeft
}

//
// export const TransitionConfiguration = () => {
//   return {
//     transitionSpec: {
//       duration: 400,
//       easing: Easing.out(Easing.poly(4)),
//       timing: Animated.timing,
//       useNativeDriver: true
//     },
//     screenInterpolator: (sceneProps) => {
//       const { layout, position, scene } = sceneProps
//       const width = layout.initWidth
//       const { index, route } = scene
//       const params = route.params || {} // <- That's new
//       // const transition = params.transition || 'default' // <- That's new
//       const transition = 'default' // <- That's new
//       return {
//         collapseExpand: CollapseExpand(index, position),
//         default:  SlideFromRight(index, position, width)
//       }[transition]
//     }
//   }
// }
export const TransitionConfiguration = () => ({
  transitionSpec: {
    duration: 250,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps
    const { index } = scene

    const height = layout.initHeight
    const translateX = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [height, 0, 0]
    })

    const opacity = position.interpolate({
      inputRange: [index - 1, index - 0.99, index],
      outputRange: [0, 1, 1]
    })

    return { opacity, transform: [{ translateX }] }
  }
})
