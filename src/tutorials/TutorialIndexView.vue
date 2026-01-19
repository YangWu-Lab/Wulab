<template>
  <div class="tutorial-container">
    <!-- 左侧分类导航 -->
    <div class="cat-sidebar">
      <div
        class="cat-link"
        :class="{ active: selectedCategory === '全部' }"
        @click="selectedCategory = '全部'"
      >
        全部 <span class="count">{{ countAll }}</span>
      </div>

      <div
        v-for="c in categories"
        :key="c"
        class="cat-link"
        :class="{ active: selectedCategory === c }"
        @click="selectedCategory = c"
      >
        {{ c }} <span class="count">{{ countByCategory(c) }}</span>
      </div>
    </div>

    <!-- 右侧内容 -->
    <div class="tutorial-content">
      <div class="toolbar">
        <input
          v-model.trim="keyword"
          class="search"
          placeholder="搜索：GWAS / scRNA / ATAC / QC ..."
        />
        <div class="meta">共 {{ filtered.length }} 条</div>
      </div>

      <div v-if="filtered.length === 0" class="empty">
        没有匹配的教程
      </div>

      <template v-else>
        <!-- ✅ 选中分类时显示问答区（不会影响教程卡片样式） -->
        <BoardQA
          v-if="selectedCategory !== '全部' && boardKey"
          :repo="issueRepo"
          :boardKey="boardKey"
          :boardTitle="selectedCategory"
        />

        <!-- 教程列表 -->
        <div class="grid">
          <div class="tcard" v-for="t in filtered" :key="t.id">
            <div class="tmeta">
              <div class="tdate">{{ t.updated }}</div>
              <span class="ttype" v-if="t.category">{{ t.category }}</span>
            </div>

            <div class="timage">
              <img :src="t.icon" :alt="t.title" />
            </div>

            <div class="ttitle">{{ t.title }}</div>
            <div class="tdesc">{{ t.desc }}</div>

            <div class="ttags" v-if="t.tags && t.tags.length">
              <span class="tag" v-for="tag in t.tags" :key="tag">{{ tag }}</span>
            </div>

            <div class="tfooter">
              <button class="read-more" type="button" @click="open(t)">
                Read more →
              </button>

              <button class="open-btn" type="button" @click="open(t)">
                {{ t.type === "md" ? "Open" : "Link" }}
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { tutorials } from "@/tutorials";
import BoardQA from "@/components/BoardQA.vue";

const CATEGORY_KEY = {
  统计遗传分析: "statgen",
  单细胞分析: "singlecell",
  工程与计算: "engineering"
};

export default {
  name: "TutorialIndexView",
  components: { BoardQA },
  data() {
    return {
      keyword: "",
      selectedCategory: "全部",
      tutorials,

      // ✅ 你的 GitHub 仓库（你现在用的是这个）
      issueRepo: "Crazzy-Rabbit/Wulab"
    };
  },
  computed: {
    categories() {
      return Array.from(new Set(this.tutorials.map((t) => t.category))).filter(Boolean);
    },
    filtered() {
      const kw = this.keyword.toLowerCase();
      return this.tutorials
        .filter((t) => (this.selectedCategory === "全部" ? true : t.category === this.selectedCategory))
        .filter((t) => {
          if (!kw) return true;
          const hay = [t.title, t.desc, t.category, (t.tags || []).join(" "), t.level]
            .join(" ")
            .toLowerCase();
          return hay.includes(kw);
        })
        .sort((a, b) => (a.updated < b.updated ? 1 : -1));
    },
    countAll() {
      if (!this.keyword) return this.tutorials.length;
      return this.filtered.length;
    },
    boardKey() {
      return CATEGORY_KEY[this.selectedCategory] || "";
    }
  },
  methods: {
    countByCategory(cat) {
      const kw = this.keyword.toLowerCase();
      return this.tutorials
        .filter((t) => t.category === cat)
        .filter((t) => {
          if (!kw) return true;
          const hay = [t.title, t.desc, t.category, (t.tags || []).join(" "), t.level]
            .join(" ")
            .toLowerCase();
          return hay.includes(kw);
        }).length;
    },
    open(t) {
      if (t.type === "md") {
        this.$router.push(`/tutorial/${t.slug}`);
      } else if (t.type === "external" && t.link) {
        window.open(t.link, "_blank", "noopener,noreferrer");
      }
    }
  }
};
</script>

