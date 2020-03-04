import React from 'react'
import { FlatList } from 'react-navigation'

const WefiqList = (props) => (
  <FlatList
    keyboardShouldPersistTaps='always'
    {...props}
  />
)

export default WefiqList
