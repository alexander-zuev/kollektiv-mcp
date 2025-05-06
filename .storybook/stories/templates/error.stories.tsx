import { type ErrorScreenProps, base, errorScreenPage } from "@/web/templates";
import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
	title: "Templates/Error Page",
};

export default meta;

/* ----------------------- story ----------------------- */

const errorDetails: ErrorScreenProps = {
	title: "Authorization error",
	message: "You are not authorized to access this page.",
	hint: "Do this and don't do that",
	details: {
		request_id: 231313,
	},
};

export const Default: StoryObj = {
	render: () =>
		// unwrap both snippets to plain strings
		// @ts-ignore
		base(errorScreenPage(errorDetails), "Error").toString(),
};
