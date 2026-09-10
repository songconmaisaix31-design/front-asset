# 唯一任务看板

目标：自然星空入口 → 点击进入 → 可探索 Agent 星群的证据资产库。

|任务|责任/写域|执行与预算|状态|
|---|---|---|---|
|CONTROL|主控；根文件、catalog/、最终选用索引|当前主控模型未核实，保守计 E3；不宣称降档；软预留 4000|初始化|
|CAP-01|Cosmograph 首份浏览器包；references/cosmograph/parts/CAP-01/；独占隔离浏览器与 .local-captures/CAP-01/|E2 gpt-5.6-terra low；软预占 3000|待派发/配置验证|
|SRC-01|cosmos.gl 固定源码与许可；references/cosmos-gl/parts/SRC-01/、reusable/cosmos-gl/；.local-captures/SRC-01/|E1 gpt-5.6-luna low；软预占 2000|待派发|
|REF-01|自有首图与 Obsidian 官方间接证据；owned/hero/、references/obsidian/parts/REF-01/；.local-captures/REF-01/|E1 gpt-5.6-luna low；软预占 2000|待派发|
|INT-01|独立整合 worktree 合并、确定性检查、reviews/ 与 recipes/；不改来源内容|E2 gpt-5.6-terra low；后续预占 2000|依赖以上完成|

首批 Worker 生成预占 7000，属于全任务共享总账，不是硬限额。根文件由主控唯一维护。Worker 独立 worktree/branch，实际 ID 与 SHA 后续补记。最多一次有新依据的返修。不递归拆分。镜头任务只在首包通过及额度允许后追加。

顺序：基线提交 → CAP-01 实际模型验证 → 独立任务并行 → 首包审查 → 必要补缺 → INT-01 → 主控总索引与推送。每轨只提交已审查可公开材料；普通 push 已由用户总协议授权，原件永不推送；不创建远端、不改可见性。
