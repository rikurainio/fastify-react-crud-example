/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				card: "var(--card)",
				border: "var(--border)",
				input: "var(--input)",
				button: "var(--button)",
				buttonHover: "var(--buttonHover)",
				text: "var(--text)",
			},
		},
	},
	plugins: [],
};
