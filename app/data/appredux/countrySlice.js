import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  countries: [],
  selectedCountry: {},
  searchQuery: [],
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
    setSelectedCounter: (state, action) => {
      state.selectedCountry = getCountryDetails(state, action.payload);
    },
    setSearchCountries: (state, action) => {
      state.searchQuery = setFilterData(state, action.payload);
    },
  },
});

export const {setCountries, setSelectedCounter, setSearchCountries} =
  countrySlice.actions;

const getCountryDetails = (state, countryCCA3) => {
  return state.countries.find(country => country.cca3 === countryCCA3);
};

const setFilterData = (state, value) => {
  return state.countries.filter(country =>
    country.name.common.toLowerCase().includes(value.toLowerCase()),
  );
};

export default countrySlice.reducer;
