import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, addParameters } from '@storybook/react';

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
