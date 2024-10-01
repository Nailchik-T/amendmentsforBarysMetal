import {cva, cx, VariantProps} from "class-variance-authority";
import {twMerge} from "tailwind-merge";

const styles = cva("font-medium", {
	variants: {
		color: {
			primary: "",
			secondary: "",
		},
		view: {
			normal: "",
			reversed: "",
		},
		size: {
			medium: "py-4 px-8 text-lg rounded-lg",
			small: "py-2 px-6 text-sm rounded-lg",
		},
	},
	defaultVariants: {
		color: "primary",
		size: "medium",
		view: "normal",
	},
	compoundVariants: [
		{
			view: "normal",
			color: "primary",
			className: "bg-primary text-paper-primary",
		},
		{
			view: "normal",
			color: "secondary",
			className: "bg-secondary text-paper-primary",
		},
		{
			view: "reversed",
			color: "primary",
			className: "bg-paper-primary text-primary",
		},
		{
			view: "reversed",
			color: "secondary",
			className: "bg-paper-primary text-secondary",
		},
	],
});

type ButtonProps = React.ComponentPropsWithRef<"button"> &
	VariantProps<typeof styles>;

export const Button: React.FC<ButtonProps> = ({
	className,
	color,
	size,
	view,
	...props
}) => {
	return (
		<button
			className={twMerge(
				styles({
					color,
					view,
					size,
					className: cx(className, {
						"opacity-60": props.disabled,
					}),
				}),
			)}
			{...props}
		/>
	);
};
