import type { Preview } from '@storybook/react-vite';
import '../src/styles/main.scss';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
      sort: 'requiredFirst',
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'error',
    },
    options: {
      storySort: {
        order: ['Welcome', 'Components', 'Layouts', '*'],
      },
    },
  },
};

export default preview;
