import {cx} from "class-variance-authority";
import {forwardRef} from "react";

export const Input = forwardRef<
	React.ElementRef<"input">,
	React.ComponentPropsWithoutRef<"input">
>(({className, ...props}, ref) => {
	return (
		<input
			ref={ref}
			className={cx(
				"border border-[#eceef6] rounded-md py-3 px-4 placeholder:text-[#667085]",
				className,
			)}
			{...props}
		/>
	);
});
