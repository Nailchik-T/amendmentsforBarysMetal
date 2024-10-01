import {cx} from "class-variance-authority";

export const Container: React.FC<React.ComponentPropsWithRef<"div">> = ({
	className,
	...props
}) => {
	return (
		<div
			className={cx(
				"max-w-[1240px] w-full m-auto lg:px-[1rem]",
				className,
			)}
			{...props}
		/>
	);
};
