export const getAuthToken = (authorization: string): string => {
  const authHeaderRegex = /^Bearer\s+[A-Za-z0-9\-._~+/]+=*$/;

  if (authHeaderRegex.test(authorization)) {
    throw Error(
      "not an authorization token. Make sure it matches the pattern `Bearer...`"
    );
  }
  const tokens = authorization.split(" ");
  return tokens[1];
};
