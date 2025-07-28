const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
	entry: "./src/index.js",
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
	],
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
		clean: true, // Clean the output directory before building
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
        test: /\.html$/i,
        loader: "html-loader",
      },
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
		],
	},
};