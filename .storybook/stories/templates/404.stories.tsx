import {base, renderNotFound} from "@/api/templates";
import type {Meta, StoryObj} from "@storybook/html";

const meta: Meta = {
    title: "Templates/Not Found",
};

export default meta;

/* ----------------------- story ----------------------- */

export const Default: StoryObj = {
    render: () => {
        return base(renderNotFound(), "Not Found").toString(); // unwrap
    },
};