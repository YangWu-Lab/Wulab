const { defineConfig } = require("@vue/cli-service");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,

  chainWebpack: (config) => {
    config.module.rule("md").test(/\.md$/).type("asset/source");
    
    // 设置 HTML 页面标题
    config.plugin("html").tap((args) => {
      args[0].title = "Wu Lab"; // 这里设置页面标题为 "Wu Lab"
      return args;
    });
  },

  publicPath: process.env.NODE_ENV === "production" ? "/Wulab/" : "/",

  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
