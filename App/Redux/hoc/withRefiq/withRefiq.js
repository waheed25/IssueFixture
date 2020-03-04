import { connect } from 'react-redux'
import { fetchRefiq, clearRefiqsData } from '../../actions/Refiq/Refiq'
import { openAudioPlayerMiniView } from '../../actions/AudioPlayer'

const mapStateToProps = ({ refiq }) => {
  const { data, isLoading, error, totalCount } = refiq
  return {
    data, isLoading, error, totalCount
  }
}

const mapdispatchTOProps = dispatch => ({
  fetchRefiqData: (payload, apiType) => dispatch(fetchRefiq(payload, apiType)),
  clearList: (payload, apiType) => dispatch(clearRefiqsData(payload, apiType)),
  openAudioPlayerMiniView: (payload) => dispatch(openAudioPlayerMiniView(payload))

})

export const withRefiq = Component =>
  connect(mapStateToProps, mapdispatchTOProps)(Component)
