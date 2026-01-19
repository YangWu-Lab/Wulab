<template>
  <div class="join-page">
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
      <div class="contact-card contact-card--up">
        <div class="contact-item contact-item--center">
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

      <div class="join-sep"></div>

      <!-- 合作伙伴部分 -->
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
/* 1. 全局背景配置 */
.join-page {
  width: 100%;
  min-height: 100vh;
  background-image: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), 
                    url('@/assets/hero/beijing.png'); 
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  
  /* ✅ 确保最外层底部完全没缝隙 */
  padding: 120px 0 0 0; 
  margin: 0;
  
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --ink: #7b7b7b;
  --blue: #7fc4ff;
  --accent: #2f5d8a;
}

.inner-content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px 0 20px; /* ✅ 底部 Padding 设为 0 */
}

/* 标题样式 */
.title-wrapper { text-align: center; margin-bottom: 16px; }
.title-card {
  display: inline-block;
  background: rgba(240, 244, 251, 0.9);
  padding: 12px 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(15, 60, 120, 0.08);
}
.title-card h1 { font-size: 32px; color: #1a3e6e; margin: 0; }

/* 职位卡片布局 */
.positions-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(260px, 1fr));
  gap: 28px;
  margin-top: 80px;
  margin-bottom: 28px;
  justify-items: center;
}
.position-card {
  width: min(360px, 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.icon-plate {
  background: #fff;
  box-shadow: 0 4px 14px rgba(15, 60, 120, 0.08);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-plate-lg { width: 92px; height: 92px; margin-bottom: 14px; }
.icon-plate-sm { width: 58px; height: 58px; flex: 0 0 auto; }

.icon-svg { width: 66px; height: 66px; fill: none; }
.icon-svg-sm { width: 35px; height: 35px; fill: none; }
.s { stroke: var(--ink); stroke-width: 2.4; }
.b { stroke: var(--blue); stroke-width: 3.2; }

.position-card h2 { font-size: 19px; color: #2f5d8a; margin: 0; }
.pos-desc { margin-top: 10px; font-size: 14px; color: #444; line-height: 1.6; display: none; }
.pos-desc.open { display: block; }
.pos-more { margin-top: 10px; background: none; border: none; cursor: pointer; font-weight: 900; color: var(--accent); text-decoration: underline; }

/* 联系方式部分 */
.title-wrapper--contact { margin-top: 60px; margin-bottom: 40px; }
.contact-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(15, 60, 120, 0.08);
  padding: 26px;
  max-width: 520px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.contact-item { display: flex; align-items: flex-start; gap: 16px; color: #444; line-height: 1.7; word-break: break-word; }
.contact-link { font-weight: 600; color: #444; text-decoration: underline; }
.contact-link:hover { color: var(--accent); }

/* 分割线 */
.join-sep {
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(15, 60, 120, 0.15), transparent);
  margin: 60px 0;
}

/* 合作伙伴滚动部分 */
.partners-section-wrapper { width: 100%; margin-top: 20px; margin-bottom: 0; }
.partners-title { text-align: center; font-size: 22px; font-weight: 700; color: var(--accent); margin-bottom: 24px; }

.partners-marquee {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  overflow: hidden;
  /* ✅ 设置底部 padding 为 0，line-height 为 0 消除隐形空隙 */
  padding: 10px 0 0 0; 
  margin-bottom: 0;
  line-height: 0; 
  background: transparent;
}

.partners-track { 
  display: flex; 
  width: max-content; 
  animation: partnersMarquee 100s linear infinite;
  line-height: 0; /* ✅ 消除行高间隙 */
}
.partners-track.paused { animation-play-state: paused; }
.partners-group { 
  display: flex; 
  gap: 40px; 
  padding-right: 40px; 
  align-items: flex-end; /* ✅ 贴着底边对齐 */
}
@keyframes partnersMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

.partner-item {
  display: flex;
  align-items: flex-end;
  margin-bottom: 0;
}

.partner-logo { 
  max-height: 70px; 
  display: block; /* ✅ 消除 inline 元素的间隙 */
  object-fit: contain; 
  filter: grayscale(10%); 
  transition: filter 0.3s; 
  background: rgba(255,255,255,0.7); 
  border-radius: 4px;
  padding: 5px;
  vertical-align: bottom; /* ✅ 强制底部对齐 */
}
.partner-logo:hover { filter: grayscale(0); background: rgba(255,255,255,1); }

@media (max-width: 768px) {
  .join-page { padding-top: 80px; }
  .positions-grid { grid-template-columns: 1fr; margin-top: 40px; }
}
</style>