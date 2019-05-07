import React from 'react';

const Repository = () => <></>;

Repository.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title'),
});

export default Repository;
