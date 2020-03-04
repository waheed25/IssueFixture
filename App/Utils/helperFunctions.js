export function getCategoriesId (arrayData) {
  let finalString = ''
  for (let i = 0; i < arrayData.length; i++) {
    finalString = i !== arrayData.length - 1 ? `${finalString}${arrayData[i].id},` : `${finalString}${arrayData[i].id}`
  }
  return finalString
}

export function UnselectCategory (id, data) {
  let tempData = data
  for (let i = 0; i < tempData.length; i++) {
    if (tempData[i].id === id) {
      tempData[i].selected = false
      break
    }
  }
  return tempData
}
