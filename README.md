# 三个「第一」,谁是第一?——课堂互动投票

> 东南大学「教育、科技、人才三位一体」研读汇报 · 开场互动环节
> 核心玩法:全场 30 秒投票,无论选哪个都被"反方观点"拆台,最后揭晓——这不是三选一,是系统涌现。

## 文件结构

```
三位一体投票/
├── index.html   手机投票页(同学扫码打开)
├── stage.html   大屏结果页(讲台电脑打开,主讲人控制)
├── config.js    配置文件(Supabase 密钥/模式/人数/权重)
└── README.md    本说明
```

## 两种模式(双保险)

| 模式 | 说明 | 何时用 |
|:--|:--|:--|
| **演示模式** | 大屏自动模拟 36 人投票(科技最多→人才→教育,更戏剧化),零网络依赖 | 默认,课堂网络不稳时兜底 |
| **实时模式** | 同学手机真投票,Supabase 实时同步到大屏 | 配置好密钥 + 网络通畅时 |

`config.js` 里 `mode: "auto"` 表示:配置了密钥就尝试实时模式,连不上自动降级演示模式。

## 本地体验(先看效果)

1. 双击打开 `D:\HermesTeam\三位一体投票\index.html`(模拟手机页)
2. 双击打开 `stage.html`(大屏页),点「开始投票」→ 观察模拟投票动画 → 点「提前结束」→ 点「揭晓答案」看完整揭晓时间线(约 12 秒)
3. 两个文件是独立页面,手机页和大屏页在同一浏览器里打开即可同步演示效果

## 现场流程脚本(30 秒投票环节)

**汇报开场,主讲人说:**

> "开始之前,先请大家做一个小决定——拿起手机,扫这个码(大屏显示二维码/链接),投一票。
> 假想题:如果国家只能优先投一项——教育、科技、人才,你投哪个?
> 凭第一直觉,30 秒。投完抬头看大屏。"

**大屏主讲人操作:**
1. 点「开始投票」→ 全场扫码投票,大屏柱子实时跳动
2. 30 秒倒计时结束(或点「提前结束」)
3. 点「揭晓答案」→ 揭晓动画自动播放:
   - 全场投票结果分布("你们凭直觉,给它们排了序")
   - "但——这不是一个三选一的问题"
   - 三条反方观点闪回(选教育/科技/人才的人都被拆过台)
   - **结论卡**:教育·科技·人才是同一系统的三个侧面 → 一体推进 → 系统涌现 → 整体大于部分之和(附 2026 政府工作报告出处)
   - "带着这个问题,开始今天的汇报"
4. 揭晓结束,无缝进入正文

**注意**:揭晓动画 12 秒自动播放,主讲人不用操作,站在旁边看大屏即可,动画结束正好接开场白。

## 接入 Supabase(真·实时投票,可选)

1. 打开 https://supabase.com → 注册(邮箱即可,免费)→ 创建项目(选离你近的区,如 Singapore)
2. 项目创建后,进入 **SQL Editor**,执行:

```sql
create table votes (
  id bigint generated always as identity primary key,
  choice text not null,
  created_at timestamptz default now()
);

alter table votes enable row level security;
create policy "anyone can vote" on votes for all using (true);
```

3. 进入 **Project Settings → API**,复制 `Project URL` 和 `anon public key`
4. 填入 `config.js`:

```js
window.VOTE_CONFIG = {
  mode: "auto",
  supabaseUrl: "https://xxxx.supabase.co",
  supabaseAnonKey: "eyJhbGciOi...",
  ...
};
```

5. 刷新 `stage.html` / `index.html`,左上角徽标变为「实时模式」即成功

## 部署到 GitHub Pages

1. 建仓库(如 `three-firsts-vote`),把三个文件推上去
2. 仓库 Settings → Pages → 选 main 分支部署
3. 访问 `https://<你的用户名>.github.io/three-firsts-vote/stage.html` 即大屏页(二维码自动显示投票链接)
4. 汇报前**务必用手机流量实测一次**扫码,确认课堂网络能打开

## 已知事项

- 实时模式下,同一手机重复投票会被 localStorage 拦截(每人一票)
- 演示模式是"仪式感"兜底:手机页照常显示反方观点和成功态,大屏自己播模拟动画
- 揭晓文案中的政策出处:2026 年政府工作报告「一体推进教育科技人才发展」、二十届四中全会"十五五"规划建议——与 PPT 参考文献呼应
