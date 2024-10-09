import {Route, Switch} from "wouter";

import {HomePage} from "./home";
import {InquiriesPage} from "./inquiries";
import {CategoriesRouter} from "./categories";
import {ProductsRouter} from "./products";
import {SubcategoriesRouter} from "./subcategories";

export const CmsRouter: React.FC = () => {
    return (
        <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/inquiries" component={InquiriesPage} />
            <Route path="/categories" component={CategoriesRouter} nest />
            <Route path="/subcategories" component={SubcategoriesRouter} nest />
            <Route path="/products" component={ProductsRouter} nest />
        </Switch>
    );
};
