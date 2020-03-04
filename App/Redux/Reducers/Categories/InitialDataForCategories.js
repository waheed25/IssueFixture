import WefiqIcons from '../../../Components/CustomIcons/CustomIcons'
import Colors from '../../../Styles/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import React from 'react'

export const data = [
  {
    categoryName: 'All',
    count: 123,
    iconSelected: <WefiqIcons name='playlist' size={60} color={Colors.White} />,
    iconUnSelected: <WefiqIcons name='playlist' size={60} color={Colors.appColor} />,
    selected: true,
    id: 0
  },
  {
    categoryName: 'Video',
    count: 3412,
    iconSelected: <WefiqIcons name='video' size={50} color={Colors.White} />,
    iconUnSelected: <WefiqIcons name='video' size={50} color={Colors.appColor} />,
    selected: false,
    id: 35
  },
  {
    categoryName: 'Music',
    count: 123,
    iconSelected: <Ionicons name='ios-musical-notes' size={70} color={Colors.White} />,
    iconUnSelected: <Ionicons name='ios-musical-notes' size={70} color={Colors.appColor} />,
    selected: false,
    id: 36
  },
  {
    categoryName: 'Photos',
    count: 234,
    iconSelected: <WefiqIcons name='photo' size={50} color={Colors.White} />,
    iconUnSelected: <WefiqIcons name='photo' size={50} color={Colors.appColor} />,
    selected: false,
    id: 43
  },
  {
    categoryName: 'Podcast',
    count: 643,
    iconSelected: <FontAwesome name='podcast' size={70} color={Colors.White} />,
    iconUnSelected: <FontAwesome name='podcast' size={70} color={Colors.appColor} />,
    selected: false,
    id: 42
  },
  {
    categoryName: 'Arts',
    count: 989,
    iconSelected: <MaterialCommunityIcons name='palette' size={70} color={Colors.White} />,
    iconUnSelected: <MaterialCommunityIcons name='palette' size={70} color={Colors.appColor} />,
    selected: false,
    id: 40
  }
]
// TODO:: For unknown reason if we use same data for initializing the both search and general creation categories in that case single change effect in both list.
export const SearchData = [
  {
    categoryName: 'All',
    count: 123,
    iconSelected: <WefiqIcons name='playlist' size={60} color={Colors.White} />,
    iconUnSelected: <WefiqIcons name='playlist' size={60} color={Colors.appColor} />,
    selected: true,
    id: 0
  },
  {
    categoryName: 'Video',
    count: 3412,
    iconSelected: <WefiqIcons name='video' size={50} color={Colors.White} />,
    iconUnSelected: <WefiqIcons name='video' size={50} color={Colors.appColor} />,
    selected: false,
    id: 35
  },
  {
    categoryName: 'Music',
    count: 123,
    iconSelected: <Ionicons name='ios-musical-notes' size={70} color={Colors.White} />,
    iconUnSelected: <Ionicons name='ios-musical-notes' size={70} color={Colors.appColor} />,
    selected: false,
    id: 36
  },
  {
    categoryName: 'Photos',
    count: 234,
    iconSelected: <WefiqIcons name='photo' size={50} color={Colors.White} />,
    iconUnSelected: <WefiqIcons name='photo' size={50} color={Colors.appColor} />,
    selected: false,
    id: 43
  },
  {
    categoryName: 'Podcast',
    count: 643,
    iconSelected: <FontAwesome name='podcast' size={70} color={Colors.White} />,
    iconUnSelected: <FontAwesome name='podcast' size={70} color={Colors.appColor} />,
    selected: false,
    id: 42
  },
  {
    categoryName: 'Arts',
    count: 989,
    iconSelected: <MaterialCommunityIcons name='palette' size={70} color={Colors.White} />,
    iconUnSelected: <MaterialCommunityIcons name='palette' size={70} color={Colors.appColor} />,
    selected: false,
    id: 40
  }
]
