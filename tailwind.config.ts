import type { Config } from "tailwindcss"

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: "var(--padding-mobile)",
				lg: "var(--padding-desktop)",
			},
		},
		colors: {
			primary: "rgb(var(--color-primary) / <alpha-value>)",
			secondary: "rgb(var(--color-secondary) / <alpha-value>)",
			white: "rgb(var(--color-white))",
			"faded-5": "rgba(var(--color-secondary-rgb), 0.05)",
			"faded-10": "rgba(var(--color-secondary-rgb), 0.1)",
			"faded-30": "rgba(var(--color-secondary-rgb), 0.3)",
			"faded-50": "rgba(var(--color-secondary-rgb), 0.5)",
			"faded-70": "rgba(var(--color-secondary-rgb), 0.7)",
		},
		fontFamily: {
			heading: "var(--font-primary), sans-serif",
			text: "var(--font-secondary), sans-serif",
		},
		fontSize: {
			displayLarge: ["52px", "1"],
			displayMedium: ["45px", "1"],
			displaySmall: ["40px", "1"],
			headlineLarge: ["36px", "1"],
			headlineMedium: ["32px", "1"],
			headlineSmall: ["28px", "1"],
			titleLarge: ["20px", "1"],
			titleMedium: ["18px", "1"],
			titleSmall: ["16px", "1"],
			bodyLarge: "18px",
			bodyMedium: "16px",
			bodySmall: "14px",
			labelLarge: "16px",
			labelMedium: "14px",
			labelSmall: "12px",
		},
		extend: {
			animation: {
				"fade-in": "fadeIn 1s linear forwards",
			},
			maxWidth: {
				desktop: "2000px",
			},
			zIndex: {
				5: "5",
				8: "8",
				15: "15",
				80: "80",
				100: "100",
				150: "150",
			},
			letterSpacing: { tightest: "-.075em" },
		},
	},
	plugins: [],
}
export default config
