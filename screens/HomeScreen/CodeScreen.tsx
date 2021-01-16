import * as React from 'react'
import { View, Text } from 'react-native'
import { Button, Input } from 'react-native-elements'

function HomeScreen({ navigation }) {
  return (
    <View>
      <View style={{ padding: 16 }}>
        <Text style={{ fontWeight: '300', fontSize: 24 }}>Please enter a Contact Tracing code to check in.</Text>
        <Text />
        <Input
          placeholder='Contact Tracing Code'
        />
        <Text />
        <Button
          buttonStyle={{
            backgroundColor: 'black'
          }}
          title={'Submit Contact Tracing Code'}
          icon={{
            name: "keyboard-o",
            type: 'font-awesome',
            color: "white"
          }}
          onPress={() => {
            navigation.navigate('Home')
          }}
        />
        <Text />
        <Button
          buttonStyle={{
            backgroundColor: 'black'
          }}
          title={'Scan QR Code'}
          icon={{
            name: "qrcode",
            type: 'font-awesome',
            color: "white"
          }}
          onPress={() => {
            navigation.navigate('Scan')
          }}
        />
      </View>
    </View>
  );
}

export default HomeScreen
