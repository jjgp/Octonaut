import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import Colors from '../common/colors';

class Topic extends React.PureComponent {
  render = () => (
    <TouchableOpacity style={styles.touchable}>
      <Text style={styles.text}>{this.props.topic.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.blue,
    fontFamily: 'System',
    fontSize: 13,
  },
  touchable: {
    alignContent: 'center',
    backgroundColor: Colors.lightBlue,
    borderBottomWidth: 1,
    borderColor: Colors.white,
    borderRightWidth: 2,
    borderTopWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    padding: 7,
  },
});

export default createFragmentContainer(
  Topic,
  graphql`
    fragment Topic_topic on Topic {
      name
    }
  `,
);
