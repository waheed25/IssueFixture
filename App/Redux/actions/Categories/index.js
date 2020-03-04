import {
  SELECTED_CATEGORIES,
  SELECTED_SEARCH_CATEGORIES,
  SELECTED_SEARCH_LOCATIONS
} from '../../constants/Constants'
function selectCategories (requestPayload) {
  return {
    type: SELECTED_CATEGORIES,
    requestPayload
  }
}
export function selectedCategories (requestPayload = {}) {
  return (dispatch) => {
    dispatch(selectCategories(requestPayload))
  }
}

function selectSearchCategories (requestPayload) {
  return {
    type: SELECTED_SEARCH_CATEGORIES,
    requestPayload
  }
}
export function selectedSearchCategories (requestPayload = {}) {
  return (dispatch) => {
    dispatch(selectSearchCategories(requestPayload))
  }
}
function selectSearchCreatorsLocation (requestPayload) {
  return {
    type: SELECTED_SEARCH_LOCATIONS,
    requestPayload
  }
}
export function selectCreatorsLocationForSearch (requestPayload = {}) {
  return (dispatch) => {
    dispatch(selectSearchCreatorsLocation(requestPayload))
  }
}
