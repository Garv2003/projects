import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Avatar} from '@rneui/themed';
import {Icon} from '@rneui/themed';

const Profile = ({navigation}: {navigation: any}) => {
  console.log(auth().currentUser);
  return (
    <View style={styles.container}>
      <Icon
        name="arrow-left"
        type="feather"
        size={30}
        color="white"
        containerStyle={{
          position: 'absolute',
          left: 10,
          top: 10,
          padding: 10,
          backgroundColor: 'rgb(2 132 199)',
          borderRadius: 50,
        }}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Avatar
        rounded
        title={auth().currentUser?.displayName?.charAt(0)}
        size={150}
        containerStyle={{
          backgroundColor: 'rgb(2 132 199)',
          borderRadius: 100,
        }}
      />
      <Text style={{color: 'white', fontSize: 25}}>
        {auth().currentUser?.displayName}
      </Text>
      <Text style={{color: 'white', fontSize: 25}}>
        {auth().currentUser?.email}
      </Text>
      <Text style={{color: 'white', fontSize: 25}}>
        Creation :{' '}
        {auth().currentUser?.metadata.creationTime
          ? new Date(auth().currentUser?.metadata?.creationTime).toDateString()
          : 'N/A'}
      </Text>
      <Text style={{color: 'white', fontSize: 25}}>
        Last SignIn :{' '}
        {auth().currentUser?.metadata.lastSignInTime
          ? new Date(
              auth().currentUser?.metadata?.lastSignInTime,
            ).toDateString()
          : ''}
      </Text>
      <Pressable
        onPress={() => {
          auth()
            .signOut()
            .then(() => {
              navigation.reset({
                index: 0,
                routes: [{name: 'Login'}],
              });
            });
        }}
        style={{
          backgroundColor: 'rgb(2 132 199)',
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
        }}>
        <Text style={{color: 'white'}}>Logout</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(17 24 39)',
    gap: 10,
  },
});

export default Profile;
