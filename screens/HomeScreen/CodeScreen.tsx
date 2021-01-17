import * as React from 'react'
import { View, Text } from 'react-native'
import { Button, Input } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'

function CodeScreen({ navigation }) {

  const [ code, setCode ] = React.useState()
  const [id, setId] = React.useState('')
  const [token, setToken] = React.useState('')
  React.useEffect(() => {
    (async () => {
      let id = await AsyncStorage.getItem('@id')
      let token = await AsyncStorage.getItem('@token')
      if (!id || !token) {
        const res = await fetch('https://us-central1-geotrace-301902.cloudfunctions.net/makeUser')
        const obj = await res.json()
        id = obj.id
        token = obj.token
        await AsyncStorage.setItem('@id', id)
        await AsyncStorage.setItem('@token', token)
      }
      setId(id)
      setToken(token)
    })()
  }, [])

  return (
    <View>
      <View style={{ padding: 16 }}>
        <Text style={{ fontWeight: '300', fontSize: 24 }}>Please enter a Contact Tracing code to check in.</Text>
        <Text />
        <Input
          placeholder={`Contact Tracing Code`}
          onChangeText={(value) => setCode(value)}
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
            fetch(`https://us-central1-geotrace-301902.cloudfunctions.net/makeExchange?userId=${id}&userToken=${token}&establishmentToken=${code}`)
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

export default CodeScreen
