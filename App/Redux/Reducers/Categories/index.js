import {
  SELECTED_CATEGORIES,
  SELECTED_SEARCH_CATEGORIES,
  SELECTED_SEARCH_LOCATIONS
} from '../../constants/Constants'
import { data, SearchData } from './InitialDataForCategories'
const initialState = {
  categoryItems: [],
  initialCategoriesData: data,
  searchCategoriesData: [],
  locationDataForSearch: null,
  initialCategoriesDataForSearch: SearchData
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECTED_CATEGORIES:
      {
        return {
          ...state,
          initialCategoriesData: action.requestPayload.initialCategoriesData,
          categoryItems: action.requestPayload.categoryItems
        }
      }
    case SELECTED_SEARCH_CATEGORIES:
      {
        return {
          ...state,
          searchCategoriesData: action.requestPayload.searchCategoriesData,
          initialCategoriesDataForSearch: action.requestPayload.initialCategoriesDataForSearch
        }
      }
    case SELECTED_SEARCH_LOCATIONS:
      {
        return {
          ...state,
          locationDataForSearch: action.requestPayload.locationDataForSearch
        }
      }

    default:
      return state
  }
}
