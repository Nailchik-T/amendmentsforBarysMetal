import axios from "axios";

import {BACKEND_URL} from "./config";

export const apiClient = axios.create({
	baseURL: BACKEND_URL,
});

export type Dto<Req, Res> = {
	req: Req;
	res: Res;
};
