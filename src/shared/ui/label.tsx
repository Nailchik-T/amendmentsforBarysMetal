import {cx} from "class-variance-authority";
import {forwardRef} from "react";

export const Label = forwardRef<
	React.ElementRef<"label">,
	React.ComponentPropsWithoutRef<"label">
>((props, ref) => {
	return (
		<label
			ref={ref}
			htmlFor={props.id}
			className={cx("font-medium text-[#344054]", props.className)}
			{...props}
		/>
	);
});
