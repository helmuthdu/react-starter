import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { configureViewport, INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { addDecorator, addParameters, configure } from '@storybook/react';
import { themes } from '@storybook/theming';
import * as React from 'react';

addParameters({
  options: {
    name: 'React Starter',
    theme: themes.light
  }
});

addDecorator(withKnobs);

addDecorator(
  withInfo({
    source: false
  })
);

configureViewport({
  viewports: {
    ...INITIAL_VIEWPORTS
  }
});

// Stories loader
const req = require.context('../src', true, /.stories.[jt]sx?$/);
function loadStories() {
  req.keys().forEach(req);
}

// Initialize react-storybook
configure(loadStories, module);
