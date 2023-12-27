interface AuthData {
  access_token: string;
}

export const setAccessToken = (token: string): void => {
  const authData: AuthData = { access_token: token };
  sessionStorage.setItem('authData', JSON.stringify(authData));
};

export const getAccessToken = (): string | null => {
  const storedData = sessionStorage.getItem('authData');
  if (storedData) {
    const authData: AuthData = JSON.parse(storedData);
    return authData.access_token;
  }
  return null;
};

export const clearAccessToken = () : void => {
  sessionStorage.removeItem('authData');
};
