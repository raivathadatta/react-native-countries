import {Text, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {requestUserPermission} from '../../firebaseConfig';
import '../../pushNotificationConfig';
import CountryCard from './components/Card/CounterCard';
import {useDispatch, useSelector} from 'react-redux';
import {
  setSelectedCounter,
  setSearchCountries,
} from '../data/appredux/countrySlice';
import AppInputTextFelid from './components/AppInputTextFelsds';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const homeState = useSelector(state => state.country);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(homeState.countries);

  useEffect(() => {
    requestUserPermission();
  }, []);
  const onClick = item => {
    dispatch(setSelectedCounter(item.cca3));
    navigation.navigate('detail');
  };
  const onChangeText = value => {
    setSearchQuery(value);
    setFilteredData(homeState.searchQuery);
    dispatch(setSearchCountries(value));
    // setFilteredData()
  };
  return (
    <>
      <View style={styles.searchContainer}>
        <AppInputTextFelid
          placeholder="Search countries..."
          value={searchQuery}
          onChangeText={onChangeText}
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

//       {/* <ScrollView>
//       <View style={{height: '400px'}}>
//         <ScrollView horizontal key="horizontal">
//           {data.map((country, index) => {
//             return (
//               <>
//                 <CountryCard
//                   key={index}
//                   cardKey={country.name.common}
//                   imageUrl={country.flags.png}
//                   name={country.name.common}
//                   population={country.population}
//                   region={country.region}
//                   onPress={() => onClick(country)}
//                 />
//               </>
//             );
//           })}
//         </ScrollView>
//       </View> */}
