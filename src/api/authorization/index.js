import * as Keychain from 'react-native-keychain';
import { Buffer } from 'buffer';
import DeviceInfo from 'react-native-device-info';
import Configuration from '../../common/configuration';

export const basicAuthorization = (username, password) => {
  let credentials = Buffer.from(`${username}:${password}`).toString('base64');
  return `Basic ${credentials}`;
};

const createEntryInKeychain = async (id, token) => {
  await Keychain.setGenericPassword(id, token);
  await Keychain.setInternetCredentials(id, id, token);
};

const setExistingEntryInKeychain = async id => {
  const { username, password } = await Keychain.getInternetCredentials(id);
  await Keychain.setGenericPassword(username, password);
};

export const getOrCreateAuthorization = async (username, password, code) => {
  let headers = new Headers();
  headers.append('Authorization', basicAuthorization(username, password));
  headers.append('Content-Type', 'application/json');
  code && headers.append('X-GitHub-OTP', code);

  const body = {
    scopes: ['user', 'repo', 'gist', 'notifications', 'read:org'],
    client_secret: Configuration.GH_CLIENT_SECRET,
    fingerprint: DeviceInfo.getUniqueID(),
  };

  const url = `https://api.github.com/authorizations/clients/${
    Configuration.GH_CLIENT_ID
  }`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(body),
  });

  if (response.ok) {
    let { id, token } = await response.json();
    token
      ? await createEntryInKeychain(id.toString(), token)
      : await setExistingEntryInKeychain(id.toString());
  }

  return response;
};

export const hasToken = async () => !!(await Keychain.getGenericPassword());

export const tokenAuthorization = async () => {
  const { password } = await Keychain.getGenericPassword();
  return basicAuthorization(password, 'x-oauth-basic');
};
