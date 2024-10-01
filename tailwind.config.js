/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,tsx,jsx,ts,js}"],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "#293e80",
					contrast: "#fdfdfd",
				},
				secondary: "#eac400",
				paper: {
					primary: "#fdfdfd",
					secondary: "#f4f7fd",
					contrast: "rgb(50 50 50 / <alpha-value>)",
				},
			},
			fontFamily: {
				montserrat: '"Montserrat", sans-serif',
			},
			boxShadow: {
				"even-sm": "0 0 0.6rem rgb(0 0 0 / 0.1)",
				"even-md": "0 0 1.4rem rgb(0 0 0 / 0.1)",
				"even-lg": "0 0 3rem rgb(0 0 0 / 0.1)",
			},
		},
		screens: {
			xl: {max: "1400px"},
			lg: {max: "1280px"},
			md: {max: "1012px"},
			sm: {max: "768px"},
			xs: {max: "544px"},
		},
	},
};
