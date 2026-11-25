// ===== 三位一体 · 课堂互动投票 配置文件 =====
// mode: "auto" = 配置了 key 就尝试真投票,连不上自动降级演示模式
//       "live" = 强制真投票(Supabase)
//       "demo" = 强制演示模式(大屏自动模拟投票,零网络依赖)
window.VOTE_CONFIG = {
  mode: "auto",
  supabaseUrl: "https://ephmmmbhiaeohawdqxls.supabase.co",
  supabaseAnonKey: "sb_publishable__pT5YglirrtYDIaUAR9vjA_a24_1OJF",
  table: "votes",
  demoVoters: 36,           // 演示模式模拟人数
  voteSeconds: 30,          // 投票倒计时
  // 演示模式中观众直觉投票的倾向(科技最多→人才→教育,更戏剧化)
  demoWeight: { edu: 20, tech: 45, talent: 35 }
};
