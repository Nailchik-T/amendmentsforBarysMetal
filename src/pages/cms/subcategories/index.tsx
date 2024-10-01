import {Route, Switch} from "wouter";

import {HomePage} from "./home";
import {SubcategoryPage} from "./subcategory";
import {CreatePage} from "./create";

export const SubcategoriesRouter: React.FC = () => {
	return (
		<Switch>
			<Route path="/" component={HomePage} />
			<Route path="/create" component={CreatePage} />
			<Route path="/:subcategoryId" component={SubcategoryPage} />
		</Switch>
	);
};
