import type { Meta, StoryObj } from '@storybook/react-vite';

const Welcome = () => (
  <div style={{ maxWidth: 600 }}>
    <h1>C2B Components</h1>
    <p>Carleton University Design System &amp; React Component Library.</p>
    <h2>Getting Started</h2>
    <p>Components will appear in the sidebar as they are built out.</p>
    <h3>Design Tokens</h3>
    <p>
      CSS custom properties are available globally via{' '}
      <code>{"import '@troychaplin/c2b-storybook/styles'"}</code>
    </p>
    <div
      style={{
        display: 'flex',
        gap: 8,
        marginTop: 16,
        flexWrap: 'wrap',
      }}
    >
      <div
        style={{
          width: 60,
          height: 60,
          backgroundColor: 'var(--color-primary)',
          borderRadius: 'var(--radius-md)',
        }}
      />
      <div
        style={{
          width: 60,
          height: 60,
          backgroundColor: 'var(--color-primary-dark)',
          borderRadius: 'var(--radius-md)',
        }}
      />
      <div
        style={{
          width: 60,
          height: 60,
          backgroundColor: 'var(--color-secondary)',
          borderRadius: 'var(--radius-md)',
        }}
      />
      <div
        style={{
          width: 60,
          height: 60,
          backgroundColor: 'var(--color-secondary-dark)',
          borderRadius: 'var(--radius-md)',
        }}
      />
    </div>
  </div>
);

const meta = {
  title: 'Welcome',
  component: Welcome,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Welcome>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
