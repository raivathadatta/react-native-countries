import axios from 'axios';

const fetchCountriesData = async () => {
  let result = await axios.get('https://restcountries.com/v3.1/all');
  let data = result.data;
  return data;
};

export const fetchAddress = async (latitude, longitude) => {
  const response = await axios.get(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
  );
  return response.data;
};
export default fetchCountriesData;
