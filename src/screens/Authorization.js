import React from 'react';
import { getOrCreateAuthorization } from '../api/authorization';
import Login from '../components/Login';

export default class Authorization extends React.Component {
  state = {
    requires2FA: false,
  };

  _onSubmit = async (username, password, code) => {
    const response = await getOrCreateAuthorization(username, password, code);
    if (response.ok) {
      this.props.navigation.navigate('Search');
    } else if (response.headers.has('x-github-otp'))
      this.setState({ requires2FA: true });
  };

  render = () => (
    <Login requires2FA={this.state.requires2FA} onSubmit={this._onSubmit} />
  );
}
