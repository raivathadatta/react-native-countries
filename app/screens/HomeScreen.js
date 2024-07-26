/// add filter function in slicer and add inout color to black and back ground color
import {Text, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getFcmToken, requestUserPermission} from '../../firebaseConfig';
import '../../pushNotificationConfig';
import CountryCard from './components/Card/CounterCard';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedCounter} from '../data/appredux/countrySlice';
import AppInputTextFelid from './components/AppInputTextFelsds';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const data = useSelector(state => state.country.countries);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    requestUserPermission();
    getFcmToken();
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter(country =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  }, [searchQuery, data]);

  const onClick = item => {
    dispatch(setSelectedCounter(item.cca3));
    navigation.navigate('detail');
  };

  return (
    <>
      <View style={styles.searchContainer}>
        <AppInputTextFelid
          style={styles.searchInput}
          placeholder="Search countries..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
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
