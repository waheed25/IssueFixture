import { connect } from 'react-redux'
import { fetchCollections, clearCollectionsData } from '../../actions/Collections/Collections'
import { fetchCreationsOfCollections } from '../../actions/Collections/CreationByCollectionId'
import { openAudioPlayerMiniView } from '../../actions/AudioPlayer'

const mapStateToProps = ({ collections, creationsOfCollections }) => {
  const { data, isLoading, error, totalCount } = collections
  const { creationsOfCollection, isLoadingCreations, errorInCreationsOfCollections, totalCountCreations } = creationsOfCollections
  return {
    data, isLoading, error, totalCount, creationsOfCollection, isLoadingCreations, errorInCreationsOfCollections, totalCountCreations
  }
}

const mapdispatchTOProps = dispatch => ({
  fetchCollections: (payload, apiType) => dispatch(fetchCollections(payload, apiType)),
  fetchCreations: (payload, apiType) => dispatch(fetchCreationsOfCollections(payload, apiType)),
  clearList: (payload, apiType) => dispatch(clearCollectionsData(payload, apiType)),
  openAudioPlayerMiniView: (payload) => dispatch(openAudioPlayerMiniView(payload))

})

export const withCollections = Component =>
  connect(mapStateToProps, mapdispatchTOProps)(Component)
