import Authorization from './Authorization';
import Repository from './Repository';
import Search from './Search';
import Settings from './Settings';

export default (screens = () => ({
  Authorization,
  Repository,
  Search,
  Settings,
}));
