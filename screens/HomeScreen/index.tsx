import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react'
import { View, Text } from 'react-native'
import { Button, Image } from 'react-native-elements'
import CodeScreen from './CodeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = ({ navigation }) => {
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar style="dark" />
      <View style={{ alignSelf: 'flex-start', padding: 16 }}>
        <Image source={require('../../assets/logo.png')} style={{ width: 200, height: 200 }} />
        <Text style={{ fontWeight: 'bold', fontSize: 48 }}>Hey!</Text>
        <Text />
        <Text style={{ fontWeight: '300', fontSize: 24 }}>It's dangerous out there. Don't forget to wear a mask and stay safe!</Text>
        <Text />
        <Text style={{ fontWeight: '300', fontSize: 24 }}>Your risk level is: LOW</Text>
        <Text />
        <Text style={{ fontWeight: '300', fontSize: 24 }}>Please continue to stay safe and stay local as much as possible.</Text>
        <Text />
        <Button
          buttonStyle={{
            backgroundColor: 'black'
          }}
          title={'Enter Contact Tracing Code'}
          icon={{
            name: "keyboard-o",
            type: 'font-awesome',
            color: "white"
          }}
          onPress={() => {
            // console.log('https://github.com/geotraceapp')
            navigation.navigate('Code')
          }}
        />
        <Text />
        <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Development Stuff:</Text>
        <Text />
        <Text style={{ fontWeight: '300', fontSize: 24 }}>User ID: {id}</Text>
        <Text />
        <Text style={{ fontWeight: '300', fontSize: 24 }}>User Token: {token}</Text>
      </View>
    </View>
  )
}

const HomeStack = createStackNavigator();

function HomeScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: 'teal',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}
    >
      <HomeStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <HomeStack.Screen name="Code" component={CodeScreen} options={{ headerShown: true, title: 'Enter Code' }} />
    </HomeStack.Navigator>
  );
}

export default HomeScreen
