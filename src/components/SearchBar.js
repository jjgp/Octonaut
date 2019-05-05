import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Colors from '../common/colors';
import Input from '../components/Input';

export default ({ onSubmit }) => (
  <View style={styles.view}>
    <Image source={require('./img/search.png')} style={styles.image} />
    <Input
      onSubmitEditing={event => onSubmit(event.nativeEvent.text)}
      style={styles.input}
    />
  </View>
);

const styles = StyleSheet.create({
  image: {
    height: 20,
    marginVertical: 5,
    resizeMode: 'contain',
    tintColor: Colors.blue,
    width: 20,
  },
  input: {
    backgroundColor: Colors.lightGrey,
    flex: 1,
  },
  view: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.lightGrey,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
});
