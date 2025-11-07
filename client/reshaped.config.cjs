// @ts-check
/** @type {import('reshaped').ReshapedConfig} */
const config = {
	themes: {
		klawsTheme: {
			color: {
				backgroundPrimary: { hex: "#5F33FF", hexDark: "#693FFF" },
				backgroundPrimaryFaded: {
					hex: "#EFEBFF",
					hexDark: "#33693FFF",
				},
				foregroundPrimary: { hex: "#4F1FFF", hexDark: "#C3B3FF" },
				borderPrimary: { hex: "#0D003D", hexDark: "#DFD6FF" },
				borderPrimaryFaded: { hex: "#1A0D003D", hexDark: "#66DFD6FF" },
				brand: { hex: "#693FFF", hexDark: "#693FFF" },
			},
			fontFamily: {
				body: {
					family: "Duru Sans",
				},
				title: {
					family: "Geist Mono",
				},
			},
		},
	},
};

module.exports = config;
