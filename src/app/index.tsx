import {QueryClientProvider} from "@tanstack/react-query";
import {createRoot} from "react-dom/client";

import {queryClient} from "./query-client";
import {Router} from "./router";

import "./styles/globals.css";

const root = document.getElementById("root")!;

createRoot(root).render(
    <QueryClientProvider client={queryClient}>
        <Router />
    </QueryClientProvider>,
);
