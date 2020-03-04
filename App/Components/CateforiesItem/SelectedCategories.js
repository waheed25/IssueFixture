import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import Colors from '../../Styles/Colors'
// import WefiqTouchableOpacity from '../../Components/WefiqTouchables'
import { appStyles } from '../../Styles/CommonStyles'
import { hitSlopCategoryCloseButton } from '../../Utils'
import Ionicons from 'react-native-vector-icons/Ionicons'
const SelectedCategoryItem = ({categoryName, onRemovingAFilter, id, index}) => (
  <View style={styles.item}>
    <Text style={styles.text}>{categoryName}</Text>
    <TouchableOpacity hitSlop={hitSlopCategoryCloseButton} onPress={() => onRemovingAFilter(id, index)}>
      <Ionicons style={styles.icon} name='ios-close-circle' size={20} color={Colors.InputTextBorderColor} />
    </TouchableOpacity>
  </View>
)

const HorizontalCategoryList = ({ categoryItems, onRemovingAFilter }) => (
  <FlatList
    data={categoryItems}
    renderItem={({item, index}) => <SelectedCategoryItem categoryName={item.categoryName} onRemovingAFilter={onRemovingAFilter} id={item.id} index={index} />}
    keyExtractor={(item) => item.id.toString()}
    horizontal
    showsHorizontalScrollIndicator={false}

  />
)

export default HorizontalCategoryList

const styles = StyleSheet.create({
  item: {
    height: 30,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.InputTextBorderColor,
    flexDirection: 'row',
    marginRight: 5,
    marginLeft: 5
  },
  text: {
    ...appStyles.defaultFontFamily,
    fontSize: 16,
    color: Colors.InputTextBorderColor
  },
  icon: {
    left: 7,
    top: 1
  }
})
