import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import InfoScreen from './screens/InfoScreen'
import HomeScreen from './screens/HomeScreen'
import ScanScreen from './screens/ScanScreen'
import Ionicons from '@expo/vector-icons/Ionicons'

const BottomTab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Info') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } else if (route.name === 'Scan') {
              iconName = focused ? 'ios-scan-circle' : 'ios-scan-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'teal',
          inactiveTintColor: 'gray',
        }}
      >
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
        />
        <BottomTab.Screen
          name="Scan"
          component={ScanScreen}
        />
        <BottomTab.Screen
          name="Info"
          component={InfoScreen}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

export default App;
