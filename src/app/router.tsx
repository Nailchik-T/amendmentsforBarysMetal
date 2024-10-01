import {Switch, Route, Router as Wouter} from "wouter";

import {
	HomePage,
	ListPage,
	CataloguePage,
	ProductPage,
	CartPage,
	OrderPage,
	AboutPage,
	TermsPage,
	OrderAndDeliveryPage,
	CertificatesPage,
	CmsRouter,
	OrderSuccess,
} from "@pages/index";

export const Router: React.FC = () => {
	return (
		<Wouter>
			<Switch>
				<Route path="/" component={HomePage} />
				<Route path="/list" component={ListPage} />
				<Route path="/products/:productId" component={ProductPage} />
				<Route path="/cart" component={CartPage} />
				<Route path="/cart/order" component={OrderPage} />
				<Route path="/order/success" component={OrderSuccess} />
				<Route path="/catalogue" component={CataloguePage} />
				<Route path="/about" component={AboutPage} />
				<Route
					path="/order-n-delivery"
					component={OrderAndDeliveryPage}
				/>
				<Route path="/certificates" component={CertificatesPage} />
				<Route path="/terms" component={TermsPage} />
				<Route path="/cms" component={CmsRouter} nest />
			</Switch>
		</Wouter>
	);
};
