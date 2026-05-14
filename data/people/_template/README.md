# 个人主页数据模板

新增一位成员的个人主页步骤：

1. 复制 `_template` 目录，重命名为该成员的 ID（与 HTML 文件名一致，如 `wang-quan`）
2. 编辑各 CSV 文件，将括号内的占位说明替换为实际内容
3. 在 `people/` 目录下复制一份 HTML（如 `wang-quan.html`），无需修改 HTML 内容
4. 在 `data/advisors.csv` 或 `data/students.csv` 中将 `page` 字段指向 `people/wang-quan.html`

## 文件说明

| 文件 | 用途 | 格式 |
|------|------|------|
| `info.csv` | 基本信息 | key,value（每行一个字段） |
| `bio.csv` | 学习与工作经历 | when,what |
| `pubs.csv` | 代表论文 | venue,title,authors |
| `honors.csv` | 奖励与荣誉 | year,what |
| `service.csv` | 学术任职 | when,what |

所有文件均可留空（只保留表头），对应板块将不显示。
