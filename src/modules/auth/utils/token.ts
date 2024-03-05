export const getTokens = () => {
  return {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
  };
};

export const setTokens = (
  accessToken: string,
  refreshToken?: string | null
) => {
  localStorage.setItem('accessToken', accessToken);
  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  }
};

export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};
