import { fetchSingleCreation } from '../Services/data/creations'

export async function handleDataChange (PreviousData, pusherData, index, userID) {
  console.log('index is ::::', index)
  console.log('PreviousData is ::::', PreviousData)
  console.log('pusherData is ::::', pusherData)
  let i = index
  // for (let i = 0; i < PreviousData.length; i++) {
  debugger
  // if (PreviousData[i].attributes.drupal_internal__nid.toString() === pusherData.data.id) {
    if (pusherData.action === 'insert' && pusherData.data.relationship.type === 'like') {
        // 1. Make a shallow copy of the items
      let items = [...PreviousData]
        // 2. Make a shallow copy of the item you want to mutate
      let item = {...items[i]}
        // 3. Replace the property you're intested in
      item.attributes.likes_count++
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
      items[i] = item
        // 5 put Uuid in likes
      item.attributes.liked_uuid = pusherData.data.uuid
        // 6. Set the state to our new copy
      PreviousData = items
      return PreviousData
    }
    if (pusherData.action === 'delete' && pusherData.data.relationship.type === 'like') {
        // 1. Make a shallow copy of the items
      let items = [...PreviousData]
        // 2. Make a shallow copy of the item you want to mutate
      let item = {...items[i]}
        // 3. Replace the property you're intested in
      item.attributes.likes_count--
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        // 5 remove Uuid in likes
      item.attributes.liked_uuid = null
      items[i] = item
        // 5. Set the state to our new copy
      PreviousData = items
      return PreviousData
    }
    if (pusherData.action === 'insert' && pusherData.type === 'wefiq_views_count') {
        // 1. Make a shallow copy of the items
      let items = [...PreviousData]
        // 2. Make a shallow copy of the item you want to mutate
      let item = {...items[i]}
        // 3. Replace the property you're intested in
      item.attributes.views_count++
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
      items[i] = item
        // 5. Set the state to our new copy
      PreviousData = items
      return PreviousData
    }
    if (pusherData.action === 'insert' && pusherData.type === 'wefiq_activity') {
        // 1. Make a shallow copy of the items
      let items = [...PreviousData]
        // 2. Make a shallow copy of the item you want to mutate
      let item = {...items[i]}
        // 3. Replace the property you're intested in
      item.attributes.refiqes_count++
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
      item.attributes.refiqed_uuid = pusherData.data.uuid
      items[i] = item
        // 5. Set the state to our new copy
      PreviousData = items
      return PreviousData
    }
    if (pusherData.action === 'delete' && pusherData.type === 'wefiq_activity') {
        // 1. Make a shallow copy of the items
      let items = [...PreviousData]
        // 2. Make a shallow copy of the item you want to mutate
      let item = {...items[i]}
        // 3. Replace the property you're intested in
      item.attributes.refiqes_count--
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
      item.attributes.refiqed_uuid = null
      items[i] = item
        // 5. Set the state to our new copy
      PreviousData = items
      return PreviousData
    }
    if (pusherData.action === 'meta_update' && pusherData.type === 'creation') {
      // 1. Make a shallow copy of the items
      let items = [...PreviousData]
      // 2. Make a shallow copy of the item you want to mutate
      let item = {...items[i]}
      if (pusherData.data.data.meta.key === 'LIKES_COUNT') {
        item.attributes.likes_count = pusherData.data.data.meta.value
        debugger
        item.attributes.liked_uuid = parseInt(pusherData.data.data.meta.uid) === userID ? pusherData.data.data.meta.uuid : null
      }
      if (pusherData.data.data.meta.key === 'REFIQES_COUNT') {
        item.attributes.refiqes_count = pusherData.data.data.meta.value
        item.attributes.refiqed_uuid = parseInt(pusherData.data.data.meta.uid) === userID ? pusherData.data.data.meta.uuid : null
      }
      items[i] = item
      // 5. Set the state to our new copy
      PreviousData = items
      return PreviousData
    }
    if (pusherData.action === 'delete' && pusherData.type === 'creation') {
      // 1. Make a shallow copy of the items
      let items = [...PreviousData]
      // 2. Make a shallow copy of the item you want to mutate
      items.splice(i, 1)
      // 3. Replace the property you're intested in
      // item.attributes.refiqesCount--
      // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
      // item.attributes.refiqedUuid = null
      // items[i] = item
      // 5. Set the state to our new copy
      PreviousData = items
      return PreviousData
    }
    // if (pusherData.action === 'insert' && pusherData.type === 'comment') {
    //   // const uuid = pusherData.data.uuid
    //   // const data = await fetchSingleCreation({uuid, api: 'comment'})
    //   // 1. Make a shallow copy of the items
    //   let items = [...PreviousData]
    //   // 2. Make a shallow copy of the item you want to mutate
    //   let item = {...items[i]}
    //   // 3. Replace the property you're intested in
    //   item.attributes.comment.commentCount++
    //   // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    //   items[i] = item
    //   // 5. Set the state to our new copy
    //   PreviousData = items
    //   return PreviousData
    // } else {
    //   return PreviousData
    // }
    // if (pusherData.action === 'update' && pusherData.type === 'creation') {
    //   const uuid = pusherData.data.uuid
    //     // const data = await fetchSingleCreation(uuid)
    //     // 1. Make a shallow copy of the items
    //   let items = [...PreviousData]
    //     // 2. Make a shallow copy of the item you want to mutate
    //     // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    //   let item = {...items[i]}
    //   item.attributes.status = !item.attributes.status
    //     // 5. Set the state to our new copy
    //   items[i] = item
    //   PreviousData = items
    //   console.log('After update data is :::', PreviousData)
    //   return PreviousData
    // }
    else {
      return PreviousData
    }
    // }
}
