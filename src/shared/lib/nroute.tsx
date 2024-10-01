import {Route, RouteProps, Switch} from "wouter";

export const DomainRoute: React.FC<RouteProps> = (props) => {
	return (
		<>
			<Route path={`${props.path}/*`} component={props.component} nest />
			<Route path={`${props.path}*`} component={props.component} nest />
		</>
	);
};
