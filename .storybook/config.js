import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, addParameters, configure } from '@storybook/react';

addParameters({
  options: {
    name: 'React Starter',
  }
});

addDecorator(withKnobs);

addDecorator(
  withInfo({
    source: false
  })
);

// Stories loader
const req = require.context('../client', true, /.stories.[jt]sx?$/);
function loadStories() {
  req.keys().forEach(req);
}

// Initialize react-storybook
configure(loadStories, module);
