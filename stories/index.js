import React from 'react';

import { storiesOf } from '@storybook/react';
import TestAnyHeight from './TestAnyHeight';
import './index.css';

storiesOf('AnyHeight', module).add('common', () => <TestAnyHeight />);
