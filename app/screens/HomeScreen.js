/// add filter function in slicer and add inout color to black and back ground color
import {Text, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getFcmToken, requestUserPermission} from '../../firebaseConfig';
import '../../pushNotificationConfig';
import CountryCard from './components/Card/CounterCard';
import {useDispatch, useSelector} from 'react-redux';
import {
  setPracticeName,
  setSearchCountries,
  setSelectedCounter,
} from '../data/appredux/countrySlice';
import AppInputTextFelid from './components/AppInputTextFelids';
import {KeyboardAvoidingView} from 'react-native';
import TextButton from './components/buttons/TextButton';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const data = useSelector(state => state.country.countries);
  const [searchQuery, setSearchQuery] = useState('');
  let filteredData = useSelector(state => state.country.filterData);
  filteredData = filteredData.length < 1 ? data : filteredData;

  useEffect(() => {
    requestUserPermission();
    getFcmToken();
  }, []);

  const onSearch = value => {
    setSearchQuery(value);
    dispatch(setSearchCountries(value));
    // filteredData =;
  };
  const onClickText = () => {
    navigation.navigate('webPage');
  };

  const onClick = item => {
    dispatch(setSelectedCounter(item.cca3));
    navigation.navigate('detail');
  };

  const onChane = value => {
    console.log(value);
    setTitle(value);
    dispatch(setPracticeName(value));
  };

  return (
    <>
      <KeyboardAvoidingView>
        <View style={styles.searchContainer}>
          <AppInputTextFelid
            style={styles.searchInput}
            placeholder="Search countries..."
            value={searchQuery}
            onChangeText={onSearch}
          />

          <AppInputTextFelid
            style={styles.searchInput}
            placeholder="update title"
            value={title}
            onChangeText={onChane}
          />
        </View>
        <TextButton title={'onclick'} onPress={onClickText} />
        <ScrollView contentContainerStyle={styles.container}>
          {filteredData.length < 1 ? (
            <Text style={styles.loadingText}>Loading...</Text>
          ) : (
            filteredData.map((country, index) => (
              <CountryCard
                key={index}
                cardKey={`${index}acvd`}
                imageUrl={country.flags.png}
                name={country.name.common}
                population={country.population}
                region={country.region}
                onPress={() => onClick(country)}
              />
            ))
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: 'red',
  },
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    color: 'red',
    textAlign: 'center',
  },
});
