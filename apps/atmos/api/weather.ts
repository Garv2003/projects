import axios from 'axios';
import { apiKey } from '../constants';

// const forecastEndpoint = (params: {
//   cityName: string;
// }) =>
//   `https://api.openweathermap.org/data/2.5/forecast?q=${params.cityName}&appid=${apiKey}`;
// const locationsEndpoint = (
//   params: {
//     cityName: string;
//   }
//   // | {
//   //   lat: number;
//   //   lon: number;
//   // },
// ) =>
//   // `https://api.openweathermap.org/data/2.5/weather?${params.cityName ? `q=${params.cityName}` : `lat=${params.lat}&lon=${params.lon}`}&appid=${apiKey}`;
//   `https://api.openweathermap.org/data/2.5/weather?q=${params.cityName}&appid=${apiKey}`;
// const apiCall = async (
//   endpoint: string,
// ) => {
//   const options = {
//     method: 'GET',
//     url: endpoint,
//   };

//   try {
//     const response = await axios.request(options);
//     return response;
//   } catch (error) {
//     console.log('error: ', error);
//     return error;
//   }
// };

const forecastEndpoint = (params: {
  cityName: string;
}) =>
  `https://api.openweathermap.org/data/2.5/forecast?q=${params.cityName}&appid=${apiKey}`;
const apiCall = async (
  endpoint: string,
) => {
  const options = {
    method: 'GET',
    url: endpoint,
  };

  try {
    const response = await axios.request(options);
    return response;
  } catch (error) {
    console.log('error: ', error);
    return error;
  }
}

export const fetchWeatherForecast = (
  params: { cityName: string },
) => {
  let forecastUrl = forecastEndpoint(params);
  return apiCall(forecastUrl);
};

// export const fetchLocations = (
//   params: { cityName: string } | { lat: number; lon: number },
// ) => {
//   let locationsUrl = locationsEndpoint(params);
//   return apiCall(locationsUrl);
// };
