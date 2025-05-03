import { base, renderHomePage } from "@/web/templates";
import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
	title: "Templates/Homepage",
};

export default meta;

/* ----------------------- story ----------------------- */

export const Default: StoryObj = {
	render: () => {
		return base(renderHomePage(), "Home").toString(); // unwrap
	},
};
