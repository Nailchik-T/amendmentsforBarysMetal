import {Route, Switch, Router as Wouter} from "wouter";

import {
    AboutPage,
    CartPage,
    CataloguePage,
    Categories,
    CertificatesPage,
    CmsRouter,
    HomePage,
    ListPage,
    OrderAndDeliveryPage,
    OrderPage,
    OrderSuccess,
    ProductPage,
    TermsPage,
} from "@pages/index";
import {useEffect} from "react";
import {BrowserRouter, useLocation} from "react-router-dom";

const ScrollToTop = () => {
    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export const Router: React.FC = () => {
    return (
        <Wouter>
            <Switch>
                <BrowserRouter>
                    <ScrollToTop />
                    <Route path="/" component={HomePage} />
                    <Route path="/list" component={ListPage} />
                    <Route
                        path="/products/:productId"
                        component={ProductPage}
                    />
                    <Route path="/cart" component={CartPage} />
                    <Route path="/cart/order" component={OrderPage} />
                    <Route path="/order/success" component={OrderSuccess} />
                    <Route path="/catalogue" component={CataloguePage} />
                    <Route path="/categories" component={Categories} />
                    <Route path="/about" component={AboutPage} />
                    <Route
                        path="/order-n-delivery"
                        component={OrderAndDeliveryPage}
                    />
                    <Route path="/certificates" component={CertificatesPage} />
                    <Route path="/terms" component={TermsPage} />
                    <Route path="/cms" component={CmsRouter} nest />
                </BrowserRouter>
            </Switch>
        </Wouter>
    );
};
