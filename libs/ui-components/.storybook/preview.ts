import { Preview } from '@storybook/angular';
//import '../../../main.css';

// Basic preview configuration with minimal imports
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'centered',
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
      },
    },
  },
  decorators: [
    (storyFn, context) => {
      const story = storyFn();
      
      // Apply theme class based on the selected theme
      const theme = context.globals['theme'];
      const bodyClasses = document.body.classList;
      
      if (theme === 'dark') {
        bodyClasses.add('dark-theme');
        bodyClasses.remove('light-theme');
      } else {
        bodyClasses.add('light-theme');
        bodyClasses.remove('dark-theme');
      }
      
      return story;
    },
  ],
};

export default preview;
