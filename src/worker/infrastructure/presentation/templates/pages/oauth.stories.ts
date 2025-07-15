import type { Meta, StoryObj } from '@storybook/html-vite';
import { createLayout, oauthSuccessPage, oauthErrorPage } from '../index';

const meta: Meta = {
  title: 'Templates/OAuth',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'OAuth callback pages using the design system tokens for consistent branding and theming.',
      },
    },
  },
  argTypes: {
    teamName: {
      control: 'text',
      description: 'The Slack workspace/team name',
      defaultValue: 'Acme Engineering Team',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display to user',
      defaultValue: "We couldn't add Claude Code Portable to your workspace",
    },
  },
};

export default meta;
type Story = StoryObj;

export const Success: Story = {
  name: '✅ Installation Success',
  args: {
    teamName: 'Acme Engineering Team',
  },
  render: args =>
    createLayout(
      {
        title: 'Installation Successful - Claude Code Portable',
        description: 'Claude Code Portable has been successfully installed to your Slack workspace',
      },
      oauthSuccessPage({ teamName: args.teamName })
    ),
};

export const SuccessLongTeamName: Story = {
  name: '✅ Success - Long Team Name',
  args: {
    teamName: 'Super Long Enterprise Corporation Development Team Alpha',
  },
  render: args =>
    createLayout(
      {
        title: 'Installation Successful - Claude Code Portable',
        description: 'Claude Code Portable has been successfully installed to your Slack workspace',
      },
      oauthSuccessPage({ teamName: args.teamName })
    ),
};

export const SuccessFallback: Story = {
  name: '✅ Success - Fallback Text',
  args: {
    teamName: 'your workspace',
  },
  render: args =>
    createLayout(
      {
        title: 'Installation Successful - Claude Code Portable',
        description: 'Claude Code Portable has been successfully installed to your Slack workspace',
      },
      oauthSuccessPage({ teamName: args.teamName })
    ),
};

export const Error: Story = {
  name: '❌ Installation Error',
  args: {
    errorMessage: "We couldn't add Claude Code Portable to your workspace",
  },
  render: args =>
    createLayout(
      {
        title: 'Installation Failed - Claude Code Portable',
        description: 'There was an issue installing Claude Code Portable to your workspace',
      },
      oauthErrorPage(args.errorMessage)
    ),
};

export const ErrorDetailed: Story = {
  name: '❌ Error - Detailed Message',
  args: {
    errorMessage:
      "We couldn't add Claude Code Portable to your workspace. This could be due to insufficient permissions or a temporary service issue. Please try again or contact support.",
  },
  render: args =>
    createLayout(
      {
        title: 'Installation Failed - Claude Code Portable',
        description: 'There was an issue installing Claude Code Portable to your workspace',
      },
      oauthErrorPage(args.errorMessage)
    ),
};

export const ErrorShort: Story = {
  name: '❌ Error - Short Message',
  args: {
    errorMessage: 'Installation failed',
  },
  render: args =>
    createLayout(
      {
        title: 'Installation Failed - Claude Code Portable',
        description: 'There was an issue installing Claude Code Portable to your workspace',
      },
      oauthErrorPage(args.errorMessage)
    ),
};