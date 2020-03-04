import {
  SEARCHING,
  SEARCH_SUCCESS_CREATIONS,
  SEARCH_FAIL,
  SEARCH_SUCCESS_CREATORS,
  CLEAR_SEARCH_SUCCESS
} from '../../constants/Constants'

const initialState = {
  landingOnSearchCreation: true,
  creationsSearchResult: [],
  creatorsSearchResult: [],
  isLoading: false,
  error: null,
  totalCount: 0
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_SUCCESS_CREATIONS:
      {
        return {
          ...state,
          creationsSearchResult: [...state.creationsSearchResult, ...action.payload.resDataArray],
          // creationsSearchResult: action.payload.resDataArray,
          isLoading: false,
          error: false,
          totalCount: action.payload.count,
          landingOnSearchCreation: false
        }
      }
    case SEARCH_SUCCESS_CREATORS:
      {
        return {
          ...state,
          // creatorsSearchResult: [...state.creatorsSearchResult, ...action.payload.resDataArray],
          creatorsSearchResult: action.payload.resDataArray,
          isLoading: false,
          error: false,
          totalCount: action.payload.count
        }
      }
    case SEARCH_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case SEARCHING:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case CLEAR_SEARCH_SUCCESS:
      {
        return {
          ...state,
          creationsSearchResult: [],
        // creationsSearchResult: action.payload.resDataArray,
          isLoading: false,
          error: false,
          totalCount: 0
        }
      }
    default:
      return state
  }
}
