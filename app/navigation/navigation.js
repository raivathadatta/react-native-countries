/* eslint-disable react/no-unstable-nested-components */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import SlashScreen from '../screens/SlashScreen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import ProfileScreen from '../screens/ProfileScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import TextButton from '../screens/components/buttons/TextButton';
import {StyleSheet} from 'react-native';

const Stack = createStackNavigator();
export default function MyStack() {
  GoogleSignin.configure({
    webClientId:
      '219164080477-llon8jmj8a2lpil152f1sr4b59teo64n.apps.googleusercontent.com', // From Firebase Console
  });
  return (
    <NavigationContainer>
      <InitialStack />
    </NavigationContainer>
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
          component={HomeScreen}
          options={{
            title: 'Countries',
          }}
        />
        <Stack.Screen
          name="Loading"
          component={SlashScreen}
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

/// add alog out buttom and navigate to sign in screen and clear the  navigation stack
