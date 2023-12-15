import { unstable_vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    remix({
      serverModuleFormat: 'esm',
      appDirectory: 'app',
      assetsBuildDirectory: 'public/build',
      publicPath: '/build/',
      serverBuildPath: 'build/index.js',
    }),
    tsconfigPaths(),
    svgr(),
  ],
  ssr: {
    noExternal: ['remix-i18next', 'react-i18next', 'ts-results'],
  },
});
