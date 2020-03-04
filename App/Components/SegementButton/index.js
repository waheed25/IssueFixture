import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../../Styles/Colors'
import { appStyles } from '../../Styles/CommonStyles'
const SegmentView = ({onSegmentChange, selected}) => {
  console.log('selected', selected)
  return (
    <View style={styles.segmentContainer}>
      <TouchableOpacity style={selected === 'Creations' ? styles.segmentItemSelectedCreations : styles.segmentItemUnSelected} onPress={() => onSegmentChange('Creations')}>
        <Text style={[selected === 'Creations' ? styles.segmentTextSelected : styles.segmentTextUnSelected]}>Creations</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[selected === 'Creators' ? styles.segmentItemSelectedCreators : styles.segmentItemUnSelected, styles.centerSegment]} onPress={() => onSegmentChange('Creators')}>
        <Text style={[selected === 'Creators' ? styles.segmentTextSelected : styles.segmentTextUnSelected]}>Creators</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[selected === 'Collections' ? styles.segmentItemSelectedCollections : styles.segmentItemUnSelected]} onPress={() => onSegmentChange('Collections')}>
        <Text style={[selected === 'Collections' ? styles.segmentTextSelected : styles.segmentTextUnSelected]}>Collections</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SegmentView

const styles = StyleSheet.create({
  segmentContainer: {
    width: '100%',
    borderColor: Colors.WefiqBorder,
    borderWidth: 1,
    height: 30,
    borderRadius: 8,
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: Colors.White
  },
  segmentItemSelectedCreations: {
    ...appStyles.searchSegments,
    backgroundColor: Colors.appColor,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    bottom: 1
  },
  segmentItemSelectedCreators: {
    ...appStyles.searchSegments,
    backgroundColor: Colors.appColor,
    bottom: 1
  },
  segmentItemSelectedCollections: {
    ...appStyles.searchSegments,
    backgroundColor: Colors.appColor,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    bottom: 1
  },
  segmentItemUnSelected: {
    ...appStyles.searchSegments
  },
  segmentTextSelected: {
    ...appStyles.headerCenterText,
    color: Colors.White
  },
  segmentTextUnSelected: {
    ...appStyles.headerCenterText,
    color: Colors.WefiqBorder

  },
  centerSegment: {
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: Colors.WefiqBorder
  }
})