<style scoped>
/* ✅ 确保即使外层没定义变量，这里也有 */
.tutorial-container {
  --accent: #2f5d8a;
  --badgeBg: #f0f4fb;
  --badgeText: #1a3e6e;
  --border: #e3ebf5;
  --shadow: 0 4px 14px rgba(15, 60, 120, 0.08);
  --shadowHover: 0 16px 36px rgba(15, 60, 120, 0.16);
}

/* 整体布局：左分类 + 右内容 */
.tutorial-container {
  display: flex;
  width: 100%;
  gap: 20px;
}

/* 左侧分类导航 */
.cat-sidebar {
  width: 200px;
  position: sticky;
  top: 30%;
  transform: translateY(-50%);
  align-self: flex-start;
}

.cat-link {
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 16px;
  font-weight: 700;
  color: #9aa4af;
  cursor: pointer;
  margin-bottom: 12px;
  transition: color 0.15s ease, background 0.15s ease;
  border-radius: 10px;
  padding: 8px 10px;
}

.cat-link:hover {
  color: var(--accent);
  background: rgba(47, 93, 138, 0.06);
}

.cat-link.active {
  color: var(--accent);
  background: rgba(47, 93, 138, 0.10);
}

.count {
  font-size: 12px;
  color: #666;
  border: 1px solid var(--border);
  background: #fff;
  padding: 2px 8px;
  border-radius: 999px;
  font-weight: 800;
}

.tip {
  margin-top: 12px;
  font-size: 12px;
  color: #888;
  line-height: 1.5;
}

/* 右侧内容 */
.tutorial-content {
  flex: 1;
  min-width: 0;
}

/* 顶部工具栏 */
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.search {
  flex: 1;
  min-width: 260px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--border);
  outline: none;
}

.search:focus {
  border-color: rgba(47, 93, 138, 0.35);
  box-shadow: 0 6px 18px rgba(15, 60, 120, 0.10);
}

.meta {
  color: #666;
  font-weight: 800;
  white-space: nowrap;
}

/* 卡片网格：三列 */
.grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  align-items: stretch;
}

/* 单卡片 */
.tcard {
  background: #fff;
  border-radius: 16px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  overflow: hidden;
  padding: 14px 16px 56px 16px;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.tcard:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadowHover);
}

/* 顶部：更新时间 + 分类标签 */
.tmeta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
}

.tdate {
  font-size: 13px;
  font-weight: 900;
  color: var(--accent);
}

.ttype {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(47, 93, 138, 0.08);
  color: var(--accent);
  font-size: 12px;
  font-weight: 900;
  white-space: nowrap;
}

/* icon 图片 */
.timage {
  width: 100%;
  height: 160px;
  border-radius: 12px;
  border: 1px solid var(--border);
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(15, 60, 120, 0.08);
  background: #fff;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timage img {
  width: 70%;
  height: 70%;
  object-fit: contain;
  display: block;
}

/* 标题 */
.ttitle {
  font-size: 16px;
  font-weight: 900;
  color: var(--accent);
  line-height: 1.35;
  margin-bottom: 10px;
  word-break: break-word;
}

/* 描述 */
.tdesc {
  font-size: 14px;
  color: #444;
  line-height: 1.75;
  word-break: break-word;
  overflow-wrap: anywhere;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
}

/* tags */
.ttags {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: #fff;
  color: #555;
  font-size: 12px;
  font-weight: 900;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 底部按钮区 */
.tfooter {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.read-more,
.open-btn {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 900;
  color: var(--accent);
}

.read-more:hover,
.open-btn:hover {
  text-decoration: underline;
}

/* empty */
.empty {
  padding: 26px;
  background: #fff;
  border-radius: 14px;
  border: 1px dashed var(--border);
  color: #777;
}

/* responsive */
@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .cat-sidebar {
    display: none;
  }
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
