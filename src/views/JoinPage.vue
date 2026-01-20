<template>
  <div class="join-page">
    
    <!-- 中间内容区域：自适应居中，大小恢复正常，不再缩水 -->
    <div class="inner-content">
      
      <!-- JOIN US 标题 -->
      <div class="title-wrapper">
        <div class="title-card">
          <h1>JOIN US</h1>
        </div>
      </div>

      <!-- 职位卡片 -->
      <div class="positions-grid">
        <div class="position-card">
          <div class="icon-plate icon-plate-lg" aria-hidden="true">
            <svg class="icon-svg" viewBox="0 0 24 24" fill="none">
              <path class="s" d="M3.3 9.1 12 5.4l8.7 3.7L12 12.8 3.3 9.1Z" />
              <path class="s" d="M6.3 11.2v4.7c0 1.9 11.4 1.9 11.4 0v-4.7" />
              <path class="s" d="M20.7 9.1v6.1" />
              <path class="s" d="M20.7 15.2c0 1-1.1 1.8-2.1 2.2" />
              <path class="s" d="M8.1 12.9c1.8.7 3.7 1.1 5.9 1.1 2.1 0 4-.4 5.8-1.1" />
            </svg>
          </div>
          <h2>Postdoctoral Fellow</h2>
          <p class="pos-desc" :class="{ open: openPos === 'postdoc' }">
            We welcome postdocs with expertise in genomics, bioinformatics, or statistical genetics.
          </p>
          <button class="pos-more" type="button" @click="togglePos('postdoc')">
            {{ openPos === 'postdoc' ? "Less" : "More" }}
          </button>
        </div>

        <div class="position-card">
          <div class="icon-plate icon-plate-lg" aria-hidden="true">
            <svg class="icon-svg" viewBox="0 0 24 24" fill="none">
              <path class="s" d="M4.2 6.2h6.3c2.4 0 4.3 1.9 4.3 4.3v10.3c0-2.4-1.9-4.3-4.3-4.3H4.2V6.2Z" />
              <path class="s" d="M19.8 6.2h-6.3c-2.4 0-4.3 1.9-4.3 4.3v10.3c0-2.4-1.9-4.3-4.3-4.3h6.3V6.2Z" />
              <path class="s" d="M7 9.3h3.4" />
              <path class="s" d="M7 12h2.7" />
              <path class="b" d="M16.2 9.2h2.2" />
              <path class="b" d="M16.0 12.0h1.8" />
            </svg>
          </div>
          <h2>PhD / Master Students</h2>
          <p class="pos-desc" :class="{ open: openPos === 'phd' }">
            Looking for highly motivated students to pursue graduate research projects in human genomics.
          </p>
          <button class="pos-more" type="button" @click="togglePos('phd')">
            {{ openPos === 'phd' ? "Less" : "More" }}
          </button>
        </div>
      </div>

      <!-- CONTACT US 标题 -->
      <div class="title-wrapper title-wrapper--contact">
        <div class="title-card">
          <h1>CONTACT US</h1>
        </div>
      </div>

      <!-- 联系方式卡片 -->
      <div class="contact-card">
        <div class="contact-item">
          <span class="icon-plate icon-plate-sm" aria-hidden="true">
            <svg class="icon-svg-sm" viewBox="0 0 24 24" fill="none">
              <path class="s" d="M4.2 7h15.6v10.8H4.2V7Z" />
              <path class="s" d="M4.2 7.6 12 13l7.8-5.4" />
              <path class="b" d="M7.2 15.5h4.2" />
            </svg>
          </span>
          <a class="contact-link" href="mailto:yang.wu@wchscu.cn">yang.wu@wchscu.cn</a>
        </div>

        <div class="contact-item">
          <span class="icon-plate icon-plate-sm" aria-hidden="true">
            <svg class="icon-svg-sm" viewBox="0 0 24 24" fill="none">
              <path class="s" d="M12 21s7-5 7-11a7 7 0 1 0-14 0c0 6 7 11 7 11Z" />
              <path class="s" d="M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
              <path class="b" d="M11 16.2h2.0" />
            </svg>
          </span>
          <span>D5A, Chengdu Frontiers Medical Center, 2222 Xinchuan Road, Chengdu, Sichuan Province, China</span>
        </div>
      </div>
      
    </div> <!-- END of inner-content -->

    <!-- 合作伙伴部分：绝对定位锁死在屏幕最底部，绝无任何修改颜色的滤镜 -->
    <div class="partners-section-wrapper" v-if="partnerLogos && partnerLogos.length">
      <div class="partners-title">Collaborating Institutions</div>
      
      <div
        class="partners-marquee"
        @mouseenter="pausePartners = true"
        @mouseleave="pausePartners = false"
      >
        <div class="partners-track" :class="{ paused: pausePartners }">
          <div class="partners-group">
            <a
              v-for="(p, i) in loopPartners"
              :key="'a-' + i"
              class="partner-item"
              :href="p.link || '#'"
              target="_blank"
            >
              <!-- 取消了所有滤镜，恢复原始彩色 -->
              <img class="partner-logo" :src="p.src" :alt="p.name" />
            </a>
          </div>
          <div class="partners-group" aria-hidden="true">
            <a
              v-for="(p, i) in loopPartners"
              :key="'b-' + i"
              class="partner-item"
              :href="p.link || '#'"
              target="_blank"
            >
              <img class="partner-logo" :src="p.src" :alt="p.name" />
            </a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "JoinPage",
  data() {
    return {
      openPos: null,
      pausePartners: false,
      partnerLogos: [
        { name: "WCH", src: require("@/assets/institution/huaxi.jpg") },
        { name: "huaxikouqiang", src: require("@/assets/institution/huaxikouqiang.jpg") },
        { name: "UQ", src: require("@/assets/institution/UQ.jpg") },
        { name: "Fudan University", src: require("@/assets/institution/fudan.png") },
        { name: "farmgtex", src: require("@/assets/institution/farmgtex_logo.gif") },
        { name: "huanan", src: require("@/assets/institution/huanannongda.png") },
        { name: "aarhus", src: require("@/assets/institution/Aarhus.png") }
      ]
    };
  },
  computed: {
    loopPartners() {
      const base = (this.partnerLogos || []).filter(x => x && x.src);
      if (!base.length) return [];
      const minItems = 16;
      const reps = Math.ceil(minItems / base.length);
      let out = [];
      for (let r = 0; r < reps; r++) out = out.concat(base);
      return out;
    }
  },
  methods: {
    togglePos(key) {
      this.openPos = this.openPos === key ? null : key;
    }
  }
};
</script>

