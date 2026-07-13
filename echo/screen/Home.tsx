import React, {useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import RoomList from '../components/RoomList';
import {Icon} from '@rneui/themed';
import firestore from '@react-native-firebase/firestore';

const Home = ({navigation}: {navigation: any}) => {
  const ScrollRef = React.useRef(null);
  const searchInput = React.useRef<TextInput>(null);
  const [search, setSearch] = React.useState('');
  const [Rooms, setRooms] = React.useState<any>([]);
  const [filter, setFilter] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(true);

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text.length > 0) {
      handleFilter(text);
    } else {
      setFilter(Rooms);
    }
  };

  const handleFilter = (text: string) => {
    const filtered = Rooms.filter((room: any) => {
      return room.RoomName.toLowerCase().includes(text.toLowerCase());
    });
    setFilter(filtered);
  };

  const handleTop = () => {
    if (ScrollRef.current) {
      (ScrollRef.current as any).scrollTo({x: 0, y: 0});
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (!user) {
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      }
    });
    return subscriber;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await firestore().collection('Rooms').get();
        const rooms: any = [];
        data.forEach(doc => {
          rooms.push({...doc.data(), id: doc.id});
        });
        setRooms(rooms);
        setFilter(rooms);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();

    return () => {};
  }, []);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: 'rgb(17 24 39)',
            flex: 1,
          },
        ]}>
        <Text style={styles.heading}>
          <ActivityIndicator size="large" color="white" />
        </Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: 'rgb(17 24 39)',
          flex: 1,
        }}
        ref={ScrollRef}>
        <View style={styles.container}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 10,
            }}>
            <Text style={styles.heading}>Echo</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Icon
                name="edit"
                type="feather"
                color="white"
                size={25}
                onPress={() => {
                  navigation.navigate('AddRoom');
                }}
              />
              <Icon
                name="more-vertical"
                type="feather"
                color="white"
                size={25}
                onPress={() => {
                  navigation.navigate('Profile');
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: 10,
            backgroundColor: 'white',
            borderColor: 'white',
            borderRadius: 30,
            paddingHorizontal: 10,
          }}>
          <Icon name="search" type="feather" color="black" size={25} />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#000"
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 10,
              color: '#000',
            }}
            ref={searchInput}
            onChangeText={handleSearch}
          />
          {search && (
            <Pressable
              onPress={() => {
                setSearch('');
                if (searchInput?.current) {
                  (searchInput.current as TextInput).clear();
                }
              }}>
              <Icon name="x" type="feather" color="black" size={25} />
            </Pressable>
          )}
        </View>
        <RoomList Rooms={filter} navigation={navigation} />
      </ScrollView>

      {filter.length > 0 && (
        <Pressable
          onPress={handleTop}
          style={{
            position: 'absolute',
            bottom: 20,
            right: 10,
            zIndex: 100,
            backgroundColor: 'rgb(2 132 199)',
            padding: 10,
            borderRadius: 50,
          }}>
          <Icon name="arrow-up" type="feather" color="white" size={25} />
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  subcontainer: {
    width: '100%',
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    margin: 10,
    padding: 10,
    width: '90%',
    borderRadius: 10,
    color: '#000',
    backgroundColor: '#ffffff',
  },
  tagline: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  subtext: {
    color: 'white',
    fontSize: 16,
  },
  text: {
    color: 'rgb(2 132 199)',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    margin: 10,
    marginBottom: 5,
    width: '85%',
    backgroundColor: 'rgb(2 132 199)',
    padding: 10,
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;
