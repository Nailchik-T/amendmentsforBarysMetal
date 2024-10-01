import SliderPrimitive, {CustomArrowProps} from "react-slick";
import {cx} from "class-variance-authority";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface SliderProps extends React.ComponentProps<typeof SliderPrimitive> {}

export const Slider: React.FC<SliderProps> = ({className, ...props}) => {
	return <SliderPrimitive className={cx("", className)} {...props} />;
};

interface ArrowProps extends CustomArrowProps, React.ComponentProps<"div"> {
	onClick?: () => void;
}

export const SliderArrowLeft: React.FC<ArrowProps> = ({
	currentSlide,
	slideCount,
	className,
	...props
}) => (
	<div
		{...props}
		role="presentation"
		className={cx(
			"rounded-full !flex items-center justify-center absolute right-10 bottom-4 left-auto top-auto z-10 before:content-['←'] before:duration-500 before:transition-colors",
			{
				"before:text-primary-contrast": currentSlide === 0,
				"before:text-primary": currentSlide !== 0,
			},
			className,
		)}
	/>
);

export const SliderArrowRight: React.FC<ArrowProps> = ({
	currentSlide,
	slideCount,
	className,
	...props
}) => (
	<div
		{...props}
		role="presentation"
		className={cx(
			"rounded-full !flex items-center justify-center absolute right-4 bottom-4 left-auto top-auto z-10 before:content-['→'] before:duration-500 before:transition-colors",
			{
				"before:text-primary-contrast": currentSlide === 0,
				"before:text-primary": currentSlide !== 0,
			},
			className,
		)}
	/>
);
