import React, { Component } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview' // 1.2.6
const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2
}

let containerCount = 0

class CellContainer extends React.Component {
  constructor (args) {
    super(args)
    this._containerId = containerCount++
  }
  render () {
    return <View {...this.props}>{this.props.children}<Text>Cell Id: {this._containerId}</Text></View>
  }
}

class SettingsScreen extends React.Component {
  render () {
    return (
      <RecycleTestComponent />

    )
  }
}

export default class RecycleTestComponent extends React.Component {
  constructor (args) {
    super(args)

    let { width } = Dimensions.get('window')

    // Create the data provider and provide method which takes in two rows of data and return if those two are different or not.
    // THIS IS VERY IMPORTANT, FORGET PERFORMANCE IF THIS IS MESSED UP
    let dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2
    })

    // Create the layout provider
    // First method: Given an index return the type of item e.g ListItemType1, ListItemType2 in case you have variety of items in your list/grid
    // Second: Given a type and object set the exact height and width for that type on given object, if you're using non deterministic rendering provide close estimates
    // If you need data based check you can access your data provider here
    // You'll need data in most cases, we don't provide it by default to enable things like data virtualization in the future
    // NOTE: For complex lists LayoutProvider will also be complex it would then make sense to move it to a different file
    this._layoutProvider = new LayoutProvider(
      index => {
        if (index % 3 === 0) {
          return ViewTypes.FULL
        } else if (index % 3 === 1) {
          return ViewTypes.HALF_LEFT
        } else {
          return ViewTypes.HALF_RIGHT
        }
      },
      (type, dim) => {
        switch (type) {
          case ViewTypes.HALF_LEFT:
            dim.width = width / 2
            dim.height = 160
            break
          case ViewTypes.HALF_RIGHT:
            dim.width = width / 2
            dim.height = 160
            break
          case ViewTypes.FULL:
            dim.width = width
            dim.height = 140
            break
          default:
            dim.width = 0
            dim.height = 0
        }
      }
    )

    this._rowRenderer = this._rowRenderer.bind(this)

    // Since component should always render once data has changed, make data provider part of the state
    this.state = {
      dataProvider: dataProvider.cloneWithRows(this._generateArray(300))
    }
  }

  _generateArray (n) {
    let arr = new Array(n)
    for (let i = 0; i < n; i++) {
      arr[i] = i
    }
    return arr
  }

  // Given type and data return the view component
  _rowRenderer (type, data) {
    // You can return any view here, CellContainer has no special significance
    switch (type) {
      case ViewTypes.HALF_LEFT:
        return (
          <CellContainer style={styles.containerGridLeft}>
            <Text>Data: {data}</Text>
          </CellContainer>
        )
      case ViewTypes.HALF_RIGHT:
        return (
          <CellContainer style={styles.containerGridRight}>
            <Text>Data: {data}</Text>
          </CellContainer>
        )
      case ViewTypes.FULL:
        return (
          <CellContainer style={styles.container}>
            <Text>Data: {data}</Text>
          </CellContainer>
        )
      default:
        return null
    }
  }

  render () {
    return <RecyclerListView layoutProvider={this._layoutProvider} dataProvider={this.state.dataProvider} rowRenderer={this._rowRenderer} />
  }
}

/***
 * To test out just copy this component and render in you root component
 */

const styles = {
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#00a1f1'
  },
  containerGridLeft: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#ffbb00'
  },
  containerGridRight: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#7cbb00'
  }
}

