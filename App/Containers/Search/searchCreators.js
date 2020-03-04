import React from 'react'
import { Text } from 'react-native'
import CreatorSearchTile from '../../Components/CreatorTile'
import WefiqList from '../../Components/WefiqList'
import NavigationService from '../../Navigation/navigationService'

export default class CreatorsList extends React.Component {
  navigateToUserProfile=(item) => {
    NavigationService.navigate('Profile', { ProfileInfo: item.attributes })
  }
  renderItem=({item, index}) => {
    const { name, picture_url, full_name, about } = item.attributes
    return <CreatorSearchTile creatorName={name} imgURL={picture_url} bio={about} onPress={this.navigateToUserProfile} item={item} />
  }
  render () {
    const { data } = this.props
    if (data.length < 1) {
      return <Text>No Result Found </Text>
    }
    return (
      <WefiqList
        data={this.props.data}
        renderItem={this.renderItem}
        windowSize={40}
        style={{paddingLeft: 12}}
        removeClippedSubviews
        initialNumToRender={10}
        legacyImplementation
        numColumns={1}
        horizontal={false}
        maxToRenderPerBatch={20}
        updateCellsBatchingPeriod={10}
        keyExtractor={(item) => `${item.id}${Math.random()}`}
      />
    )
  }
}
