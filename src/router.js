// src/router.js
import { createRouter, createWebHistory } from 'vue-router'


import HomePage from './views/HomePage.vue'
import SoftwarePage from './views/Software.vue'
import GctbRun from './views/GctbRun.vue'
import PublicationPage from './views/Publication.vue';
import DataPage from './Data/DataPage.vue';
import DataDetail from './Data/DataDetail.vue';
import NewsPage from './views/NewsPage.vue';

import JoinContactPage from './views/JoinPage.vue';
import ResearchPage from './views/ResearchPage.vue'
import PeoplePage from './views/PeoplePage.vue'
// ✅ Tutorial 路由（注意路径：你截图里这三个文件在 src/tutorials/ 下）
import TutorialLayout from "./tutorials/TutorialLayout.vue";
import TutorialIndexView from "./tutorials/TutorialIndexView.vue";
import TutorialDetailView from "./tutorials/TutorialDetailView.vue";

const routes = [
  { path: "/", component: HomePage },
  // { path: "/research", component: Research },
  { path: "/research", component: ResearchPage },
  { path: "/software", name:"Software", component: SoftwarePage },
  { path: "/software/gctb", name: "GCTBPortal", component: GctbRun },
  { path: '/publications', component: PublicationPage },
  { path: '/data', component: DataPage },
  { path: '/data/:id', component: DataDetail }, // :id 对应 bulk-rnaseq / single-cell / other
  { path: "/news", component: NewsPage },
  // { path: '/news/:id', component: NewsDetail },
  { path: "/contact", component:  JoinContactPage },
  { path: "/people", component:  PeoplePage },

  // ✅ /tutorial 列表页 + 详情页
  {
    path: "/tutorial",
    component: TutorialLayout,
    children: [
      { path: "", name: "TutorialIndex", component: TutorialIndexView },
      { path: ":slug", name: "TutorialDetail", component: TutorialDetailView, props: true },
    ],
  },

  // （可选）兜底：404
  // { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
