import { serverEnv } from 'server/env';
import { StackContext, RemixSite, RDS } from 'sst/constructs';

const envStrings = Object.keys(serverEnv).reduce((acc, key) => {
  const k = key as keyof typeof serverEnv;
  if (serverEnv[k]) {
    acc[key] = String(serverEnv[k]);
  }

  return acc;
}, {} as Record<string, string>);

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
      ...envStrings,
    },
    cdk: {
      server: {
        copyFiles: [
          { from: 'server/cert/cert.pem', to: 'server/cert/cert.pem' },
          { from: 'server/cert/key.pem', to: 'server/cert/key.pem' },
        ],
      },
    },
    bind: [rds],
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
