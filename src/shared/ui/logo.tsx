import logo from "@shared/assets/logo.png";
import {Link} from "wouter";

export const Logo: React.FC = () => {
	return (
		<Link to={'/'}><img src={logo} alt="Логотип" className="w-14 h-auto rounded-full" /></Link>
	);
};
