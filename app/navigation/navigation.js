/* eslint-disable react/no-unstable-nested-components */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import ProfileScreen from '../screens/ProfileScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import TextButton from '../screens/components/buttons/TextButton';
import {StyleSheet} from 'react-native';
// import CustomDrawerContent from './screen/coustemdrawer';
import SettingScreen from '../screens/SettingScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SplashScreen from '../screens/SplashScreen';
import CustomDrawer from './CustomDrawer';
import WebAppPage from '../screens/WebAppPage';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
export default function MyStack() {
  GoogleSignin.configure({
    webClientId:
      '219164080477-llon8jmj8a2lpil152f1sr4b59teo64n.apps.googleusercontent.com', // From Firebase Console
  });
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <InitialStack />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        activeTintColor: '#e91e63',
        itemStyle: {marginVertical: 5},
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="HomeTabs" component={HomeScreen} />
      <Drawer.Screen name="Settings" component={SettingScreen} />
    </Drawer.Navigator>
  );
}

function InitialStack() {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Loading"
        screenOptions={({navigation}) => ({
          headerStyle: {
            backgroundColor: '#273469',
          },
          headerTintColor: '#EBF2FA',
          headerRight: () => (
            <TextButton
              title={'profile'}
              onPress={() => navigation.navigate('ProfileScreen')}
              extendedStyle={style.buttonStyle}
              // extendedStyle:{{"color":"white"}}
            />
          ),
        })}>
        <Stack.Screen
          name="signIn"
          component={SignUpScreen}
          options={{headerRight: null}}
        />
        <Stack.Screen
          name="Home"
          component={MyDrawer}
          options={{
            title: 'Countries',
          }}
        />
        <Stack.Screen
          name="Loading"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{presentation: 'modal'}}
        />
        <Stack.Screen name="detail" component={DetailsScreen} />
        <Stack.Screen name="webPage" component={WebAppPage} />
      </Stack.Navigator>
    </>
  );
}

const style = StyleSheet.create({
  buttonStyle: {
    color: 'white',
    marginLeft: 7,
    fontSize: 15,
    fontWeight: 'bold',
    padding: 5,
  },
});

/// add a log out button and navigate to sign in screen and clear the  navigation stack
