import React from 'react'
import { View, FlatList, ActivityIndicator } from 'react-native'
import NavigationService from '../../Navigation/navigationService'
import { withCollections } from '../../Redux/hoc/withCollections/withCollections'
import GridView from '../../Components/CollectionsThumbnail'
import _ from 'underscore'
import ErrorEmptyState from '../../Components/EmptyAndError'
import Images from '../../Images/rootImages'
import { CollectionsService } from '../../Services/data/collections'
import WefiqList from '../../Components/WefiqList'
const apiType = 'wefiq/collection?'
const apiTypeCreation = 'wefiq/creation?'
const params = (userid) => (
  {
    include: 'uid',
    page: {
      limit: 10,
      offset: 0
    },
    filter: {
      author: {
        condition: {
          path: 'uid.uid',
          value: userid,
          operator: '='
        }
      }
    },
    sort: {
      'by-date': {
        path: 'created',
        direction: 'DESC'
      }
    }
  }
)
function createParam ({id, offset}) {
  return {
    include: 'collection',
    page: {
      limit: 3
    },
    filter: {
      'by-collection': {
        condition: {
          path: 'collection.id',
          value: id
        },
        author: {
          condition: {
            path: 'uid.uid',
            value: 376
          }
        }
      }
    },
    fields: {
      collection: 'id'
    }
  }
}
class Collections extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isCreationsFetched: false,
      userCollections: []
    }
  }
  async componentDidMount () {
    this.setState({isLoading: true})
    const createParams = params(this.props.id)
    const collections = await CollectionsService(apiType, createParams)
    this.setState({ userCollections: collections.resDataArray, isLoading: false })
    // this.props.fetchCollections(createParams, apiType)
  }

  shouldComponentUpdate (nextProps, nextState, nextContext) {
    if (nextProps.data !== this.props.data || nextProps.isLoading !== this.props.isLoading || nextState !== this.state) {
      return true
    } else {
      return false
    }
  }
  componentWillUnmount () {
    this.props.clearList()
  }
  // fetchCollections= (data) => {
  //   _.each(data, (item, i) => {
  //     const params = createParam({ id: data[i].id })
  //     this.props.fetchCreations(params, apiTypeCreation)
  //   }
  //   )
  // }
  endScroll =() => {
    const paramsOfEnd = {
      include: 'uid',
      page: {
        limit: 5,
        offset: this.props.data.length
      },
      filter: {
        auth: {
          condition: {
            path: 'uid.uid',
            value: this.props.id,
            operator: '='
          }
        }
      }
    }
    if (this.props.data.length < parseInt(this.props.totalCount)) {
      this.props.fetchCollections(paramsOfEnd, apiType)
    }
  }
  renderFooter=() => {
    if (this.props.isLoading) {
      return (
        <ActivityIndicator size='large' color='#2AAAD2' />
      )
    } else { return null }
  }

  handleOnPress=(collectionInfo) => {
    NavigationService.navigate('CreationsOfACollection', { collectionInfo, userID: this.props.id })
  }
  render () {
    const { data, isLoading } = this.props
    const { creations, userCollections } = this.state
    return (
      <React.Fragment>
        {
          userCollections.length === 0 && !isLoading && <View style={{flex: 1, height: 300}}>
            <ErrorEmptyState image={Images.emptyCreations} text='You don’t have any collections yet' />
          </View>
        }
        { userCollections.length > 0 &&
          <FlatList
            data={userCollections}
            scrollEnabled={false}
            renderItem={({ item, index }) => {
              const images = JSON.parse(item.attributes.creations)
              // const creationsData = Object.keys(item).map(i => item[i])
              return (<GridView collectionInfo={item} onPress={this.handleOnPress} collectionName={item.attributes.title} creationsCount={item.attributes.creationsCount} images={images} />)
            }}
            // onEndReached={_.debounce(this.endScroll, 1000)}
            // onEndReachedThreshold={0.5}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={this.renderFooter}
            initialNumToRender={3}
            maxToRenderPerBatch={3}
            removeClippedSubviews
          />
        }
      </React.Fragment>
    )
  }
}

export default withCollections(Collections)
