import React, { useState} from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import { withAuth } from '../../Redux/hoc/withAuth/withAuth'
import Colors from '../../Styles/Colors'

const Settings = (props) => {
  const [ loading, setLoading ] = useState(true)
  return (
    <View style={styles.container}>
      {
        loading &&
        <ActivityIndicator
          style={styles.activityIndicator}
          size='large'
          color={Colors.appColor}
        />
      }
      <WebView
        javaScriptEnabled
        useWebKit
        originWhitelist={['*']}
        onLoad={() => setLoading(false)}
          // source={{html: '<input type="file" accept="image/*, video/*" />'}}
        source={{ uri: `https://dev.wefiq.com/external/${props.userInfo.token}?redirect=/external/settings` }}
          // style={{ marginTop: 0, opacity: webViewOpacity }}
        onMessage={event => this.message(event)}
        mediaPlaybackRequiresUserAction
        />
    </View>
  )
}
Settings.navigationOptions = ({ navigation }) => ({
  title: 'Settings'})
export default withAuth(Settings)
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  activityIndicator: {
    // position: 'absolute',
    // top: 10,
    // left: '48%'
  }
})
