import React, { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet, TextInput } from 'react-native';
import Colors from '../common/colors';

const Input = React.forwardRef((props, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const { containerStyle, inputStyle, ...rest } = props;
  const onBlur = () => setIsFocused(false);
  const onFocus = () => setIsFocused(true);

  return (
    <View
      style={[
        styles.inputContainer,
        isFocused ? styles.inputHighlighted : null,
        containerStyle,
      ]}
    >
      <TextInput
        onBlur={onBlur}
        onFocus={onFocus}
        ref={ref}
        selectionColor={Colors.blue}
        style={[styles.input, inputStyle]}
        {...rest}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    color: Colors.grey,
    fontFamily: 'System',
    fontSize: 16,
    height: 45,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  inputContainer: {
    borderColor: Colors.grey,
    borderRadius: 5,
    borderWidth: 1,
  },
  inputHighlighted: {
    borderColor: Colors.blue,
  },
});

export default Input;
