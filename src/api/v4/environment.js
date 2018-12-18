import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { installRelayDevTools } from "relay-devtools";
import { tokenAuthorization } from "../authorization";

const fetchQuery = async (operation, variables) => {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: await tokenAuthorization(),
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
