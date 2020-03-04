import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { ProgressComponent } from 'react-native-track-player'
import Colors from '../../Styles/Colors'
import { formatTime } from '../../Utils/formateTime'
class ProgressBar extends ProgressComponent {
  render () {
    const position = formatTime(Math.floor(this.state.position))
    const duration = formatTime(Math.floor(this.state.duration))
    const info = position + ' / ' + duration

    let progress = this.getProgress() * 100
    let buffered = this.getBufferedProgress() * 100
    buffered -= progress
    if (buffered < 0) buffered = 0

    return (
      <View style={styles.view}>
        <TouchableWithoutFeedback>
          <View style={styles.bar}>
            <View style={[{width: progress + '%'}, styles.played]} />
            <View style={[{width: buffered + '%'}, styles.buffered]} />
          </View>
        </TouchableWithoutFeedback>
        { !this.props.miniView && <View style={styles.progress}>
          <Text style={styles.info}>{position}</Text>
          <Text style={styles.info}>{duration}</Text>
        </View>}
        { this.props.miniView &&
          <View style={{ width: 250, justifyContent: 'center', bottom: 6 }}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{this.props.audioName}</Text>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>{this.props.profileName}</Text>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    width: '100%'
  },
  info: {
    color: '#c0c0c0',
    fontSize: 16,
    // fontWeight: '300',
    marginLeft: 20,
    marginRight: 20,
    fontFamily: 'SourceSansPro-Regular'
  },
  bar: {
    backgroundColor: Colors.LightGrey,
    height: 2,
    width: '100%',
    margin: 10,
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  played: {
    backgroundColor: Colors.appColor,
    height: 2
  },
  buffered: {
    backgroundColor: '#797979',
    height: 2
  },
  title: {
    fontFamily: 'SourceSansPro-SemiBold',
    color: Colors.WefiqText,
    textAlign: 'center'
  },
  name: {
    fontFamily: 'SourceSansPro-Regular',
    color: Colors.appColor,
    textAlign: 'center'
  },
  progress: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    justifyContent: 'space-between'
  }
})

module.exports = ProgressBar
