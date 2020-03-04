import React from 'react'
import CategoriesList from '../../Components/CateforiesItem/CategoriesList'
import { StyleSheet, Text } from 'react-native'
import Colors from '../../Styles/Colors'
import Header from '../../Components/Header/Header'
import { appStyles } from '../../Styles/CommonStyles'
import { withCategoriesSelection } from '../../Redux/hoc/withCategoriesSelection/withCategoriesSelection'

class SearchCategories extends React.Component {
  changedDataAfterSelection= null

  filterSelectedOnes=() => {
    const data = this.props.initialCategoriesDataForSearch
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
  static navigationOptions = ({navigation}) => ({
    header: null
  })

  applySelectedCategories=() => {
    const selectedCategories = this.filterSelectedOnes()
    if (selectedCategories > 0) {
      this.props.onSearchCategoriesSelection({
        searchCategoriesData: selectedCategories,
        initialCategoriesDataForSearch: this.changedDataAfterSelection
      })
      this.props.navigation.goBack()
    } else {
      this.props.navigation.goBack()
    }
  }
  render () {
    console.log('search categories::', this.props)
    return (
      <React.Fragment>
        <Header leftIcon={<Text style={style.headerText}>Close</Text>}
          leftIconPress={() => this.props.navigation.goBack()}
          centerElement={<Text style={style.title}>Select Category</Text>}
          rightSecondIcon={<Text style={[style.headerText, { color: Colors.appColor }]}>Apply</Text>}
          rightSecondIconPress={() => this.applySelectedCategories()}
        />
        <CategoriesList listData={this.props.initialCategoriesDataForSearch} getDataFromList={this.getDataFromList} />
      </React.Fragment>
    )
  }
}

export default withCategoriesSelection(SearchCategories)
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
