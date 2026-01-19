<template>
  <div class="join-page">
    <div class="title-wrapper">
      <div class="title-card">
        <h1>JOIN US</h1>
      </div>
    </div>

    <!-- ✅ 往下移：给两块 positions 一个额外上间距 -->
    <div class="positions-grid">
      <!-- Postdoc -->
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

      <!-- PhD / Master -->
      <div class="position-card">
        <div class="icon-plate icon-plate-lg" aria-hidden="true">
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none">
            <path class="s" d="M4.2 6.2h6.3c2.4 0 4.3 1.9 4.3 4.3v10.3c0-2.4-1.9-4.3-4.3-4.3H4.2V6.2Z" />
            <path class="s" d="M19.8 6.2h-6.3c-2.4 0-4.3 1.9-4.3 4.3v10.3c0-2.4 1.9-4.3 4.3-4.3h6.3V6.2Z" />
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

    <!-- ✅ Contact 标题：改成往下移 -->
    <div class="title-wrapper title-wrapper--contact">
      <div class="title-card">
        <h1>CONTACT US</h1>
      </div>
    </div>

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

    <!-- Collaborating Institutions：保持你原来的 -->
    <div class="partners-section" v-if="partnerLogos && partnerLogos.length">
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
              :target="p.link ? '_blank' : null"
              :rel="p.link ? 'noopener noreferrer' : null"
              @click.prevent="!p.link && $event.preventDefault()"
              :aria-label="p.name || 'Partner'"
            >
              <img class="partner-logo" :src="p.src" :alt="p.name || 'Partner'" />
            </a>
          </div>

          <div class="partners-group" aria-hidden="true">
            <a
              v-for="(p, i) in loopPartners"
              :key="'b-' + i"
              class="partner-item"
              :href="p.link || '#'"
              :target="p.link ? '_blank' : null"
              :rel="p.link ? 'noopener noreferrer' : null"
              tabindex="-1"
            >
              <img class="partner-logo" :src="p.src" :alt="p.name || 'Partner'" />
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
        { name: "Fudan University", src: require("@/assets/institution/fudan.png") },
        { name: "WCH", src: require("@/assets/institution/huaxi.jpg") },
        { name: "huaxikouqiang", src: require("@/assets/institution/huaxikouqiang.jpg") },
        { name: "farmgtex", src: require("@/assets/institution/farmgtex_logo.gif") }
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
.join-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 120px 20px 40px 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  --ink: #7b7b7b;
  --blue: #7fc4ff;
  --accent: #2f5d8a;
}

.title-wrapper { text-align: center; margin-bottom: 16px; }
.title-card {
  display: inline-block;
  background: #f0f4fb;
  padding: 12px 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(15, 60, 120, 0.08);
}
.title-card h1 {
  font-size: 32px;
  color: #1a3e6e;
  margin: 0;
  text-align: center;
}

/* ✅ 两块卡整体往下移：加 margin-top */
.positions-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(260px, 1fr));
  gap: 28px;
  margin-top: 100px;     /* ✅ 往下移（你想更下就 30/40） */
  margin-bottom: 28px;  /* ✅ 更紧凑 */
  justify-items: center;
}

/* ✅ 不要大圆：只是一个容器 */
.position-card{
  background: transparent;
  border: none;
  box-shadow: none;
  border-radius: 0;

  width: min(360px, 100%);
  padding: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  transition: none;
}

.icon-plate-lg {
  width: 92px;
  height: 92px;
  margin: 0 0 14px 0;
}

.position-card h2 {
  font-size: 19px;
  color: #2f5d8a;
  margin: 0;
  max-width: 86%;
  line-height: 1.25;
}

.pos-desc{
  margin: 10px 0 0 0;
  width: 86%;
  font-size: 14px;
  color: #555;
  line-height: 1.6;
  text-align: center;
  display: none;
}
.pos-desc.open{ display: block; }

/* ✅ More 走流式，不要 absolute（避免跑到组件外面） */
.pos-more{
  margin-top: 10px;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 900;
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.pos-more:hover{ opacity: 0.9; }

/* icon plate base */
.icon-plate {
  background: #fff;
  box-shadow: 0 4px 14px rgba(15, 60, 120, 0.08);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.icon-plate-sm { width: 58px; height: 58px; flex: 0 0 auto; }

.icon-svg, .icon-svg-sm { stroke-linecap: round; stroke-linejoin: round; fill: none; }
.icon-svg { width: 66px; height: 66px; }
.icon-svg-sm { width: 35px; height: 35px; }
.s { stroke: var(--ink); stroke-width: 2.4; }
.b { stroke: var(--blue); stroke-width: 3.2; stroke-linecap: round; }

/* ✅ CONTACT US 往下移：不要负 margin */
.title-wrapper--contact{
  margin-top: 50px;     /* ✅ 往下移（你想更下就 32/40） */
  margin-bottom: 50px;
}

.contact-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(15, 60, 120, 0.08);
  padding: 26px;
  min-width: 320px;
  max-width: 520px;
  text-align: left;
  margin: 0 auto 18px auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
}

/* ✅ 不再往上提 */
.contact-card--up{
  margin-top: 0;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  font-size: 16px;
  color: #444;
  line-height: 1.7;
  word-break: break-word;
  margin: 0;
}
.contact-item.contact-item--center { align-items: center; }

.contact-link{
  color: #444;
  font-size: 16px;
  line-height: 1.7;
  font-weight: 600;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  text-decoration-color: rgba(47,93,138,0.45);
  transition: color .15s ease, text-decoration-color .15s ease, transform .15s ease;
}
.contact-link:hover{
  color: var(--accent);
  text-decoration-color: rgba(47,93,138,0.9);
  transform: translateY(-1px);
}

.join-sep{
  height: 1px;
  background: linear-gradient(to right, transparent, #e3ebf5, transparent);
  margin: 18px 0 16px 0;
}

/* Collaborating Institutions：保持你原来的 */
.partners-section{ width: 100%; max-width: none; margin: 0; }
.partners-title{
  max-width: 1100px;
  margin: 0 auto 16px auto;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  color: var(--accent);
}
.partners-marquee{
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  overflow: hidden;
  padding: 16px 0;
  background: none;
}
.partners-track{
  display: flex;
  width: max-content;
  align-items: center;
  will-change: transform;
  animation: partnersMarquee 40s linear infinite;
}
.partners-track.paused{ animation-play-state: paused; }
.partners-group{
  display: flex;
  align-items: center;
  gap: 26px;
  padding-right: 26px;
}
@keyframes partnersMarquee{
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.partner-item{
  height: 84px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  text-decoration: none;
  flex: 0 0 auto;
}
.partner-logo{
  max-height: 80px;
  max-width: 320px;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
  transition: transform .15s ease;
}
.partner-item:hover .partner-logo{ transform: translateY(-1px); }

@media (max-width: 768px) {
  .positions-grid { grid-template-columns: 1fr; margin-top: 18px; }
}
</style>
