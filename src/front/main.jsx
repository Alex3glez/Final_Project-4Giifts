import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

import { StoreProvider } from "./hooks/useGlobalReducer";
import { SeasonalThemeProvider } from "./hooks/useSeasonalTheme";
import { BackendURL } from "./components/BackendURL";

// Activar Visual Editing solo cuando estamos dentro del iframe del Sanity Presentation Tool
// Usamos un listener manual para no depender de @sanity/visual-editing (que requiere React 19)
if (typeof window !== "undefined" && window.parent !== window) {
    import("@sanity/visual-editing").then(({ enableVisualEditing }) => {
        enableVisualEditing();
    }).catch(() => {
        // Si falla, no rompemos la app - el Studio simplemente no tendrá overlays de edición
        console.debug("Visual editing not available in this environment");
    });
}

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
