const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		watchFiles: ["./src/index.html"],
	},
});