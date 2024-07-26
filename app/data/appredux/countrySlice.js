import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  countries: [],
  selectedCountry: {},
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
  },
});

export const {setCountries, setSelectedCounter, setSearchCountries} =
  countrySlice.actions;

const getCountryDetails = (state, countryCCA3) => {
  return state.countries.find(country => country.cca3 === countryCCA3);
};

// const setFilterData = (state, value) => {
//   console.log(value);
//   if (value.length < 1) {
//     return state.countries;
//   }
//   const data = state.countries.filter(country =>
//     country.name.common.toLowerCase().includes(value.toLowerCase()),
//   );
//   console.log(data);
//   return data;
// };

export default countrySlice.reducer;
