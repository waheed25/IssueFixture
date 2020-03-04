import { connect } from 'react-redux'
import { handleSearch, clearPreviouslySearchedCreations } from '../../actions/Search'
import { selectedSearchCategories, selectCreatorsLocationForSearch } from '../../actions/Categories'

const mapStateToProps = ({ search, categories }) => {
  const { creationsSearchResult, isLoading, error, totalCount, creatorsSearchResult, landingOnSearchCreation } = search
  const { searchCategoriesData, initialCategoriesData, locationDataForSearch } = categories
  return {
    landingOnSearchCreation ,creationsSearchResult, isLoading, error, totalCount, creatorsSearchResult, searchCategoriesData, initialCategoriesData, locationDataForSearch
  }
}

const mapDispatchToProps = dispatch => ({
  handleSearch: (payload, apiType) => dispatch(handleSearch(payload, apiType)),
  clearSearchedCreations: (payload, apiType) => dispatch(clearPreviouslySearchedCreations(payload, apiType)),
  onSearchCategoriesSelection: (payload) => dispatch(selectedSearchCategories(payload)),
  onCreatorsLocationSelection: (payload) => dispatch(selectCreatorsLocationForSearch(payload))

})

export const withSearch = Component =>
  connect(mapStateToProps, mapDispatchToProps)(Component)
