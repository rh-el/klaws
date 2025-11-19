// @ts-check
/** @type {import('reshaped').ReshapedConfig} */
const config = {
	themes: {
		klawsTheme: {
			color: {
				backgroundPrimary: { hex: "#5F33FF", hexDark: "#693FFF" },
				backgroundPrimaryFaded: {
					hex: "#EFEBFF",
					hexDark: "#693FFF33",
				},
				foregroundPrimary: { hex: "#4F1FFF", hexDark: "#C3B3FF" },
				borderPrimary: { hex: "#0D003D", hexDark: "#DFD6FF" },
				borderPrimaryFaded: { hex: "#1A0D003D", hexDark: "#DFD6FF66" },
				brand: { hex: "#693FFF", hexDark: "#693FFF" },
				onBackgroundPrimary: { hex: "#FFFFFF", hexDark: "#FFFFFF" },
				backgroundPage: { hex: "#FFFFFF", hexDark: "#0D0D0D" },
				backgroundPageFaded: { hex: "#F5F5F5", hexDark: "#121212" },
				backgroundElevationBase: { hex: "#FFFFFF", hexDark: "#161616" },
				backgroundNeutral: { hex: "#E1E5EB", hexDark: "#3B3D41" },
				backgroundNeutralFaded: { hex: "#F3F5F9", hexDark: "#1F2227" },
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
