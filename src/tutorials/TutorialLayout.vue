<template>
  <div class="tutorial-wrapper">
    <div class="tutorial-shell">
      <div class="page-header">
        <h1 class="page-title">Tutorials</h1>
        <div class="page-sub">团队常用软件与流程教程汇总（持续更新）</div>
      </div>

      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "TutorialLayout"
};
</script>

<style scoped>
.tutorial-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.tutorial-shell {
  width: 100%;
  max-width: 1200px;
  padding: 92px 20px 40px 20px; /* 顶部给固定导航留白 */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  --accent: #2f5d8a;
  --badgeBg: #f0f4fb;
  --badgeText: #1a3e6e;
  --border: #e3ebf5;
  --shadow: 0 4px 14px rgba(15, 60, 120, 0.08);
  --shadowHover: 0 16px 36px rgba(15, 60, 120, 0.16);
}

.page-header {
  margin-bottom: 22px;
  text-align: left;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #000;
  margin: 0;
}

.page-sub {
  margin-top: 10px;
  color: #666;
  font-size: 14px;
  line-height: 1.7;
}
</style>
