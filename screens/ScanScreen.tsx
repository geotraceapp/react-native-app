import { BarCodeScanner } from 'expo-barcode-scanner'
import { StatusBar } from 'expo-status-bar';
import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'

function ScanScreen() {

  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);
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

  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    fetch(`https://us-central1-geotrace-301902.cloudfunctions.net/makeExchange?userId=${id}&userToken=${token}&establishmentToken=${data}`)
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar style="light" />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && 
        <Button
          title={'Tap to Scan Again'}
          onPress={() => setScanned(false)} 
          buttonStyle={{
            backgroundColor: 'black'
          }}
        />
      }
    </View>
  );
}

export default ScanScreen
