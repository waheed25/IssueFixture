import React from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import Header from '../../Components/Header/Header'
import { appStyles } from '../../Styles/CommonStyles'
import Colors from '../../Styles/Colors'
import { withCategoriesSelection } from '../../Redux/hoc/withCategoriesSelection/withCategoriesSelection'
import CategoryItem from '../../Components/CateforiesItem'
import CategoriesList from '../../Components/CateforiesItem/CategoriesList'
class CategoriesSelection extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: props.initialCategoriesData
    }
    this.changedDataAfterSelection = null
  }

  static navigationOptions = ({navigation}) => ({
    header: null
  })
  canApply = false

  // onSelect = (index) => {
  //   const data = this.props.initialCategoriesData
  //   if (index !== 0) {
  //     data[0].selected = false
  //   }
  //   if (index === 0) {
  //     if (!data[0].selected) {
  //       data[0].selected = true
  //     }
  //     for (let i = 1; i < data.length; i++) {
  //       data[i].selected = false
  //     }
  //   } else {
  //     data[index].selected = !data[index].selected
  //   }
  //   this.setState({ data })
  //   this.canApply = true
  // }
  filterSelectedOnes=() => {
    const data = this.props.initialCategoriesData
    let temp = []
    if (this.changedDataAfterSelection !== null) {
      for (let i = 0; i < this.changedDataAfterSelection.length; i++) {
        if (data[0].selected) {
          temp.push(this.changedDataAfterSelection[0])
          break
        }
        if (data[i].selected) {
          temp.push(this.changedDataAfterSelection[i])
        }
      }
    }
    return temp
  }
  getDataFromList=(SelectedCategories) => {
    this.changedDataAfterSelection = SelectedCategories
  }

  applySelectedCategories=() => {
    debugger
    const selectedCategories = this.filterSelectedOnes()
    debugger

    // if (selectedCategories[0].id === 0) {
    //   this.props.onCategoriesSelection({ categoryItems: selectedCategories })
    //   return this.props.navigation.goBack()
    // }
    if (selectedCategories.length > 0) {
      this.props.onCategoriesSelection({
        categoryItems: selectedCategories,
        initialCategoriesData: this.changedDataAfterSelection
      })
      this.props.clearCreationsOnCategoryChangeLatest()
      this.props.clearCreationsOnCategoryChangePopular()
      this.props.navigation.goBack()
    } else {
      this.props.navigation.goBack()
    }
  }
  render () {
    console.log('this.props of categories:::', this.props)
    return (
      <View style={style.container}>
        <Header leftIcon={<Text style={style.headerText}>Close</Text>}
          leftIconPress={() => this.props.navigation.goBack()}
          centerElement={<Text style={style.title}>Select Category</Text>}
          rightSecondIcon={<Text style={[style.headerText, { color: Colors.appColor }]}>Apply</Text>}
          rightSecondIconPress={() => this.applySelectedCategories()}
        />
        <CategoriesList listData={this.props.initialCategoriesData} getDataFromList={this.getDataFromList} />
      </View>)
  }
}
export default withCategoriesSelection(CategoriesSelection)

const style = StyleSheet.create({
  container: {
    ...appStyles.container
  },
  title: {
    ...appStyles.commonFontSemiBold,
    fontSize: 16
  },
  headerText: {
    ...appStyles.defaultFontFamily,
    fontSize: 14
  }
})
