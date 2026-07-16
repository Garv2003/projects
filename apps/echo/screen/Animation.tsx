import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';

const Animation = ({navigation}: {navigation: any}) => {
  setTimeout(() => {
    const user = auth().currentUser;
    if (user) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  }, 5000);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Echo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(17 24 39)',
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default Animation;
