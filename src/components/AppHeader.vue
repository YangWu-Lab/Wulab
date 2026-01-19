<template>
  <nav class="navbar">
    <div class="nav-container">
      <!-- 汉堡菜单（小屏/标题放不下时显示） -->
      <div class="hamburger" :class="{ open: isMenuOpen }" @click="toggleMenu">
        <span></span><span></span><span></span>
      </div>

      <!-- ✅ 桌面：整排居中导航（保留你的原样） -->
      <ul class="nav-list">
        <li class="brand-li">
          <router-link to="/" class="brand" aria-label="WU LAB Home">
            <img class="brand-huaxi" src="@/assets/header/huaxi.png" alt="Huaxi" />

            <svg
              class="brand-svg"
              viewBox="0 0 170 56"
              role="img"
              aria-label="WULAB"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="inkEdge" x="-20%" y="-40%" width="140%" height="180%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="noise"/>
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.6" xChannelSelector="R" yChannelSelector="G" result="displaced"/>
                  <feGaussianBlur in="displaced" stdDeviation="0.25" result="soft"/>
                  <feMerge>
                    <feMergeNode in="soft"/>
                    <feMergeNode in="displaced"/>
                  </feMerge>
                </filter>

                <linearGradient id="inkWu" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stop-color="#0b0f14"/>
                  <stop offset="0.55" stop-color="#121820"/>
                  <stop offset="1" stop-color="#0b0f14"/>
                </linearGradient>

                <linearGradient id="inkLab" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stop-color="#1f3f5c"/>
                  <stop offset="0.55" stop-color="#2f5d8a"/>
                  <stop offset="1" stop-color="#1f3f5c"/>
                </linearGradient>

                <filter id="paperGrain" x="-20%" y="-40%" width="140%" height="180%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="1" seed="3" result="g"/>
                  <feColorMatrix in="g" type="matrix"
                    values="
                      0 0 0 0 0.8
                      0 0 0 0 0.8
                      0 0 0 0 0.8
                      0 0 0 0.18 0" result="g2"/>
                  <feBlend in="SourceGraphic" in2="g2" mode="multiply"/>
                </filter>
              </defs>

              <g filter="url(#inkEdge)">
                <text
                  x="0"
                  y="42"
                  font-size="40"
                  font-weight="900"
                  letter-spacing="1.2"
                  font-family="Brush Script MT, Segoe Script, Apple Chancery, 'Comic Sans MS', cursive"
                >
                  <tspan fill="url(#inkWu)">WU</tspan><tspan fill="url(#inkLab)">LAB</tspan>
                </text>
              </g>

              <g filter="url(#paperGrain)" opacity="0.22">
                <text
                  x="0"
                  y="42"
                  font-size="40"
                  font-weight="900"
                  letter-spacing="1.2"
                  font-family="Brush Script MT, Segoe Script, Apple Chancery, 'Comic Sans MS', cursive"
                >
                  <tspan fill="url(#inkWu)">WU</tspan><tspan fill="url(#inkLab)">LAB</tspan>
                </text>
              </g>
            </svg>
          </router-link>
        </li>

        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/research">Research</router-link></li>
        <li><router-link to="/publications">Publications</router-link></li>
        <li><router-link to="/people">People</router-link></li>
        <li><router-link to="/news">News / Events</router-link></li>
        <li><router-link to="/software">Software</router-link></li>
        <li><router-link to="/data">Data</router-link></li>
        <li><router-link to="/tutorial">Tutorial</router-link></li>
        <li><router-link to="/contact">Join / Contact</router-link></li>
      </ul>

      <!-- ✅ 小屏：右侧抽屉菜单（截图这种效果） -->
      <div class="nav-overlay" :class="{ active: isMenuOpen }" @click="toggleMenu"></div>

      <ul class="nav-drawer" :class="{ active: isMenuOpen }">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/news">News/Events</router-link></li>
        <li><router-link to="/people">People</router-link></li>
        <li><router-link to="/research">Research</router-link></li>
        <li><router-link to="/publications">Publications</router-link></li>
        <li><router-link to="/software">Software</router-link></li>
        <li><router-link to="/data">Data</router-link></li>
        <li><router-link to="/tutorial">Tutorial</router-link></li>
        <li><router-link to="/contact">Join/Contact</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return { isMenuOpen: false };
  },
  watch: {
    $route() {
      this.isMenuOpen = false;
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
};
</script>

<style>
.navbar{
  --navH: 90px;
  height: var(--navH);
  position: fixed;
  top: 0;
  width: 100%;
  background: #fff;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(15, 60, 120, 0.10);
  display: flex;
  align-items: center;
}

.nav-container{
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 20px;
  position: relative;
  --navGap: 34px;
  --brandGap: 16px;
}

/* ✅ 桌面：整排居中 */
.nav-list{
  display: flex;
  gap: var(--navGap);
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
  white-space: nowrap;
  width: 100%;
  justify-content: center;
}

.brand-li{
  display: flex;
  align-items: center;
  margin-right: calc(var(--brandGap) - var(--navGap));
}

.brand{
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  line-height: 1;
}

.brand-huaxi{
  height: 80px;
  width: auto;
  display: block;
  object-fit: contain;
}

.brand-svg{
  width: 125px;
  height: 50px;
  display: block;
  filter: drop-shadow(0 6px 10px rgba(15, 60, 120, 0.10));
}

/* 普通链接 */
.nav-list a{
  font-size: 18px;
  text-decoration: none;
  color: #111;
  font-weight: 600;
  transition: color 0.15s ease;
}
.nav-list a:hover{ color:#2f5d8a; }
.router-link-active{ color:#2f5d8a; }

/* 汉堡默认隐藏 */
.hamburger{
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  width: 35px;
  height: 30px;
  cursor: pointer;
  display: none;
  z-index: 1200;
}
.hamburger span{
  position: absolute;
  width: 100%;
  height: 4px;
  background: #111;
  transition: 0.3s;
}
.hamburger span:nth-child(1){ top: 0; }
.hamburger span:nth-child(2){ top: 12px; }
.hamburger span:nth-child(3){ top: 24px; }
.hamburger.open span:nth-child(1){ transform: rotate(45deg); top: 12px; }
.hamburger.open span:nth-child(2){ opacity: 0; }
.hamburger.open span:nth-child(3){ transform: rotate(-45deg); top: 12px; }

/* ✅ 抽屉与遮罩（默认隐藏） */
.nav-overlay{
  display: none;
}
.nav-drawer{
  display: none;
}

/* gap 响应式（桌面更紧一点） */
@media (max-width: 1100px){
  .nav-container{ --navGap: 22px; }
}
@media (max-width: 900px){
  .nav-container{ --navGap: 16px; }
  .brand-huaxi{ height: 46px; }
  .brand-svg{ width: 120px; height: 46px; }
}

/* ✅ 关键：当标题可能放不下时（这里用 1100px 触发），切换成“汉堡 + 抽屉” */
@media (max-width: 1100px){
  .hamburger{ display: block; }

  /* 顶部只保留 brand（其他菜单项隐藏） */
  .nav-list > li:not(.brand-li){
    display: none;
  }
  .nav-list{
    justify-content: flex-start;  /* 左侧保留 brand */
  }
  .brand-li{
    margin-right: 0;
  }

  /* 遮罩 */
  .nav-overlay.active{
    display: block;
    position: fixed;
    inset: var(--navH) 0 0 0;
    background: rgba(0,0,0,0.10);
    z-index: 1100;
  }

  /* 右侧抽屉 */
  .nav-drawer{
    display: flex;
    position: fixed;
    top: var(--navH);
    right: 0;
    height: calc(100vh - var(--navH));
    width: 260px;
    padding: 16px 14px;
    margin: 0;
    list-style: none;
    flex-direction: column;
    gap: 10px;

    background: rgba(255,255,255,0.98);
    border-left: 1px solid rgba(227,235,245,0.9);
    box-shadow: -10px 0 30px rgba(0,0,0,0.08);

    transform: translateX(110%);
    transition: transform .22s ease;
    z-index: 1150;
    overflow-y: auto;
  }
  .nav-drawer.active{
    transform: translateX(0);
  }

  .nav-drawer a{
    display: block;
    width: 100%;
    padding: 10px 12px;
    border-radius: 10px;
    text-decoration: none;
    font-size: 18px;
    font-weight: 600;
    color: #111;
  }

  /* 当前页高亮：类似截图的浅底 */
  .nav-drawer a.router-link-exact-active,
  .nav-drawer a.router-link-active{
    background: #f0f4fb;
    color: #2f5d8a;
  }
}
</style>
