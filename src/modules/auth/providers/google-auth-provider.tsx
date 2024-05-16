import { GoogleOAuthProvider } from '@react-oauth/google';
import { googleClientId } from '@src/config';

function GoogleAuthProvider({ children }: { children: React.ReactNode }) {
  return googleClientId ? (
    <GoogleOAuthProvider clientId={googleClientId}>
      {children}
    </GoogleOAuthProvider>
  ) : (
    <>{children}</> // Render children if no Google client ID is provided
  );
}

export default GoogleAuthProvider;
