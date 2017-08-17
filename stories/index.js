import React from 'react';

import { storiesOf } from '@storybook/react';
import TestAnyHeight from './TestAnyHeightBasic';
import TestAnyHeightChangeData from './TestAnyHeightChangeData';

import './index.css';

storiesOf('AnyHeight', module).add('common', () => <TestAnyHeight />)
    .add('change data', () => <TestAnyHeightChangeData />);
