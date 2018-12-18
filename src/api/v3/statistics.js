import { tokenAuthorization } from "../authorization";

export const fetchContributors = async (nameWithOwner) => {
  const response = await fetch(`https://api.github.com/repos/${nameWithOwner}/stats/contributors`, {
    method: "GET",
    headers: {
      Authorization: await tokenAuthorization()
    }
  });

  return response.json();
}
