import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../common/colors';

const ToasterOvenContext = React.createContext(undefined);

export const useToasterOven = () => useContext(ToasterOvenContext);

const ToasterOven = props => {
  const [content, setContent] = useState(null);

  return (
    <ToasterOvenContext.Provider value={setContent}>
      <View {...props} />
      {content == null ? null : (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{content}</Text>
        </View>
      )}
    </ToasterOvenContext.Provider>
  );
};

const styles = StyleSheet.create({
  errorView: {
    backgroundColor: Colors.red,
    borderColor: Colors.darkRed,
    borderRadius: 5,
    borderWidth: 1,
    top: 50,
    left: 10,
    right: 10,
    minHeight: 45,
    justifyContent: 'center',
    padding: 10,
    position: 'absolute',
  },
  errorText: {
    color: Colors.darkRed,
    fontFamily: 'System',
    fontSize: 14,
  },
});

export default ToasterOven;
