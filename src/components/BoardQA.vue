<template>
  <div class="board">
    <div class="boardHead">
      <div class="boardTitle">{{ boardTitle }} · 问答区</div>
      <div class="boardSub">
        每个问题对应一个 GitHub Issue（标题=问题标题，回复=评论）。
      </div>
    </div>

    <!-- 顶部说明 md -->
    <div v-if="boardHtml" class="boardBody" v-html="boardHtml"></div>

    <!-- 提问（不跳转，直接创建 Issue） -->
    <div class="ask">
      <div class="askTitle">提一个新问题</div>

      <input v-model.trim="newTitle" class="ipt" placeholder="问题标题（必填）" />
      <textarea
        v-model.trim="newBody"
        class="ta"
        placeholder="补充描述（可选，建议写：背景/报错/期望）"
      />

      <div class="askActions">
        <button class="btn" :disabled="!newTitle || posting" @click="createIssue">
          {{ posting ? "发布中..." : "发布问题" }}
        </button>
        <div v-if="postError" class="err">{{ postError }}</div>

        <button class="btn ghost" :disabled="loading || posting" @click="refresh">
          刷新列表
        </button>

        <div class="askHint">
          发布问题会在站内直接创建（无需跳转）。右侧回复评论仍需 GitHub 登录。
        </div>
      </div>

      <div v-if="postError" class="err">{{ postError }}</div>
    </div>

    <div class="qa">
      <!-- 左：问题列表 -->
      <div class="left">
        <div class="leftHead">
          <div class="leftTitle">问题列表</div>
          <div class="leftMeta">
            <span v-if="loading">加载中...</span>
            <span v-else>共 {{ issues.length }} 条</span>
          </div>
        </div>

        <div v-if="error" class="err">{{ error }}</div>

        <div v-if="!loading && issues.length === 0" class="empty">
          暂无问题。你可以先发布一条问题。
        </div>

        <div v-else class="list">
          <div
            class="item"
            v-for="it in issues"
            :key="it.number"
            :class="{ active: selected && selected.number === it.number }"
            @click="select(it)"
          >
            <div class="itTitle">#{{ it.number }} · {{ it.title }}</div>
            <div class="itMeta">
              <span>{{ it.user?.login }}</span>
              <span>·</span>
              <span>{{ fmtDate(it.created_at) }}</span>
              <span>·</span>
              <span>{{ it.comments }} replies</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 右：问题详情 + 回复区 -->
      <div class="right">
        <div v-if="!selected" class="placeholder">
          选择左侧一个问题，在这里查看详情并回复。
        </div>

        <template v-else>
          <div class="detailHead">
            <div class="detailTitle">#{{ selected.number }} · {{ selected.title }}</div>
            <div class="detailMeta">
              {{ selected.user?.login }} · {{ fmtDate(selected.created_at) }} · {{ selected.comments }} replies
            </div>
          </div>

          <div v-if="selectedBodyHtml" class="detailBody" v-html="selectedBodyHtml"></div>

          <!-- 回复区（仍使用 utterances） -->
          <IssueComments
            :repo="repo"
            :issueNumber="selected.number"
            theme="github-light"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from "markdown-it";
import IssueComments from "@/components/IssueComments.vue";

// 你项目里 .md 已配 asset/source：require() 直接拿文本
const mdCtx = require.context("@/assets/tutorial/md", false, /\.md$/);

