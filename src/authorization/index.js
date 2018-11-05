import { Buffer } from "buffer";
import DeviceInfo from "react-native-device-info";
import * as Configuration from "../common/configuration";

export const basicAuthorization = (username, password) => {
  let credentials = Buffer.from(`${username}:${password}`).toString("base64");
  return `Basic ${credentials}`;
};

export const getOrCreateAuthorization = async (username, password, code) => {
  let headers = new Headers();
  headers.append("Authorization", basicAuthorization(username, password));
  headers.append("Content-Type", "application/json");
  code && headers.append("X-GitHub-OTP", code);

  const body = {
    scopes: ["user", "repo", "gist", "notifications", "read:org"],
    client_secret: Configuration.GH_CLIENT_SECRET,
    fingerprint: DeviceInfo.getUniqueID()
  };

  const url = `https://api.github.com/authorizations/clients/${
    Configuration.GH_CLIENT_ID
  }`;

  return await fetch(url, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(body)
  });
};
