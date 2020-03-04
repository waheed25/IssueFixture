import {
  INCREASE_CREATION_VIEW_REQUEST,
  INCREASE_CREATION_VIEW_SUCCESS,
  INCREASE_CREATION_VIEW_FAIL,
  // UPDATE_CREATIONS_DETAILS_DATA
} from '../../constants/Constants'

const initialState = {
  data: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case INCREASE_CREATION_VIEW_SUCCESS:
      {
        return {
          ...state,
          data: action.payload.resBody
        }
      }
    case INCREASE_CREATION_VIEW_FAIL:
      return {
        ...state
      }
    case INCREASE_CREATION_VIEW_REQUEST:
      return {
        ...state
      }
    // case UPDATE_CREATIONS_DETAILS_DATA:
    //   return {
    //     ...state,
    //     data: action.requestPayload,
    //     isLoading: false,
    //     error: false
    //   }
    default:
      return state
  }
}
