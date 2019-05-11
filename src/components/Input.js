import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { StyleSheet, TextInput } from 'react-native';
import Colors from '../common/colors';

const Input = React.forwardRef((props, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const { containerStyle, inputStyle, ...rest } = props;
  const onBlur = useCallback(() => setIsFocused(false), []);
  const onFocus = useCallback(() => setIsFocused(true), []);

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
    backgroundColor: Colors.lightGrey,
    borderRadius: 5,
    color: Colors.grey,
    fontFamily: 'System',
    fontSize: 16,
    height: 45,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  inputContainer: {
    borderBottomWidth: 1.5,
    borderColor: Colors.grey,
    borderRadius: 5,
  },
  inputHighlighted: {
    borderColor: Colors.blue,
  },
});

export default Input;