<style scoped>
/* 1. 全局布局：强制一屏，无滚动条 */
.join-page {
  position: relative; /* 为底部绝对定位做准备 */
  width: 100%;
  height: 100vh; /* 死死锁定一屏高度 */
  overflow: hidden; /* 绝对禁止出现滚动条 */
  
  background-image: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), 
                    url('@/assets/hero/beijing.png'); 
  background-size: cover;
  background-position: center;
  
  display: flex;
  flex-direction: column;
  
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --ink: #7b7b7b;
  --blue: #7fc4ff;
  --accent: #2f5d8a;
}

/* 2. 中间内容区：不再缩水，垂直居中均匀分布 */
.inner-content {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 80px 20px 0 20px; /* 顶部留出导航栏空间 */
  
  /* 这里的 Flex 设置保证元素自然撑开，不再产生断崖式空白 */
  height: calc(100vh - 160px); /* 减去底部轮播图的高度 */
  display: flex;
  flex-direction: column;
  justify-content: center; /* 整体居中 */
  align-items: center;
}

/* 标题样式：恢复正常大小 */
.title-wrapper { text-align: center; }
.title-wrapper--contact { margin-top: 4vh; }

.title-card {
  display: inline-block;
  background: rgba(240, 244, 251, 0.9);
  padding: 10px 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(15, 60, 120, 0.08);
}
.title-card h1 { font-size: 28px; color: #1a3e6e; margin: 0; }

/* 职位卡片布局：恢复正常间距 */
.positions-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(260px, 1fr));
  gap: 40px;
  margin-top: 4vh; /* 使用 vh 根据屏幕高度自适应间距 */
  justify-items: center;
  width: 100%;
}
.position-card {
  width: min(360px, 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* 图标恢复正常醒目大小 */
.icon-plate {
  background: #fff;
  box-shadow: 0 4px 14px rgba(15, 60, 120, 0.08);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-plate-lg { width: 80px; height: 80px; margin-bottom: 12px; }
.icon-plate-sm { width: 50px; height: 50px; flex: 0 0 auto; }

.icon-svg { width: 55px; height: 55px; fill: none; }
.icon-svg-sm { width: 30px; height: 30px; fill: none; }
.s { stroke: var(--ink); stroke-width: 2.4; }
.b { stroke: var(--blue); stroke-width: 3.2; }

.position-card h2 { font-size: 20px; color: #2f5d8a; margin: 0; }
.pos-desc { margin-top: 8px; font-size: 14px; color: #444; line-height: 1.5; display: none; }
.pos-desc.open { display: block; }
.pos-more { margin-top: 8px; background: none; border: none; cursor: pointer; font-weight: 900; color: var(--accent); text-decoration: underline; }

/* 联系方式卡片恢复正常排版 */
.contact-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(15, 60, 120, 0.08);
  padding: 24px;
  max-width: 520px;
  width: 100%;
  margin-top: 3vh;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.contact-item { 
  display: flex; 
  align-items: center; 
  gap: 16px; 
  color: #444; 
  line-height: 1.6; 
  word-break: break-word; 
  font-size: 18px;
}
.contact-link { font-weight: 600; color: #444; text-decoration: underline; }
.contact-link:hover { color: var(--accent); }

/* 3. 底部合作伙伴：绝对定位，死死钉在屏幕最下方 */
.partners-section-wrapper { 
  position: absolute; /* 绝对定位，绝不会和上方内容产生巨大间隔 */
  bottom: 0;
  left: 0;
  width: 100%; 
}

.partners-title { 
  text-align: center; 
  font-size: 20px; 
  font-weight: 700; 
  color: var(--accent); 
  margin-bottom: 10px; 
}

/* 轮播区域 */
.partners-marquee {
  width: 100%;
  overflow: hidden;
  background-color: #fff; /* 白色底 */
  padding: 10px 0; 
  box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
}

.partners-track { 
  display: flex; 
  width: max-content; 
  animation: partnersMarquee 60s linear infinite;
}
.partners-track.paused { animation-play-state: paused; }
.partners-group { 
  display: flex; 
  gap: 40px; 
  padding-right: 40px; 
  align-items: center; 
}
@keyframes partnersMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

.partner-item {
  display: flex;
  align-items: center;
  text-decoration: none;
}

/* 【重要修正】：完全去除滤镜（filter），100% 恢复彩色原图 */
.partner-logo { 
  max-height: 55px; /* 合理高度，不截断 */
  display: block; 
  object-fit: contain; 
  padding: 5px;
}
</style>