import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button from ".";

const meta: Meta<typeof Button> ={
  title: "Components/Atomics/Button",
  component: Button,
  argTypes:{
    level:{
      control: {type:'select'},
      options: ['primary', 'secondary', 'danger', 'success', 'warning'],
    },
    variant: {
      control: { type: 'select' },
      options: ['solid', 'outline', 'text'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    onClick: { action: 'clicked' },
  }
}
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story ={
  args:{
    children: 'Click Me',
  },
};
export const PrimarySolid: Story = {
  args: {
    children: 'Primary',
    level: 'primary',
    variant: 'solid',
  },
};

export const OutlineSecondary: Story = {
  args: {
    children: 'Secondary',
    level: 'secondary',
    variant: 'outline',
  },
};

export const DangerText: Story = {
  args: {
    children: 'Delete',
    level: 'danger',
    variant: 'text',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Save',
    level: 'success',
    variant: 'solid',
  },
};

export const Loading: Story = {
  args: {
    children: 'Submit',
    loading: true,
    loadingText: 'Submitting...',
    level: 'primary',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};
