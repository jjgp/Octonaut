import { Buffer } from "buffer";
import * as Configuration from "../configuration";

export const basic = async (username, password, code) => {
  let credentials = Buffer.from(`${username}:${password}`).toString("base64");
  let headers = new Headers();
  headers.append("Authorization", `Basic ${credentials}`);
  headers.append("Content-Type", "application/json");
  code && headers.append("X-GitHub-OTP", code);

  const body = {
    scopes: ["user", "repo", "gist", "notifications", "read:org"],
    client_secret: Configuration.GH_CLIENT_SECRET
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
