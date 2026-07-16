import Toast from 'react-native-toast-message';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const showToast = (message: string) => {
  Toast.show({
    type: 'success',
    text1: message,
  });
};

export const showError = (message: string) => {
  Toast.show({
    type: 'error',
    text1: message,
  });
};

const config = {
  success: ({text1, props, ...rest}: any) => (
    <View style={styles.toast}>
      <Text style={styles.toastText}>{text1}</Text>
    </View>
  ),
  error: ({text1, props, ...rest}: any) => (
    <View style={styles.toast}>
      <Text style={styles.toastText}>{text1}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  toast: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
});

const ToastComponent = () => {
  return <Toast config={config} position="top" autoHide={true} />;
};

export default ToastComponent;
