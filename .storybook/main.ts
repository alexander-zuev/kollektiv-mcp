import type { StorybookConfig } from "@storybook/html-vite";
import tsconfigPaths from "vite-tsconfig-paths"; //

const config: StorybookConfig = {
	stories: ["./stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [],
	framework: {
		name: "@storybook/html-vite",
		options: {},
	},
	staticDirs: ["../public"],

	async viteFinal(base) {
		return {
			...base,
			plugins: [...(base.plugins ?? []), tsconfigPaths()], // alias comes from tsconfig
		};
	},
};

export default config;
