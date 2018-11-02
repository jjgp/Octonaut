import * as Keychain from "react-native-keychain";
import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { installRelayDevTools } from "relay-devtools";
import { basicAuthorization } from "../authorization";

const fetchQuery = async (operation, variables) => {
  const { password } = await Keychain.getGenericPassword();
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: basicAuthorization(password, "x-oauth-basic"),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  });
  return response.json();
};

if (__DEV__) installRelayDevTools();

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource())
});

export default environment;
