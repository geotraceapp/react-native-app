import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react'
import { View, Text } from 'react-native'
import { Button, Image } from 'react-native-elements'
import CodeScreen from './CodeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage'

const alertMessages = [
  {
    status: 'POSITIVE',
    message: 'Please stay home and take care. Call 911 for any emergencies.',
    color: '#ee5253'
  },
  {
    status: 'HIGH',
    message: 'You may have contacted someone with COVID-19. Please try to stay home as much as possible.',
    color: '#ff9f43'
  },
  {
    status: 'MEDIUM',
    message: 'Someone around you may have contacted someone with COVID-19. Please stay safe and proceed with caution.',
    color: '#feca57'
  },
  {
    status: 'LOW',
    message: 'Wear a Mask and please continue to stay safe and stay local as much as possible.',
    color: '#10ac84'
  },
  {
    status: 'NO RISK',
    message: 'Please continue to stay safe and stay local as much as possible. Follow your local restrictions and wear a mask.',
    color: '#01a3a4'
  },
  {
    status: 'Loading..',
    message: 'Please wait...',
    color: '#222f3e'
  }
]

const Home = ({ navigation }) => {
  const [id, setId] = React.useState('')
  const [token, setToken] = React.useState('')
  const [degree, setDegree] = React.useState(5)
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
        setId(id)
        setToken(token)
      }
      setId(id)
      setToken(token)
    })()
  }, [])

  React.useEffect(() => {
    (async () => {
      if (id) {
        const res = await fetch(`https://us-central1-geotrace-301902.cloudfunctions.net/getRiskLevel?userId=${id}`)
        const obj = await res.json()
        setDegree(obj.degree)
      }
    })()
  }, [id])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar style="dark" />
      <View style={{ alignSelf: 'flex-start', padding: 16 }}>
        <Image source={require('../../assets/logo.png')} style={{ width: 200, height: 200 }} />
        <Text style={{ fontWeight: 'bold', fontSize: 48 }}>Hey!</Text>
        <Text />
        <Text style={{ fontWeight: '300', fontSize: 24 }}>It's dangerous out there. Don't forget to wear a mask and stay safe!</Text>
        <Text />
        <Text style={{ fontWeight: '300', fontSize: 24 }}>Your risk level is: <Text style={{ fontWeight: 'bold', color: alertMessages[degree].color }}>{alertMessages[degree].status}</Text></Text>
        <Text />
        <Text style={{ fontWeight: '300', fontSize: 24 }}>{alertMessages[degree].message}</Text>
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
            navigation.navigate('Code')
          }}
        />
        <Text />
        <Button
          buttonStyle={{
            backgroundColor: 'black'
          }}
          title={`Report ${degree === 0 ? 'NEGATIVE' : 'POSITIVE'} for COVID-19`}
          onPress={async () => {
            await fetch(`https://us-central1-geotrace-301902.cloudfunctions.net/report${degree === 0 ? 'NEGATIVE' : 'POSITIVE'}?userId=${id}`)
            const res = await fetch(`https://us-central1-geotrace-301902.cloudfunctions.net/getRiskLevel?userId=${id}`)
            const obj = await res.json()
            setDegree(obj.degree)
          }}
        />
        {/* <Text />
        <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Development Stuff:</Text>
        <Text />
        <Text style={{ fontWeight: '300', fontSize: 24 }}>User ID: {id}</Text>
        <Text />
        <Text style={{ fontWeight: '300', fontSize: 24 }}>User Token: {token}</Text> */}
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
