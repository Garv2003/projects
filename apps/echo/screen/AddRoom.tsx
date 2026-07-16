import React from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';
import ToastComponent, {showToast, showError} from '../utils/Toast';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const AddRoom = ({navigation}: {navigation: any}) => {
  const [RoomName, setRoomName] = React.useState('');

  const handleRoom = async () => {
    if (!RoomName) {
      showError('Room Name is required');
      return;
    }

    try {
      const user = auth().currentUser;
      await firestore().collection('Rooms').add({
        RoomName,
        createdBy: user?.uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      showToast('Room Added Successfully');
      setRoomName('');
      navigation.goBack();
    } catch (error: any) {
      showError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: 'white',
          fontSize: 24,
          fontWeight: 'bold',
        }}>
        Add Room
      </Text>
      <TextInput
        placeholder="Room Name"
        style={styles.input}
        placeholderTextColor="black"
        value={RoomName}
        onChangeText={text => setRoomName(text)}
      />
      <Pressable style={styles.button} onPress={handleRoom}>
        <Text style={styles.text}>Add Room</Text>
      </Pressable>
      <ToastComponent />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(17 24 39)',
  },
  input: {
    backgroundColor: 'white',
    width: '80%',
    color: 'black',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  button: {
    backgroundColor: 'rgb(2 132 199)',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
};

export default AddRoom;
