import React from 'react'
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native'
import SearchBar from '../../Components/SearchBar'
import { appStyles } from '../../Styles/CommonStyles'
import { popularCreationsParams, searchCreationParams, searchCreatorParams } from '../../Utils/params'
import { getCategoriesId, UnselectCategory } from '../../Utils/helperFunctions'
import SearchSegment from '../../Components/SegementButton'
import { withSearch } from '../../Redux/hoc/withSearch/withSearch'
import CreationsResult from './searchCreations'
import CreatorsResult from './searchCreators'
import NavigationService from '../../Navigation/navigationService'
import Loader, {
   SearchUserLoader
} from '../../Components/Loader/Loader'
import DeviceSizes from '../../Styles/DeviceSizes'
import SelectedCategoryItem from '../../Components/CateforiesItem/SelectedCategories'
import Colors from '../../Styles/Colors'
import { hitSlopCategoryCloseButton } from '../../Utils'
import Ionicons from 'react-native-vector-icons/Ionicons'

const apiType = '/wefiq/search?'
class Search extends React.Component {
  pageLimit = 10
  pageOffset= 0
  state={
    searchText: '',
    selectedSegment: 'Creations'
  }
  onSegmentChange=(selected) => {
    this.setState({ selectedSegment: selected })
  }
  onSearchTextChange=(searchText) => {
    this.setState({ searchText })
  }
  handleSearch=() => {
    if (this.searchtext !== this.state.searchText) {
      this.props.clearSearchedCreations()
    }
    // debugger
    const createSearchParams = this.state.selectedSegment === 'Creations' ? searchCreationParams({ limit: this.pageLimit, offset: this.pageOffset, searchText: this.state.searchText }) : searchCreatorParams({ limit: this.pageLimit, offset: this.pageOffset, searchText: this.state.searchText })
    if (this.props.searchCategoriesData.length > 0 && this.props.searchCategoriesData[0].id !== 0) {
      // createSearchParams.category = getCategoriesId(this.props.searchCategoriesData)
      createSearchParams.filter.cat_filter.condition.value = getCategoriesId(this.props.searchCategoriesData)
      createSearchParams.filter.cat_filter.condition.path = 'category.tid'
      createSearchParams.filter.cat_filter.condition.operator = 'IN'
    }
    if (this.state.selectedSegment === 'Creators' && this.props.locationDataForSearch !== null) {
      createSearchParams._filter.geo.condition.lat = this.props.locationDataForSearch.geometry.location.lat
      createSearchParams._filter.geo.condition.lng = this.props.locationDataForSearch.geometry.location.lng
    }
    console.log('Search params ::', createSearchParams)
    this.props.handleSearch(createSearchParams, apiType)
    this.searchtext = this.state.searchText
  }
  onEndReached=() => {
    debugger
    if ((parseInt(this.props.totalCount) > this.props.creationsSearchResult.length && !this.pageOffset < this.props.totalCount)) {
      this.pageOffset += this.pageLimit
      const createSearchParams = this.state.selectedSegment === 'Creations' ? searchCreationParams({ limit: this.pageLimit, offset: this.pageOffset, searchText: this.state.searchText }) : searchCreatorParams({ limit: this.pageLimit, offset: this.pageOffset, searchText: this.state.searchText })
      if (this.props.searchCategoriesData.length > 0 && this.props.searchCategoriesData[0].id !== 0) {
        // createSearchParams.category = getCategoriesId(this.props.searchCategoriesData)
        createSearchParams.filter.cat_filter.condition.value = getCategoriesId(this.props.searchCategoriesData)
        createSearchParams.filter.cat_filter.condition.path = 'category.tid'
        createSearchParams.filter.cat_filter.condition.operator = 'IN'
      }
      if (this.state.selectedSegment === 'Creators' && this.props.locationDataForSearch !== null) {
        createSearchParams._filter.geo.condition.lat = this.props.locationDataForSearch.geometry.location.lat
        createSearchParams._filter.geo.condition.lng = this.props.locationDataForSearch.geometry.location.lng
      }
      this.props.handleSearch(createSearchParams, apiType)
    }
  }
  navigateToSearchCategories=() => {
    if (this.state.selectedSegment === 'Creations') {
      return this.props.navigation.navigate('SearchCategories')
    }
    this.props.navigation.navigate('CreatorsFilter')
  }
  onRemovingAFilter=(id, index) => {
    let removeFilterIndex = this.props.searchCategoriesData.filter((item) => item.id !== id)
    debugger
    let updateList = UnselectCategory(id, this.props.initialCategoriesData)
    // delete removeFilterIndex[index]
    console.log('removeFilterIndex', removeFilterIndex)
    this.props.onSearchCategoriesSelection({ searchCategoriesData: removeFilterIndex, initialCategoriesDataForSearch: updateList })
    this.props.clearSearchedCreations()
    // this.props.clearCreationsOnCategoryChangePopular()
  }
  removePlaceFilter=() => {
    this.props.onCreatorsLocationSelection({ locationDataForSearch: null })
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.searchCategoriesData !== prevState.searchCategoriesData) {
      return { searchCategoriesData: nextProps.searchCategoriesData }
    }
    if (nextProps.locationDataForSearch !== prevState.locationDataForSearch) {
      return { locationDataForSearch: nextProps.locationDataForSearch }
    } else return null
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.searchCategoriesData !== this.props.searchCategoriesData) {
      this.pageOffset = 0
      this.props.clearSearchedCreations()
      let params = searchCreationParams(this.pageLimit, this.pageOffset)
      if (this.props.searchCategoriesData.length > 0 && this.props.searchCategoriesData[0].id !== 0) {
        params.filter.cat_filter.condition.path = 'category.tid'
        params.filter.cat_filter.condition.value = getCategoriesId(this.props.searchCategoriesData)
        params.filter.cat_filter.condition.operator = 'IN'
      }
      // const headers = {
      //   Authorization: this.props.userInfo.token
      // }
      this.props.handleSearch(params, apiType)
      if (this.props.searchCategoriesData.length > 0 && this.props.searchCategoriesData[0].id === 0) {
        this.props.handleSearch(params, apiType)
      }
    }
    if (this.state.selectedSegment === 'Creators' && this.props.locationDataForSearch !== prevProps.locationDataForSearch) {
      const params = searchCreatorParams({ limit: this.pageLimit, offset: 0, searchText: this.state.searchText })
      params._filter.geo.condition.lat = this.props.locationDataForSearch ? this.props.locationDataForSearch.geometry.location.lat : 'NaN'
      params._filter.geo.condition.lng = this.props.locationDataForSearch ? this.props.locationDataForSearch.geometry.location.lng : 'NaN'
      this.props.handleSearch(params, apiType)
    }
  }

  render () {
    console.log('props of search', this.props)
    return (
      <View style={styles.container} nestedScrollEnabled contentContainerStyle={{}} stickyHeaderIndices={[1]}>
        <SearchBar selectedSegment={this.state.selectedSegment} onSettingsBtnPress={() => this.navigateToSearchCategories()} onChange={this.onSearchTextChange} style={{marginTop: 20}} onSubmitEditing={this.handleSearch} returnKeyType='search' keyboardType='default' />
        <View style={styles.header}>
          <SearchSegment onSegmentChange={this.onSegmentChange} selected={this.state.selectedSegment} />
        </View>
        { this.props.searchCategoriesData.length > 0 && this.props.searchCategoriesData[0].id !== 0 && this.state.selectedSegment === 'Creations' &&
        <View style={styles.selectedCategories}>
          <SelectedCategoryItem categoryItems={this.props.searchCategoriesData} onRemovingAFilter={this.onRemovingAFilter} />
        </View>
        }
        {
          this.state.selectedSegment === 'Creations' &&
          <CreationsResult data={this.props.creationsSearchResult} landingOnSearchCreation={this.props.landingOnSearchCreation} totalCount={this.props.totalCount} isLoading={this.props.isLoading} onEndReached={this.onEndReached} />
        }
        {
          this.props.isLoading && this.props.creationsSearchResult.length < 1 && this.state.selectedSegment === 'Creations' &&
            <Loader />

        }
        {
          this.props.isLoading && this.props.creatorsSearchResult.length < 1 && this.state.selectedSegment === 'Creators' &&
          <SearchUserLoader />

        }
        {
          this.props.locationDataForSearch !== null && this.state.selectedSegment === 'Creators' &&
          <DisplayLocation location={this.props.locationDataForSearch.formatted_address || this.props.locationDataForSearch.description} onRemove={() => this.removePlaceFilter()} />
        }
        {
          this.props.creatorsSearchResult.length > 0 && this.state.selectedSegment === 'Creators' &&
          <CreatorsResult data={this.props.creatorsSearchResult} onEndReached={this.onEndReached} />
        }
      </View>
    )
  }
}

export default withSearch(Search)

const DisplayLocation = ({location, onRemove}) => <View style={styles.locationContainer}>
  <TouchableOpacity hitSlop={hitSlopCategoryCloseButton} style={styles.removeBtn} onPress={onRemove}>
    <Ionicons name='ios-close-circle' size={20} color={Colors.InputTextBorderColor} />
  </TouchableOpacity>
  <Text numberOfLines={1} style={styles.address}>{location}</Text></View>

const styles = StyleSheet.create({
  container: {
    ...appStyles.container
  },
  header: {
    // marginTop: 20,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: 'white',
    width: DeviceSizes.DEVICE_WIDTH,
    alignItems: 'center',
    paddingBottom: 10
  },
  list: {
    // width: '100%',
    alignSelf: 'center'
  },
  selectedCategories: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  address: {
    ...appStyles.defaultFontFamily,
    width: '80%',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#000'
  },
  locationContainer: {
    width: DeviceSizes.DEVICE_WIDTH * 0.942,
    textAlign: 'center',
    height: 30,
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    // borderRadius: 8,
    // borderColor: Colors.InputTextBorderColor,
    // borderWidth: 1,
    justifyContent: 'center'
  },
  removeBtn: {
    position: 'absolute',
    right: 10

  }
})
