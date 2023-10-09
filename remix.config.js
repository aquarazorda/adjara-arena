/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  serverModuleFormat: "cjs",
  tailwind: true,
  serverDependenciesToBundle: [
		"lucia",
		"lucia/middleware",
		"lucia/polyfill/node",
		"@lucia-auth/adapter-postgresql"
	]
};
