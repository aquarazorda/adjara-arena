import { SSTConfig } from 'sst';
import RemixStack from './stacks/RemixStack';

export default {
  config(_input) {
    return {
      name: 'adjara-arena',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(RemixStack);
  },
} satisfies SSTConfig;
