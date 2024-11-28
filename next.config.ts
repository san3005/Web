const isProd = process.env.NODE_ENV === "production";
const repoName = "web"; // Replace with your repository name

module.exports = {
  output: "export",
  assetPrefix: isProd ? `/${repoName}/` : "",
  basePath: isProd ? `/${repoName}` : "",
};
