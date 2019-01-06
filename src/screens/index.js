import { createStackNavigator } from 'react-navigation';
import Authorization from './Authorization';
import Loading from './Loading';
import Repository from './Repository';
import Search from './Search';
import Settings from './Settings';

export default (screens = () => ({
  Authorization,
  Landing: createStackNavigator(
    { Search, Repository, Settings },
    { initialRouteName: 'Search' },
  ),
  Loading,
}));
