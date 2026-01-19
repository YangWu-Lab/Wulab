// vue.config.js
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,

  chainWebpack: (config) => {
    config.module.rule("md").test(/\.md$/).type("asset/source");
  },

  // 你如果是 GitHub Pages 子路径才需要；本机/服务器一般是 "/"
  publicPath: process.env.NODE_ENV === "production" ? "Crazzy-Rabbit/Wulab" : "/",

  // ✅ 关键：开发时把 /api 代理到本机 3001 或 8080
  // 这里我们后端建议也用 3001（dev），prod 用 8080 也行
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true
      }
    }
  }
});
