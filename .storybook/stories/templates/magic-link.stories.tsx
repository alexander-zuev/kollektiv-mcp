import {base, renderMagicLinkSentScreen} from "@/api/templates";
import type {Meta, StoryObj} from "@storybook/html";

const meta: Meta = {
    title: "Templates/Magic Link",
};

export default meta;

/* ----------------------- story ----------------------- */

export const Default: StoryObj = {
    render: () => {
        return base(renderMagicLinkSentScreen({email: "user@example.com"}), "Magic Link").toString(); // unwrap
    },
};