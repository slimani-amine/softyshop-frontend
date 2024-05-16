export const VITE_APP_ENABLE_REDUX_DEVTOOLS: boolean =
  !!import.meta.env.VITE_APP_ENABLE_REDUX_DEVTOOLS || false;
export const VITE_APP_BASE_URL: string = import.meta.env.VITE_APP_BASE_URL;

export const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
export const googleSecret = import.meta.env.VITE_GOOGLE_SECRET;
export const googleRedirect = import.meta.env.VITE_GOOGLE_REDIRECT;
