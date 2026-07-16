import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import ToastComponent, {showToast, showError} from '../utils/Toast';
import firestore from '@react-native-firebase/firestore';

const Sign = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  async function register() {
    if (!name) {
      showError('Name is required');
      return;
    }
    if (!email) {
      showError('Email is required');
      return;
    }
    if (!password) {
      showError('Password is required');
      return;
    }
    if (!confirmPassword) {
      showError('Confirm Password is required');
      return;
    }
    if (password !== confirmPassword) {
      showError('Passwords do not match');
      return;
    }
    try {
      setLoading(true);
      await auth().createUserWithEmailAndPassword(email, password);
      const currentUser = auth().currentUser;
      if (currentUser) {
        await currentUser.updateProfile({
          displayName: name,
        });
        firestore().collection('Users').doc(currentUser.uid).set({
          id: currentUser.uid,
          name: name,
          email: email,
        });
      }
      showToast('User registered successfully');
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    } catch (error: any) {
      showError(error.message);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.subcontainer}>
        <Text style={styles.heading}>Create a Echo Account</Text>
        <TextInput
          placeholder="Name"
          style={styles.input}
          placeholderTextColor={'black'}
          onChangeText={text => {
            setName(text);
          }}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          placeholderTextColor={'black'}
          onChangeText={text => {
            setEmail(text);
          }}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor={'black'}
          onChangeText={text => {
            setPassword(text);
          }}
          style={styles.input}
        />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry={true}
          placeholderTextColor={'black'}
          onChangeText={text => {
            setConfirmPassword(text);
          }}
          style={styles.input}
        />
        <View style={styles.tagline}>
          <Text style={styles.subtext}>Already have an account?</Text>
          <Pressable
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={styles.text}> Login</Text>
          </Pressable>
        </View>
        {loading ? (
          <View style={styles.button}>
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : (
          <Pressable
            style={styles.button}
            onPress={() => {
              register();
            }}>
            <Text style={styles.btnText}>Sign Up</Text>
          </Pressable>
        )}
      </View>
      <ToastComponent />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(17 24 39)',
  },
  subcontainer: {
    width: '100%',
    alignItems: 'center',
  },
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10,
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

export default Sign;
