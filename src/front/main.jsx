import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

import { StoreProvider } from "./hooks/useGlobalReducer";
import { SeasonalThemeProvider } from "./hooks/useSeasonalTheme";
import { BackendURL } from "./components/BackendURL";

const Main = () => {
    if (!import.meta.env.VITE_BACKEND_URL) {
        return <BackendURL />;
    }

    return (
        <StoreProvider>
            <SeasonalThemeProvider>
                <RouterProvider router={router} />
            </SeasonalThemeProvider>
        </StoreProvider>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>
);
