// src/tutorials/index.js
export const tutorials = [
  {
    id: 2,
    slug: "gcta-gctb",
    title: "GCTA / GCTB：常用命令与参数速查",
    desc: "GREML、COJO、SBayesR 常见用法与注意事项。",
    category: "统计遗传分析",
    tags: ["GWAS", "GCTA", "GCTB"],
    level: "入门",
    updated: "2026-01-05",
    icon: require("@/assets/tutorial/icon_statgen.png"),
    type: "external",
    link: "https://example.com/gctb"
  },
  {
    id: 3,
    slug: "scrna-standard",
    title: "scRNA-seq analysis",
    desc: "A minimal end-to-end pipeline from raw matrices to final results, including troubleshooting of common pitfalls.",
    category: "单细胞分析",
    tags: ["scRNA", "QC", "Seurat/Scanpy"],
    level: "入门",
    updated: "2026-01-10",
    icon: require("@/assets/tutorial/icon_singlecell.png"),
    type: "md",
    md: "scrna-standard.md"
  },
  {
    id: 4,
    slug: "scatac-motif",
    title: "scRNA-seq analysis",
    desc: "A complete workflow from fragments to peak calling, TF motif analysis, and peak–gene linking.",
    category: "单细胞分析",
    tags: ["ATAC", "Motif", "ArchR/Signac"],
    level: "进阶",
    updated: "2026-01-08",
    icon: require("@/assets/tutorial/icon_singlecell.png"),
    type: "md",
    md: "scatac-motif.md"
  },
  {
    id: 1,
    slug: "gwas-plot",
    title: "GWAS result visualization",
    desc: "Manhattan / QQ / LocusZoom",
    category: "统计遗传分析",
    tags: ["GWAS", "Plot", "Report"],
    level: "入门",
    updated: "2025-12-29",
    icon: require("@/assets/tutorial/icon_statgen.png"),
    type: "md",
    md: "gwas-plot.md"
  },
  {
    id: 5,
    slug: "slurm-minimal",
    title: "Linux + Slurm：集群跑任务最小模板",
    desc: "最常用 sbatch 参数、资源评估、日志定位。",
    category: "工程与计算",
    tags: ["HPC", "Slurm", "Linux"],
    level: "入门",
    updated: "2025-12-20",
    icon: require("@/assets/tutorial/icon_engineering.png"),
    type: "external",
    link: "https://example.com/slurm"
  }
];

export function getTutorialBySlug(slug) {
  return tutorials.find((t) => t.slug === slug);
}
