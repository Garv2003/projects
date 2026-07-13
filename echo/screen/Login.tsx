import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import ToastComponent, {showToast, showError} from '../utils/Toast';

const Login = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      }
    });
    return unsubscribe;
  }, []);

  async function login() {
    if (!email) {
      showError('Email is required');
      return;
    }
    if (!password) {
      showError('Password is required');
      return;
    }
    try {
      setLoading(true);
      const user = await auth().signInWithEmailAndPassword(email, password);
      showToast('Logged In Successfully');
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    } catch (error: any) {
      console.log(error);
      showError(error.message);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.subcontainer}>
        <Text style={styles.heading}>Echo</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          secureTextEntry={false}
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
        <View style={styles.tagline}>
          <Text style={styles.subtext}>Don't have an account?</Text>
          <Pressable
            onPress={() => {
              navigation.navigate('Sign');
            }}>
            <Text style={styles.text}> Sign Up</Text>
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
              login();
            }}>
            <Text style={styles.btnText}>Login</Text>
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

export default Login;
