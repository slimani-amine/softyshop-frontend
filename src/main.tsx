import AuthProvider from "./modules/auth/context/AuthProvider";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { store } from "./modules/shared/store";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Suspense } from "react";
import App from "./app/App";
import "./app/index.scss";
import "./i18n";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <HelmetProvider>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Suspense>
            <App />
          </Suspense>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 4000 },
            error: { duration: 5000 },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "",
              color: "",
            },
          }}
        />
      </AuthProvider>
    </Provider>
  </HelmetProvider>,
);
