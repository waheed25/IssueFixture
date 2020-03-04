/*eslint-disable*/
import { Dimensions, PixelRatio } from 'react-native'

// Precalculate Device Dimensions for better performance
const x = Dimensions.get('window').width;
const y = Dimensions.get('window').height;

// Calculating ratio from iPhone breakpoints
// const ratioX = x < 375 ? (x < 320 ? 0.75 : 0.875) : 1;
// const ratioY = y < 568 ? (y < 480 ? 0.75 : 0.875) : 1;

// We set our base font size value
// const base_unit = 16;

// We're simulating EM by changing font size according to Ratio
// const unit = base_unit * ratioX;

// We add an em() shortcut function
// function em(value) {
//   return unit * value;
// }

// Then we set our styles with the help of the em() function
export default Sizes = {

  // GENERAL
  DEVICE_WIDTH: x,
  DEVICE_HEIGHT: y,

};
// export const AsPerHeight=(value)=>(
//   x
// )
