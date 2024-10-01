import {createRoot} from "react-dom/client";
import {QueryClientProvider} from "@tanstack/react-query";

import {Router} from "./router";
import {queryClient} from "./query-client";

import "./styles/globals.css";

const root = document.getElementById("root")!;

createRoot(root).render(
	<QueryClientProvider client={queryClient}>
		<Router />
	</QueryClientProvider>,
);
