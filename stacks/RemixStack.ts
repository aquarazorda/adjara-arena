import { StackContext, RemixSite, RDS, Api, Script } from 'sst/constructs';

export default function RemixStack({ stack }: StackContext) {
  const rds = new RDS(stack, 'Database', {
    engine: 'postgresql13.9',
    defaultDatabaseName: 'abetarena',
  });

  const site = new RemixSite(stack, 'Site', {
    path: './',
    nodejs: {
      format: 'esm',
    },
    environment: {
      RDS_ARN: rds.clusterArn,
      RDS_SECRET: rds.secretArn,
      RDS_DATABASE: rds.defaultDatabaseName,
    },
    defaults: {
      function: {
        bind: [rds],
      },
    },
  });

  // const scripts = new Script(stack, 'Script', {
  //   // onCreate: "seed TODO"
  //   onUpdate: 'functions/migrator.handler',
  // });

  stack.addOutputs({
    URL: site.url || 'localhost',
    RDS_ARN: rds.clusterArn,
    RDS_SECRET: rds.secretArn,
    RDS_DATABASE: rds.defaultDatabaseName,
  });
}
