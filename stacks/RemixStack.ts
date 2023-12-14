import { StackContext, Api, EventBus, RemixSite } from 'sst/constructs';

export default function RemixStack({ stack }: StackContext) {
  const site = new RemixSite(stack, 'Site', {
    path: './',
    environment: process.env as any,
  });

  // Add the site's URL to stack output
  stack.addOutputs({
    URL: site.url || 'localhost',
  });
}
