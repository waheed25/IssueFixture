import { Alert } from 'react-native'

const ErrorAlrt = ({ title, message, onOK, onCancel }) => (
  Alert.alert(
    title, message,
    [
      {
        text: 'Cancel',
        onPress: onCancel,
        style: 'cancel'
      },
      {text: 'OK', onPress: onOK}
    ],
    {cancelable: false}
  )
)

export default ErrorAlrt
