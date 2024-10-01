import {Route, Switch} from "wouter";

import {HomePage} from "./home";
import {CreatePage} from "./create";
import {CategoryPage} from "./category";

export const CategoriesRouter: React.FC = () => {
	return (
		<Switch>
			<Route path="/" component={HomePage} />
			<Route path="/create" component={CreatePage} />
			<Route path="/:categoryId" component={CategoryPage} />
		</Switch>
	);
};
