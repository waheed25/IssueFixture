import { connect } from 'react-redux'
import { selectedCategories, selectedSearchCategories } from '../../actions/Categories'
import { clearCreationsOnCategoryChangePopular } from '../../actions/Creations/creations'
import { clearCreationsOnCategoryChangeLatest } from '../../actions/Creations/Latest'

const mapStateToProps = ({ categories }) => {
  const { categoryItems, initialCategoriesData, initialCategoriesDataForSearch } = categories

  return {
    categoryItems, initialCategoriesData, initialCategoriesDataForSearch
  }
}

const mapdispatchTOProps = dispatch => ({
  onCategoriesSelection: (payload) => dispatch(selectedCategories(payload)),
  onSearchCategoriesSelection: (payload) => dispatch(selectedSearchCategories(payload)),
  clearCreationsOnCategoryChangePopular: () => dispatch(clearCreationsOnCategoryChangePopular()),
  clearCreationsOnCategoryChangeLatest: () => dispatch(clearCreationsOnCategoryChangeLatest())

})

export const withCategoriesSelection = Component =>
  connect(mapStateToProps, mapdispatchTOProps)(Component)
