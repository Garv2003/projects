import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {ListItem, Avatar} from '@rneui/themed';

const RoomList = ({Rooms, navigation}: {Rooms: any; navigation: any}) => {
  if (Rooms.length === 0)
    return (
      <View
        style={{
          backgroundColor: 'rgb(17 24 39)',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text
          style={{
            color: 'white',
          }}>
          No Room Found
        </Text>
      </View>
    );

  const time = (time: any) => {
    const date = new Date(time?.seconds * 1000);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  return (
    <View
      style={{
        backgroundColor: 'rgb(17 24 39)',
        flex: 1,
        width: '100%',
      }}>
      {Rooms.map((l: any, i: number) => {
        return (
          <Pressable
            key={i}
            onPress={() => {
              navigation.navigate('Chat', {room: l});
            }}>
            <ListItem
              key={i}
              containerStyle={{
                backgroundColor: 'rgb(17 24 39)',
                borderColor: 'white',
              }}>
              <Avatar
                rounded
                icon={{
                  name: 'person-outline',
                  type: 'material',
                  size: 30,
                  color: 'black',
                }}
                containerStyle={{
                  backgroundColor: 'white',
                  borderRadius: 50,
                  width: 40,
                  height: 40,
                }}
              />
              <ListItem.Content>
                <ListItem.Title
                  style={{
                    color: 'white',
                  }}>
                  {l?.RoomName}
                </ListItem.Title>
                {l?.latestMessage ? (
                  <ListItem.Subtitle
                    style={{
                      color: 'white',
                    }}>
                    {l?.latestMessage.text}
                  </ListItem.Subtitle>
                ) : null}
              </ListItem.Content>
              <ListItem.Content
                right
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 5,
                }}>
                <Text
                  style={{
                    color: 'white',
                  }}>
                  {time(l?.latestMessage.createdAt)}
                </Text>
                {/* <View
                  style={{
                    backgroundColor: 'rgb(2 132 199)',
                    padding: 2,
                    width: 25,
                    height: 25,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                    }}>
                    1
                  </Text>
                </View> */}
              </ListItem.Content>
            </ListItem>
          </Pressable>
        );
      })}
    </View>
  );
};

export default RoomList;
