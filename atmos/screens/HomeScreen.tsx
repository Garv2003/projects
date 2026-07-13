import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {theme} from '../theme';
import {MagnifyingGlassIcon, XMarkIcon} from 'react-native-heroicons/outline';
import {CalendarDaysIcon} from 'react-native-heroicons/solid';
import React, {useEffect, useState} from 'react';
import {weatherImages} from '../constants';
import {getData, storeData} from '../utils/asyncStorage';
import * as Progress from 'react-native-progress';
import {fetchWeatherForecast} from '../api/weather';

type TypeWeather = {
  id: number;
  name: string;
  cord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

type TypeDayList = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
};

type TypeLocation = {
  name: string;
  country: string;
};

export default function HomeScreen() {
  // const [showSearch, toggleSearch] = useState(false);
  // const [locations, setLocations] = useState<TypeLocation[]>([
  //   {
  //     name: 'Delhi',
  //     country: 'IN',
  //   },
  //   {
  //     name: 'Mumbai',
  //     country: 'IN',
  //   },
  // ]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<TypeWeather>();
  const [DayList, setDayList] = useState<TypeDayList[]>([]);
  const [show, setShow] = useState(false);
  // const orientation = useDeviceOrientation();
  // console.log(orientation);
  // const handleSearch = search => {
  //   if (search && search.length > 2)
  //     fetchLocations({cityName: search}).then(data => {
  //       setLocations(data);
  //     });
  // };

  const handleLocation = () => {
    Keyboard.dismiss();
    setLoading(true);
    fetchWeatherForecast({
      cityName: search,
    } as unknown as {cityName: string})
      .then((data: any) => {
        if (data?.data?.cod === '200') {
          setWeather(data?.data?.city);
          setDayList(data?.data?.list);
          setLoading(false);
          storeData('city', search);
        } else {
          setLoading(false);
          Alert.alert('City not found');
        }
      })
      .catch(err => {
        setLoading(false);
        Alert.alert('City not found');
      });
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setShow(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setShow(false);
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [show]);

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    let myCity = await getData('city');
    let cityName = 'Delhi';
    if (myCity) {
      cityName = myCity;
    }
    fetchWeatherForecast({cityName} as unknown as {cityName: string}).then(
      (data: any) => {
        setWeather(data?.data?.city);
        setDayList(data?.data?.list);
        setLoading(false);
      },
    );
  };

  // const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const capitalize = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const convertTime = (date: Date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    let minutesStr = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutesStr + ' ' + ampm;
    return strTime;
  };

  const DismissKeyboard = ({children}: any) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Image
        style={{width: '100%', height: '100%'}}
        source={require('../assets/images/bg.jpg')}
        blurRadius={70}
      />
      <View style={styles.sub_container}>
        <View style={styles.header}>
          <View
            style={{
              backgroundColor: theme.bgWhite(0.2),
              borderRadius: 30,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <TextInput
              style={styles.input}
              placeholder="Search city"
              placeholderTextColor={'lightgray'}
              onChangeText={(text: string) => setSearch(text)}
            />
            <TouchableOpacity
              onPress={handleLocation}
              style={{
                backgroundColor: theme.bgWhite(0.3),
                borderRadius: 30,
                padding: 10,
                margin: 5,
              }}>
              <MagnifyingGlassIcon size={25} color="white" />
            </TouchableOpacity>
          </View>
          {/* {locations.length > 0 && showSearch ? (
              <View
                style={{
                  position: 'absolute',
                  width: '100%',
                  backgroundColor: 'gray',
                  top: 60,
                  borderRadius: 30,
                }}>
                {locations.map((loc, index) => {
                  let showBorder = index + 1 != locations.length;
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleLocation(loc)}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10,
                        paddingLeft: 20,
                        marginBottom: 5,
                        borderBottomWidth: showBorder ? 2 : 0,
                        borderBottomColor: '#000',
                      }}>
                      <MapPinIcon size={20} color="gray" />
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 16,
                          marginLeft: 10,
                        }}>
                        {loc?.name}, {loc?.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null} */}
        </View>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Progress.CircleSnail thickness={10} size={120} color="#fff" />
          </View>
        ) : show ? (
          <DismissKeyboard
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <XMarkIcon size="100" color="white" />
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginLeft: 10,
                }}>
                Swipe down to dismiss
              </Text>
            </View>
          </DismissKeyboard>
        ) : (
          <DismissKeyboard>
            <>
              <View style={styles.forecast_header}>
                <Text style={styles.forecast_header_text}>
                  {weather?.name},{' '}
                  <Text style={styles.forecast_header_text_country}>
                    {weather?.country}
                  </Text>
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={
                      weatherImages[
                        DayList[0]?.weather[0]
                          ?.description as keyof typeof weatherImages
                      ] || weatherImages['other']
                    }
                    style={{width: 100, height: 100}}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.forecast_header_text}>
                    {Math.floor(DayList[0]?.main?.temp - 273.15)}&#176;
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: 'bold',
                      marginLeft: 10,
                    }}>
                    {capitalize(DayList[0]?.weather[0]?.description)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../assets/icons/wind.png')}
                      style={{width: 20, height: 20}}
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginLeft: 10,
                      }}>
                      {DayList[0]?.wind?.speed} km
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../assets/icons/drop.png')}
                      style={{width: 20, height: 20}}
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginLeft: 10,
                      }}>
                      {DayList[0]?.main?.humidity}%
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../assets/icons/sun.png')}
                      style={{width: 20, height: 20}}
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginLeft: 10,
                      }}>
                      {DayList[0]?.main?.pressure} hPa
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{marginBottom: 10, marginLeft: 10}}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 10,
                    marginLeft: 10,
                  }}>
                  <CalendarDaysIcon size="22" color="white" />
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: 'bold',
                      marginLeft: 10,
                    }}>
                    Daily forecast
                  </Text>
                </View>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {DayList?.map((item: TypeDayList, index: number) => {
                    const date = new Date(item?.dt_txt);
                    const DayTime = convertTime(date);
                    const options: Intl.DateTimeFormatOptions = {
                      weekday: 'short',
                    };
                    let dayName = date.toLocaleDateString('en-US', options);
                    dayName = dayName.split(',')[0];
                    let image = item?.weather[0]
                      ?.description as keyof typeof weatherImages;
                    if (weatherImages[image] === undefined) {
                      image = 'other';
                    }
                    return (
                      <View
                        key={index}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: 100,
                          borderRadius: 30,
                          paddingVertical: 10,
                          marginVertical: 10,
                          marginRight: 10,
                          gap: 5,
                          backgroundColor: theme.bgWhite(0.15),
                        }}>
                        <Image
                          source={weatherImages[image]}
                          style={{width: 50, height: 50}}
                        />
                        <Text
                          style={{
                            color: 'white',
                          }}>
                          {dayName}
                        </Text>
                        <Text
                          style={{
                            color: 'white',
                          }}>
                          {DayTime}
                        </Text>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 20,
                            fontWeight: 'bold',
                          }}>
                          {Math.floor(item!.main!.temp - 273.15)}
                          &#176;
                        </Text>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </>
          </DismissKeyboard>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  sub_container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    paddingTop: 10,
  },
  header: {
    height: '7%',
    marginHorizontal: 8,
    position: 'relative',
    marginTop: 10,
    zIndex: 50,
  },
  input: {
    paddingLeft: 20,
    height: 40,
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    zIndex: 50,
  },
  forecast_header: {
    marginHorizontal: 4,
    display: 'flex',
    justifyContent: 'space-around',
    flex: 1,
    marginBottom: 10,
    paddingTop: 30,
  },
  forecast_header_text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 10,
  },
  forecast_header_text_country: {
    color: 'gray',
    fontSize: 20,
    fontWeight: 'bold',
    fontVariant: ['small-caps'],
  },
});