// import React, { PureComponent, Fragment} from 'react'
// import { FlatList, View, ActivityIndicator, StyleSheet, RefreshControl, BackHandler, Platform, Dimensions} from 'react-native'
// import Modal from 'react-native-modal'
// // import { appStyles } from '../../Styles/CommonStyles'
// import { NormalFooter } from 'react-native-spring-scrollview/NormalFooter'
// import _ from 'lodash'
// import { withCreations } from '../../Redux/hoc/withCreations/withCreations'
// import MediaView from '../../Components/MediaView/MediaView'
// import Loading from '../../Components/Loader/Loader'
// import CreationTiles from '../../Components/CreationTiles/CreationTiles'
// import { handleDataChange } from '../../Utils/handlePusherChange'
// import { popularCreationsParams } from '../../Utils/params'
// import WefiqList from '../../Components/WefiqList'
// import Colors from '../../Styles/Colors'
// import DeviceSizes from '../../Styles/DeviceSizes'
// import { LargeList } from 'react-native-largelist-v3'
// import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview'
// import Recycler from './Recycler'
// const apiType = 'creation?'
// class Creations extends React.PureComponent {
//   pageLimit = 50;
//   pageOffset = 0;
//   dataProvider= new DataProvider((r1, r2) => {
//     return r1 !== r2
//   })
//   constructor (props) {
//     super(props)
//     this.state = {
//       modalVisible: false,
//       selectedData: {},
//       selectedMediaData: {},
//       data: [],
//       updated: false,
//       PusherIncremented: 0,
//       renderList: false,
//       refreshing: false,
//       dataProvider: new DataProvider((r1, r2) => {
//         return r1 !== r2
//       })
//     }
//     this._layoutProvider = new LayoutProvider(
//       index => {
//         return 'VSEL'
//       },
//       (type, dim, index) => {
//         switch (type) {
//           case 'VSEL':
//             dim.width = 300
//             dim.height = 300
//             break
//           default:
//             dim.width = 0
//             dim.heigh = 0
//         }
//       }
//     )
//   }
//   componentDidMount () {
//     this.fetchCreations(this.pageLimit, this.pageOffset, false)
//     // setInterval(() => this.fetchCreations(this.pageLimit, this.pageOffset += this.pageLimit, true), 5000)
//     this.list = setTimeout(() => { this.setState({ renderList: true }) }, 0)
//   }
//
//   fetchCreations (limit, offset, loadMore) {
//     console.log('About to fetch creations............. >>> 01')
//     const params = popularCreationsParams(limit, offset, loadMore)
//     this.props.fetchCreationsData(params, apiType)
//   }
//
//   handleOnPress=(item, index) => {
//     this.setState({ modalVisible: true, selectedMediaData: JSON.parse(item.attributes.mediaMetadata), selectedData: this.props.data.slice(index, index + 5) })
//   }
//
//   // shouldComponentUpdate (nextProps, nextState, nextContext) {
//   //   if (nextProps !== this.props || nextState !== this.state || nextProps.isLoading !== this.props.isLoading) {
//   //     return true
//   //   } else {
//   //     return false
//   //   }
//   // }
//
//   componentWillUnmount () {
//     clearTimeout(this.list)
//   }
//
//   endScroll =() => {
//     const apiType = 'creation?'
//     this.pageOffset += this.pageLimit
//     const params = popularCreationsParams(this.pageLimit, this.pageOffset, true)
//     console.log('parseInt(this.props.totalCount)', this.props.data.length)
//     if ((parseInt(this.props.totalCount) > this.props.data.length && !this.pageOffset < this.props.totalCount)) {
//       console.log('About to fetch creations............. >>> 02')
//       this.props.fetchCreationsData(params, apiType)
//     }
//   }
//
//   handleCloseModal=() => { this.setState({ modalVisible: false }) }
//   renderFooter=() => {
//     if (this.props.isLoading) {
//       return (
//         <ActivityIndicator style={styles.loader} size='large' color='#2AAAD2' />
//       )
//     } else {
//       return null
//     }
//   }
//
//   _scrolled=() => {
//     this.setState({ flatListReady: true })
//   }
//
//   async componentWillReceiveProps (nextProps, nextContext) {
//     // console.log('DATA RECEIVED................................................', nextProps)
//     const { data } = this.state
//     this.setState({ dataProvider: this.state.dataProvider.cloneWithRows(nextProps.data) })
//     if (nextProps.PusherData) {
//       const ChangedDataAfterPusherEvent = await handleDataChange(data, nextProps.PusherData)
//       this.setState({ data: ChangedDataAfterPusherEvent })
//     }
//   }
//
//   onRefresh =() => {
//     this.setState({ refreshing: true })
//     this.fetchCreations(50, 0, false)
//   }
//   showSecondModal=() => {
//     this.setState({ modalVisible2: this.state.modalVisible2 })
//   }
//   renderItem=(type, data, index) => {
//     const item = data
//     // console.log('data', data)
//     const metadata = JSON.parse(item.attributes.mediaMetadata)
//     return (<CreationTiles isLoading={this.props.isLoading} refiqesCount={item.attributes.refiqesCount} likesCount={item.attributes.likesCount} nid={item.attributes.drupalInternalNid} viewsCount={item.attributes.viewsCount} index={index} handleCloseModal={this.handleCloseModal} handleOnPress={this.handleOnPress} isFetchingMore={this.props.isLoading} item={item} metadata={metadata} />)
//   }
//
//   render () {
//     // console.log('Flat list render', this.props)
//     const { data, modalVisible, renderList, modalVisible2, refreshing } = this.state
//
//     if ((this.props.isLoading && this.props.data.length < this.pageLimit) || !renderList) {
//       return (
//         <Loading />
//
//       )
//     }
//     return (
//       <View style={styles.root}>
//         <Modal
//           hideModalContentWhileAnimating
//           style={styles.modal}
//           isVisible={modalVisible}
//           animationOut='bounceOutDown'
//           onBackButtonPress={() => this.handleCloseModal()}
//           backdropOpacity={0.3}
//         >
//           <Modal
//             hideModalContentWhileAnimating
//             style={styles.modal2}
//             isVisible={modalVisible2}
//             animationOut='bounceOutDown'
//           >
//             <View style={{ height: 400, backgroundColor: 'white', zIndex: 10 }} />
//           </Modal>
//           <MediaView showSecondModal={this.showSecondModal} closeModal={this.handleCloseModal}
//                      selectedData={this.state.selectedData} selectedMediaData={this.state.selectedMediaData}
//                      mediaData={this.state.selectedData} />
//         </Modal>
//         {/*<Recycler />*/}
//         <RecyclerListView
//           style={styles.list}
//           rowRenderer={this.renderItem}
//           dataProvider={this.dataProvider.cloneWithRows(this.props.data)}
//           layoutProvider={this._layoutProvider}
//           initialOffset={40}
//           // onEndReached={_.debounce(this.endScroll), 500}
//           renderFooter={this.renderFooter}
//           renderAheadDistance={400}
//         />
//       </View>)
//   }
// }
// export default withCreations(Creations)
// const styles = StyleSheet.create({
//   root: {
//     flex: 1
//   },
//   list: {
//     paddingLeft: 12,
//     paddingTop: 10
//   },
//   modal: {
//     flex: 1,
//     margin: 0
//   },
//   loader: {
//     bottom: 20,
//     marginTop: 30
//   },
//   modal2: {
//     flex: 1,
//     zIndex: 10,
//     margin: 0,
//     justifyContent: 'flex-end'
//   },
//   testView: {
//     height: 200,
//     width: 400,
//     backgroundColor: 'green',
//     borderColor: 'red',
//     borderWidth: 1
//   }
// })
