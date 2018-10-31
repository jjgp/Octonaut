import { basic } from "../";

describe("basic authentication", () => {
  beforeEach(() => {
    global.Headers = jest.fn(() => ({
      append: jest.fn()
    }));
  });

  const assertFetch = ({
    mock: {
      calls: [first]
    }
  }) => {
    const [url, configuration] = first;
    expect(
      url.startsWith("https://api.github.com/authorizations/clients/")
    ).toBe(true);
    expect(configuration.method).toEqual("PUT");
    const {
      mock: { calls }
    } = configuration.headers.append;
    expect(calls[0][1]).toEqual("Basic dXNlcm5hbWU6cGFzc3dvcmQ=");
    expect(calls[1][1]).toEqual("application/json");
    expect(calls[2][1]).toEqual("code");
    const { scopes } = JSON.parse(configuration.body);
    expect(scopes).toEqual([
      "user",
      "repo",
      "gist",
      "notifications",
      "read:org"
    ]);
  };

  it("succeeds", async () => {
    global.fetch = jest.fn(() => ({
      ok: true
    }));

    const response = await basic("username", "password", "code");
    assertFetch(fetch);
    expect(response).toEqual({ ok: true });
  });

  test("fails", async () => {
    global.fetch = jest.fn(() => ({
      ok: false
    }));

    const response = await basic("username", "password", "code");
    assertFetch(fetch);
    expect(response).toEqual({ ok: false });
  });
});
