import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import screens from './screens';

export default createAppContainer(
  createSwitchNavigator(screens(), { initialRouteName: 'Launch' })
);
