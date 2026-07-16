import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Icon, Avatar} from '@rneui/themed';
import {
  GiftedChat,
  Send,
  InputToolbar,
  Avatar as GiftedAvatar,
} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

const Chat = ({navigation, route}: {navigation: any; route: any}) => {
  const room = route.params.room;
  const [messages, setMessages] = useState<any[]>([]);

  const onSend = useCallback((messages: any[] = []) => {
    const message = messages[0];
    try {
      firestore().collection('Chats').doc(room.id).collection('Messages').add({
        _id: message._id,
        text: message.text,
        createdAt: firestore.FieldValue.serverTimestamp(),
        user: auth().currentUser?.uid,
        userName: auth().currentUser?.displayName,
        userAvatar: auth().currentUser?.photoURL,
      });
      firestore()
        .collection('Rooms')
        .doc(room.id)
        .update({
          latestMessage: {
            text: message.text,
            createdAt: firestore.FieldValue.serverTimestamp(),
          },
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    const fetchMsg = () => {
      try {
        const unsubscribe = firestore()
          .collection('Chats')
          .doc(room.id)
          .collection('Messages')
          .orderBy('createdAt', 'desc')
          .onSnapshot(async querySnapshot => {
            const messages = await Promise.all(
              querySnapshot.docs.map(async doc => {
                const firebaseData = doc.data();
                const msg = {
                  _id: doc.id,
                  text: firebaseData.text,
                  createdAt: firebaseData.createdAt?.seconds
                    ? new Date(firebaseData.createdAt?.seconds * 1000)
                    : new Date(),
                  user: {
                    _id: firebaseData.user,
                    name: firebaseData.userName,
                    avatar: firebaseData.userAvatar,
                  },
                };
                return msg;
              }),
            );
            setMessages(messages);
          });
        return unsubscribe;
      } catch (e) {
        console.log(e);
      }
    };
    fetchMsg();
  }, []);

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: 'rgb(17 24 39)',
          borderTopWidth: 0,
          padding: 5,
          color: 'white',
          fontWeight: 'bold',
        }}
      />
    );
  };

  const renderSend = (props: any) => (
    <Send {...props}>
      <View style={{marginRight: 10, marginBottom: 5}}>
        <Icon name="send" type="material" color="white" size={30} />
      </View>
    </Send>
  );

  return (
    <>
      <View
        style={{
          backgroundColor: 'rgb(17 24 39)',
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: 'white',
          height: 80,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            padding: 10,
          }}>
          <Icon
            name="arrow-left"
            type="feather"
            size={30}
            color="white"
            onPress={() => {
              navigation.goBack();
            }}
          />

          <Avatar
            rounded
            title={room?.RoomName[0] ?? 'R'}
            size={40}
            containerStyle={{
              backgroundColor: 'rgb(2 132 199)',
              borderRadius: 50,
            }}
          />

          <Text style={{color: 'white', fontSize: 20}}>{room?.RoomName}</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
            gap: 10,
          }}>
          <Icon name="camera" type="feather" color="white" size={25} />
          <Icon name="more-vertical" type="feather" color="white" size={25} />
        </View>
      </View>

      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: auth().currentUser?.uid ?? '',
          name: auth().currentUser?.displayName ?? '',
        }}
        placeholder="Type your message here..."
        renderLoading={() => <Text>Loading...</Text>}
        isLoadingEarlier={true}
        alignTop={true}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgb(17 24 39)',
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

export default Chat;
