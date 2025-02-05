import * as React from 'react'
import { View, Text, Linking } from 'react-native'
import { Button, Image } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'

function InfoScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar style="dark" />
      <View style={{ alignSelf: 'flex-start', padding: 16 }}>
        <Image source={require('../assets/logo.png')} style={{ width: 200, height: 200 }} />
        <Text style={{ fontSize: 16 }}>GeoTrace is a Privacy-Centered Contact Tracing App enhanced for older generation devices and developing countries.</Text>
        <Text />
        <Text style={{ fontSize: 16 }}>Made with {'❤️'} at Hack the North++ 2020.</Text>
        <Text />
        <Button
          buttonStyle={{
            backgroundColor: 'black'
          }}
          title={'Check out the project on GitHub'}
          icon={{
            name: "github",
            type: 'font-awesome',
            color: "white"
          }}
          onPress={() => {
            Linking.openURL('https://github.com/geotraceapp')
          }}
        />
      </View>
    </View>
  );
}

export default InfoScreen
