import {cx} from "class-variance-authority";
import {Link} from "wouter";

import {Header} from "@widgets/header";
import {Sidebar} from "@widgets/sidebar";
import {Footer} from "@widgets/footer";

import {Container} from "./container";

interface ContentTemplateProps extends React.ComponentPropsWithRef<"main"> {
	breadcrumbs?: Array<{
		label: string;
		link: string;
	}>;
}

export const ContentTemplate: React.FC<ContentTemplateProps> = ({
	className,
	children,
	breadcrumbs,
	...props
}) => {
	return (
		<div className="flex flex-col gap-y-12">
			<Header />
			<div>
				<Container>

					<div className="flex gap-10 ">
						<Sidebar />
						<main
							className={cx(
								"flex flex-col flex-1 overflow-hidden  ",
								className,
							)}
							{...props}
						>
							{!!breadcrumbs?.length && (
								<ul className="flex items-center gap-x-4 text-paper-contrast mb-8">
									{breadcrumbs.map(
										({link, label}, idx, {length}) => {
											const isFirst = idx === 0;
											const isLast = idx === length - 1;

											return (
												<li className="flex gap-x-4">
													{!isFirst && <span>/</span>}

													<Link
														to={link}
														className={cx({
															"text-primary font-semibold border-b border-primary":
																isLast,
														})}
													>
														{label}
													</Link>
												</li>
											);
										},
									)}
								</ul>
							)}

							{children}
						</main>
					</div>
				</Container>
			</div>

			<Footer />
		</div>
	);
};
