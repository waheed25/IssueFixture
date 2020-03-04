import React from 'react'
import { FlatList } from 'react-native'
import CategoryItem from '../../Components/CateforiesItem'

class CategoriesList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: props.listData
    }
  }
  onSelect =(index) => {
    const data = this.props.listData
    if (index !== 0) {
      data[0].selected = false
    }
    if (index === 0) {
      if (!data[0].selected) {
        data[0].selected = true
      }
      for (let i = 1; i < data.length; i++) {
        data[i].selected = false
      }
    } else {
      data[index].selected = !data[index].selected
    }
    this.setState({ data })
    this.props.getDataFromList(data)
  }
  render () {
    const { style, listData } = this.props
    return (

      <FlatList
        data={this.state.data}
        style={[style, { alignSelf: 'center', marginTop: 15 }]}
        renderItem={({ item, index }) =>
          <CategoryItem onPress={() => this.onSelect(index)} selected={listData[index].selected}
            CategoryName={item.categoryName} count={item.count}
            icon={listData[index].selected ? item.iconSelected : item.iconUnSelected}
          />}
        initialNumToRender={listData.length}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    )
  }
}

export default CategoriesList
