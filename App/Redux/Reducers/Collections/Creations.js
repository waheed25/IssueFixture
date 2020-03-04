import {
  FETCH_CREATION_OF_COLLECTION_LOADING,
  FETCH_CREATION_OF_COLLECTION_SUCCESS,
  FETCH_CREATION_OF_COLLECTION_FAIL
} from '../../constants/Constants'

const initialState = {
  creationsOfCollection: [],
  isLoadingCreations: false,
  errorInCreationsOfCollections: null,
  totalCountCreations: 0
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_CREATION_OF_COLLECTION_SUCCESS:
      {
        console.log('Fetch creations of collections in Reducer :::', action.payload.resDataArray)
        return {
          ...state,
          // creationsOfCollection: [...state.creationsOfCollection, ...action.payload.resDataArray],
          creationsOfCollection: [...action.payload.resDataArray],
          isLoadingCreations: false,
          errorInCreationsOfCollections: false,
          totalCountCreations: action.payload.count
        }
      }
    case FETCH_CREATION_OF_COLLECTION_FAIL:
      return {
        ...state,
        isLoadingCreations: false,
        errorInCreationsOfCollections: action.payload.error
      }
    case FETCH_CREATION_OF_COLLECTION_LOADING:
      return {
        ...state,
        isLoadingCreations: true,
        errorInCreationsOfCollections: null
      }

    default:
      return state
  }
}
