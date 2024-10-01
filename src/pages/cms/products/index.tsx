import {Route, Switch} from "wouter";

import {HomePage} from "./home";
import {ProductPage} from "./product";
import {CreatePage} from "./create";

export const ProductsRouter: React.FC = () => {
	return (
		<Switch>
			<Route path="/" component={HomePage} />
			<Route path="/create" component={CreatePage} />
			<Route path="/:productId" component={ProductPage} />
		</Switch>
	);
};
