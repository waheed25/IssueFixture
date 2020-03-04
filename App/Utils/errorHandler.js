import { Alert } from "react-native"

const reporter = (error) => {
  // Logic for reporting to devs
  // Example : Log issues to github issues using github apis.
  console.log(error) // sample
}
export const errorHandler = (e, isFatal) => {
  // reporter(e)
  setTimeout(() => Alert.alert(
    'Unexpected error occurred',
    `
        We have reported this to our team ! Please close the app and start again!
        `,
    [{
      text: 'Close',
      onPress: () => {
        // BackAndroid.exitApp()
      }
    }]
  ), 100)
}
