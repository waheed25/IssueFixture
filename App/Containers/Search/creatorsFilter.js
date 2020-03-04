import React from 'react'
import { StyleSheet, Text, PermissionsAndroid } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Header from '../../Components/Header/Header'
import Colors from '../../Styles/Colors'
import { appStyles } from '../../Styles/CommonStyles'
import { withSearch } from '../../Redux/hoc/withSearch/withSearch'
class Places extends React.Component {
  locationDetails = null
  static navigationOptions = ({navigation}) => ({
    header: null
  })

  async componentDidMount () {
    await this.requestCameraPermission()
  }
  async requestCameraPermission () {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Wefiq Location Permission',
          message:
            'Wefiq App needs access to your Location ' +
            'so you can search Creators nearby you',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission Granted')
      } else {
        console.log('Location permission denied')
      }
    } catch (err) {
      console.warn(err)
    }
  }

  applySelectedCategories=() => {
    this.props.onCreatorsLocationSelection({ locationDataForSearch: this.locationDetails })
    this.props.navigation.goBack()
  }
  render () {
    return (
      <React.Fragment>
        <Header leftIcon={<Text style={style.headerText}>Close</Text>}
          leftIconPress={() => this.props.navigation.goBack()}
          centerElement={<Text style={style.title}>Select Location</Text>}
          rightSecondIcon={<Text style={[style.headerText, { color: Colors.appColor }]}>Apply</Text>}
          rightSecondIconPress={() => this.applySelectedCategories()}
        />
        <GooglePlacesAutocomplete
          listViewDisplayed
          // listViewDisplayed={false}
          placeholder='Search'
          minLength={1} // minimum length of text to search
          autoFocus={false}
          fetchDetails
          onPress={(data, details = null) => {
            this.locationDetails = details
            console.log('%c Location details::', 'font-size: 35px', this.locationDetails)
          }}
          // renderDescription={row =>console.log('row',row)}
          // renderRow={(rowData)=> console.log('%c Row Data::', 'color: green; font-size: 25px', rowData )}
          getDefaultValue={() => {
            return '' // text input default value
          }}
          query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyAiqE0-QjCvO52a1Y5wqZqr-YDG95u9Fls',
            language: 'en', // language of the results
            types: 'address' // default: 'geocode'
          }}
          styles={{
            description: {
              fontWeight: 'bold',
              textAlign: 'right'
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            }
          }}
          currentLocation
          // currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel='Use your current location'
          nearbyPlacesAPI='None' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{}}
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro}
          GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: 'food'
          }}
          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          predefinedPlacesAlwaysVisible
      />
      </React.Fragment>

    )
  }
}

const style = StyleSheet.create({
  container: {
    ...appStyles.container
  },
  title: {
    ...appStyles.commonFontSemiBold,
    fontSize: 16
  },
  headerText: {
    ...appStyles.defaultFontFamily,
    fontSize: 14
  }
})

export default withSearch(Places)
