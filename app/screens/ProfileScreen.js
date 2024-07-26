import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import ActionSheet from 'react-native-actions-sheet';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

const ProfileScreen = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const actionSheetRef = useRef(null);

  useEffect(() => {
    const currentUser = auth().currentUser;
    console.log(currentUser);
    setUser(currentUser);
    if (currentUser && currentUser.photoURL) {
      setProfileImage(currentUser.photoURL);
    }
    checkLocationPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkLocationPermission = async () => {
    let permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const result = await check(permission);

    if (result === RESULTS.GRANTED) {
      getCurrentLocation();
    } else {
      const requestResult = await request(permission);
      if (requestResult === RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        Alert.alert('Location permission denied');
      }
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation(position);
        fetchAddress(position.coords.latitude, position.coords.longitude);
      },
      error => {
        console.log(error.code, error.message);
        Alert.alert(error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await fetchAddress(latitude, longitude);

      const formattedAddress = response.display_name;
      setAddress(formattedAddress);
    } catch (error) {
      console.error(error);
      Alert.alert('Error fetching address');
    }
  };

  const handleSignOut = async () => {
    try {
      await auth().signOut();
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    }
  };

  const handleImagePicker = type => {
    if (type === 'camera') {
      launchCamera({mediaType: 'photo'}, handleImageResponse);
      closeActionSheet();
    } else {
      launchImageLibrary({mediaType: 'photo'}, handleImageResponse);
    }
  };

  const handleImageResponse = response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorMessage) {
      console.log('ImagePicker Error: ', response.errorMessage);
    } else {
      const source = {uri: response.assets[0].uri};
      setProfileImage(source.uri);
      // Here you would upload the image to your server or Firebase Storage and update the user's profile photoURL
    }
  };

  const openActionSheet = () => {
    actionSheetRef.current?.setModalVisible(true);
  };

  const closeActionSheet = () => {
    actionSheetRef.current?.setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{address || 'Fetching address...'}</Text>
      <TouchableOpacity onPress={openActionSheet}>
        {profileImage ? (
          <Image source={{uri: profileImage}} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Add Image</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.name}>{user ? user.displayName : 'Guest'}</Text>
      <Text style={styles.location}>
        Location:{' '}
        {location
          ? `${location.coords.latitude}, ${location.coords.longitude}`
          : 'Unknown'}
      </Text>
      <Button title="Sign Out" onPress={handleSignOut} />

      <ActionSheet ref={actionSheetRef}>
        <View style={styles.actionSheetContent}>
          <Button title="Camera" onPress={() => handleImagePicker('camera')} />
          <Button
            title="Gallery"
            onPress={() => handleImagePicker('gallery')}
          />
          <Button title="Cancel" onPress={closeActionSheet} />
        </View>
      </ActionSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#cccccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    color: '#ffffff',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  location: {
    fontSize: 16,
    marginBottom: 20,
    color: 'black',
  },
  actionSheetContent: {
    padding: 20,
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
  },
});

export default ProfileScreen;
