import React from 'react'
import { Container, Header, Tab, Tabs, ScrollableTab, TabHeading,Content  } from 'native-base'

import {
  createAppContainer, createMaterialTopTabNavigator, MaterialTopTabBar
} from 'react-navigation'
import { Text, View, ScrollView, Animated, Dimensions } from 'react-native'
import UserCreations from './FetchUserCreations'
import HomeCreations from '../Creations/Creations'
import GridView from '../../Components/CollectionsThumbnail'
import Testcomponent from '../ProfileView'
class Collection extends React.Component {
  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> here is Details! </Text>
      </View>
    )
  }
}
class Refiq extends React.Component {
  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> here is Details! </Text>
      </View>
    )
  }
}
const TabBarComponent = (props) => (<MaterialTopTabBar {...props} />)

const Home = createMaterialTopTabNavigator({
  Tab1: {
    screen: UserCreations,
    navigationOptions: (userInfo) => (
      {
        title: `Creations`
      })
  },
  Tab2: {
    screen: Collection,
    navigationOptions: ({ navigation }) => ({
      title: 'Collection'
    })
  },
  // discover: {
  //   screen: Discover,
  // },
  Tab3: {
    screen: Refiq,
    navigationOptions: ({ navigation }) => ({
      title: 'Refiq'
    })
  }
}, {
  initialRouteName: 'Tab1',
  tabBarPosition: 'top',
  swipeEnabled: true, // change to test this bug
  animationEnabled: true,
  lazy: true,
  tabBarComponent: props =>
    <TabBarComponent
      {...props}
      style={{ marginTop: 15, backgroundColor: 'white', borderWidth: 1, borderColor: '#cbcbcb', borderRadius: 1 }}
      />,
  tabBarOptions: {
    activeTintColor: '#2AAAD2',
    inactiveTintColor: 'gray',
      // scrollEnabled: true,
    upperCaseLabel: false,
    swipeEnabled: true,
    activeLabelStyle: {
      fontSize: 12
    },
    labelStyle: {
      fontSize: 16,
      fontFamily: 'SourceSansPro-Regular'
    },
    style: {
      backgroundColor: 'transparent'
        // borderColor: 'green'
        // width: Sizes.DEVICE_WIDTH
    },
    indicatorStyle: {
      backgroundColor: 'transparent',
      width: 40,
      marginLeft: 40
    }
  },
  tabStyle: {
    width: 50
  }
})
class TabsScrollableExample extends React.Component {
  constructor (props) {
    super(props)
    this.state = { currentTab: 0, }

  }
  render () {
    const { user } = this.props
    return (

        <Content style={{ flex: 1, overflow: 'scroll', }}>
        <Tabs onChangeTab={({ i }) =>
          this.setState({ currentTab: i })} renderTabBar={() => <ScrollableTab stickyHeaderIndices={[1]}
            underlineStyle={{ backgroundColor: 'white' }} style={{ backgroundColor: 'red' }}
         />}>
          <Tab activeTextStyle={{ color: 'red' }} heading={
            <TabHeading activeTextStyle={{}} style={{ backgroundColor: 'white' }}>
              <Text style={{ color: this.state.currentTab === 0 ? '#2AAAD2' : 'gray' }}>{`Creation (${user.creations_count})`} </Text>
            </TabHeading>}>
            <ScrollView>
              <UserCreations {...this.props} /></ScrollView>
          </Tab>
          <Tab heading={
            <TabHeading style={{ backgroundColor: 'white' }}>
              <Text style={{ color: this.state.currentTab === 1 ? '#2AAAD2' : 'gray' }}>{`Collections (${user.collections_count})`}</Text>
            </TabHeading>}>
            <GridView />
          </Tab>
          <Tab heading={
            <TabHeading style={{ backgroundColor: 'white' }}>
              <Text style={{ color: this.state.currentTab === 2 ? '#2AAAD2' : 'gray' }}>{`Refiq (${user.refiqes_count})`}</Text>
            </TabHeading>}>
            <View />
          </Tab>
        </Tabs>
        </Content>
    )
  }
}

export default TabsScrollableExample
