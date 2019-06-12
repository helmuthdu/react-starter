import * as React from 'react';
import DefaultLayout from '../../../../layouts/default/default.layout';

const AboutRoute = () => {
  return (
    <DefaultLayout>
      <section>
        <p>This project is created by @helmuthdu.</p>
        <p>
          For any question, Im on{' '}
          <a href="mailto:helmuthdu@gmail.com" target="blank">
            helmuthdu@gmail.com
          </a>
        </p>
        <p>
          For any issues, any PR are welcoming
          <a href="https://github.com/helmuthdu/react-start" target="blank">
            {' '}
            on this repository
          </a>
        </p>
      </section>
    </DefaultLayout>
  );
};

export default AboutRoute;
