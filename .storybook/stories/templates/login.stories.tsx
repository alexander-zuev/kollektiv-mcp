import { base } from "@/web/templates/";
import type { ClientInfo } from "@/web/types";
import type { Meta, StoryObj } from "@storybook/html";

const demoClient: ClientInfo = {
	clientId: "demo-client",
	clientName: "Demo Application",
	redirectUris: ["https://example.com/callback"],
} as unknown as ClientInfo;

const meta: Meta = {
	title: "Templates/Login",
};

export default meta;

/* ----------------------- story ----------------------- */

export const Default: StoryObj = {
	render: () => {
		return base(renderLoginScreen(demoClient), "Login").toString(); // unwrap
	},
};