export default {
  name: "BoardQA",
  components: { IssueComments },
  props: {
    repo: { type: String, required: true },       // 例如 "Crazzy-Rabbit/Wulab"
    boardKey: { type: String, required: true },   // statgen / singlecell / engineering
    boardTitle: { type: String, required: true }  // 中文名
  },
  data() {
    return {
      loading: false,
      error: "",
      issues: [],
      selected: null,

      boardHtml: "",
      selectedBodyHtml: "",

      newTitle: "",
      newBody: "",

      posting: false,
      postError: "",

      md: new MarkdownIt({ html: true, linkify: true, typographer: true })
    };
  },
  computed: {
    labelName() {
      return `board:${this.boardKey}`;
    },
    repoOwner() {
      return this.repo.split("/")[0];
    },
    repoName() {
      return this.repo.split("/")[1];
    },
    createApi() {
      // ✅ 你可以在 .env.production 里配置成 vercel 线上地址
      // 例如：https://xxx.vercel.app/api/create-issue
      return process.env.VUE_APP_ISSUE_API || "/api/create-issue";
    }
  },
  watch: {
    boardKey: {
      immediate: true,
      handler() {
        this.loadBoardMd();
        this.fetchIssues();
      }
    }
  },
  methods: {
    fmtDate(s) {
      if (!s) return "";
      return String(s).slice(0, 10);
    },

    loadBoardMd() {
      this.boardHtml = "";
      const mdFile = `board_${this.boardKey}.md`;
      const key = `./${mdFile}`;

      if (!mdCtx.keys().includes(key)) {
        this.boardHtml = this.md.render(`> 未找到栏目说明：${mdFile}（请在 src/assets/tutorial/md 下新建）`);
        return;
      }

      const mod = mdCtx(key);
      const text = mod?.default ?? mod;
      this.boardHtml = this.md.render(text || "");
    },

    async fetchIssues() {
      this.loading = true;
      this.error = "";
      this.issues = [];
      this.selected = null;
      this.selectedBodyHtml = "";

      try {
        // ✅ 不在 URL 里按 label 过滤，先拉全部 open issues
        const api = `https://api.github.com/repos/${this.repoOwner}/${this.repoName}/issues?state=open&per_page=100&sort=updated&direction=desc`;

        const res = await fetch(api, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const arr = await res.json();

        // 过滤 PR
        const all = (arr || []).filter((x) => !x.pull_request);

        // ✅ 在前端按 labelName 过滤（更稳定）
        const issues = all.filter((it) => {
          const labels = (it.labels || []).map((l) => (typeof l === "string" ? l : l.name));
          return labels.includes(this.labelName);
        });

        this.issues = issues;
        if (issues.length) this.select(issues[0]);
      } catch (e) {
        this.error = `加载问题列表失败：${String(e?.message || e)}`;
      } finally {
        this.loading = false;
      }
    },

    select(it) {
      this.selected = it;
      const body = it?.body || "";
      this.selectedBodyHtml = body ? this.md.render(body) : "";
    },

    refresh() {
      this.fetchIssues();
    },

    async createIssue() {
      if (!this.newTitle || this.posting) return;

      this.posting = true;
      this.postError = "";

      try {
        const payload = {
          repo: this.repo,                  // "Crazzy-Rabbit/Wulab"
          title: this.newTitle.trim(),
          body: (this.newBody || "").trim(),
          labels: [this.labelName]          // "board:statgen"
        };

        const headers = { "Content-Type": "application/json" };
        const res = await fetch("/api/create-issue", {
          method: "POST",
          headers,
          body: JSON.stringify(payload)
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);

        this.newTitle = "";
        this.newBody = "";

        await this.fetchIssues();
        const created = this.issues.find((x) => x.number === data.number);
        if (created) this.select(created);
      } catch (e) {
        this.postError = `发布失败：${String(e?.message || e)}`;
      } finally {
        this.posting = false;
      }

    }
  }
};
</script>

<style scoped>
.board {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: var(--shadow);
  padding: 14px 16px;
  margin-bottom: 16px;
}

.boardHead { margin-bottom: 10px; }
.boardTitle { font-size: 16px; font-weight: 900; color: var(--accent); }
.boardSub { margin-top: 6px; font-size: 12px; color: #777; line-height: 1.6; }
.boardBody { margin-top: 10px; line-height: 1.75; color: #333; }

.ask {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #eef2f7;
}

.askTitle { font-weight: 900; color: var(--accent); margin-bottom: 8px; }

.ipt {
  width: 100%;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--border);
  outline: none;
  margin-bottom: 10px;
}

.ta {
  width: 100%;
  min-height: 90px;
  resize: vertical;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--border);
  outline: none;
  line-height: 1.6;
}

.askActions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.btn {
  border: 1px solid var(--border);
  background: #fff;
  color: var(--accent);
  border-radius: 10px;
  padding: 10px 12px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(15, 60, 120, 0.06);
}

.btn:disabled { opacity: 0.5; cursor: not-allowed; box-shadow: none; }
.btn.ghost { background: transparent; box-shadow: none; }

.askHint { font-size: 12px; color: #777; }

.qa {
  margin-top: 14px;
  display: grid;
  grid-template-columns: minmax(280px, 360px) minmax(0, 1fr);
  gap: 14px;
}

/* ✅ 关键：允许子元素收缩，不然会溢出 */
.left, .right {
  min-width: 0;
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 12px;
  background: #fff;
  overflow: hidden; /* ✅ 防止 iframe/长文本撑出 */
}

.leftHead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.leftTitle { font-weight: 900; color: var(--accent); }
.leftMeta { font-size: 12px; color: #777; }

.err { color: #c00; font-size: 12px; padding: 8px 0; }
.empty { color: #777; font-size: 12px; padding: 10px 0; }

.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 520px;
  overflow: auto;
  overflow-x: hidden; /* ✅ */
}
.item {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 10px;
  cursor: pointer;
  transition: box-shadow .15s ease, transform .15s ease;
}
.item:hover {
  box-shadow: 0 10px 22px rgba(15,60,120,.10);
  transform: translateY(-1px);
}
.item.active {
  border-color: rgba(47,93,138,.45);
  background: rgba(47,93,138,.06);
}

.itTitle { font-weight: 900; color: #1a3e6e; line-height: 1.35; }
.itMeta { margin-top: 6px; font-size: 12px; color: #777; display: flex; gap: 6px; flex-wrap: wrap; }

.placeholder { color: #777; font-size: 12px; padding: 10px 0; }

.detailHead { margin-bottom: 10px; }
.detailTitle { font-weight: 900; color: var(--accent); line-height: 1.35; }
.detailMeta { margin-top: 6px; font-size: 12px; color: #777; }

.detailBody {
  margin-top: 10px;
  padding: 10px;
  border: 1px dashed #e6eef8;
  border-radius: 12px;
  background: #fbfdff;
  line-height: 1.75;
}

@media (max-width: 1100px) {
  .qa {
    grid-template-columns: 1fr;
  }
}
</style>
