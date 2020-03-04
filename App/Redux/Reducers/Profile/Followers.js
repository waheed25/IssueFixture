import {FETCH_USER_FOLLOWERS_FAIL, FETCH_USER_FOLLOWERS_REQUEST, FETCH_USER_FOLLOWERS_SUCCESS,
  CLEAR_FOLLOWERS_LIST
} from '../../constants/Constants'
import _ from 'underscore'
const initialState = {
  data: [],
  isLoading: false,
  error: null,
  isFetchingMore: false,
  totalCount: 0
}

function filterData (item, userId) {
  return item.userId === userId
}
function placeData (storeData, newData) {
  if (storeData.length === 0) {
    return newData
  }
}
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_FOLLOWERS_SUCCESS:
      {
        const newData = {
          data: action.payload.resDataArray,
          userId: action.payload.userId
        }

        let dataToReturn = []
        dataToReturn.push(newData)
        // const filteredData = newData.filter((item) => filterData(item, action.payload.userId))
        return {
          ...state,
          data: dataToReturn,
          isLoading: false,
          error: false,
          totalCount: action.payload.count
        }
      }
    case FETCH_USER_FOLLOWERS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case FETCH_USER_FOLLOWERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case CLEAR_FOLLOWERS_LIST:
      {
        return {
          ...state,
          data: [],
          isLoading: false,
          error: false,
          totalCount: 0
        }
      }
    default:
      return state
  }
}
